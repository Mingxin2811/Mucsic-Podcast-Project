import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { after, before, test } from 'node:test';
import { migrateDatabase } from '../scripts/migrations.js';
import { startServer } from '../src/app.js';
import { createDatabasePool } from '../src/config/database.js';
import { readDatabaseUrl } from '../src/config/env.js';

const testDatabaseUrl = readDatabaseUrl('TEST_DATABASE_URL');

function databaseTarget(connectionString) {
  const { hostname, port, pathname } = new URL(connectionString);
  return `${hostname.toLowerCase()}:${port || '5432'}${decodeURIComponent(pathname)}`;
}

if (process.env.DATABASE_URL && databaseTarget(testDatabaseUrl) === databaseTarget(process.env.DATABASE_URL)) {
  throw new Error('TEST_DATABASE_URL must target a database separate from DATABASE_URL.');
}

const pool = createDatabasePool(testDatabaseUrl);
before(() => migrateDatabase(testDatabaseUrl));
after(() => pool.end());

test('the bootstrap server connects to PostgreSQL and responds over HTTP', async (t) => {
  const backend = await startServer({ databaseUrl: testDatabaseUrl, host: '127.0.0.1', port: 0 });
  t.after(() => backend.close());

  const response = await fetch(`http://127.0.0.1:${backend.server.address().port}/`);
  assert.equal(response.status, 404);
  await response.text();
});

test('one migration installs all nine tables and can be rerun', async () => {
  const tables = [
    'auth_sessions', 'creator_applications', 'genres', 'listen_cooldowns', 'otp_challenges',
    'playlist_tracks', 'playlists', 'tracks', 'users',
  ];
  const { rows } = await pool.query(`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE' AND table_name <> 'pgmigrations'
    ORDER BY table_name
  `);
  assert.deepEqual(rows.map(({ table_name }) => table_name), tables);
  const history = await pool.query('SELECT name FROM public.pgmigrations');
  assert.deepEqual(history.rows, [{ name: '20261120000000000_create-initial-schema' }]);

  const indexes = [
    'auth_sessions_user_id_idx',
    'creator_applications_approved_user_idx',
    'creator_applications_pending_user_idx',
    'listen_cooldowns_last_counted_at_idx',
    'otp_challenges_ip_created_at_idx',
    'otp_challenges_open_user_purpose_idx',
    'otp_challenges_user_created_at_idx',
    'playlist_tracks_track_id_idx',
    'tracks_newest_idx',
    'tracks_trending_idx',
  ];
  const result = await pool.query(`
    SELECT indexname FROM pg_indexes
    WHERE schemaname = 'public' AND indexname = ANY($1::text[])
    ORDER BY indexname
  `, [indexes]);
  assert.deepEqual(result.rows.map(({ indexname }) => indexname), indexes);
  assert.deepEqual(await migrateDatabase(testDatabaseUrl), []);
});

async function expectConstraintError(client, code, sql, values) {
  await client.query('SAVEPOINT expected_error');
  await assert.rejects(client.query(sql, values), { code });
  await client.query('ROLLBACK TO SAVEPOINT expected_error');
  await client.query('RELEASE SAVEPOINT expected_error');
}

test('the account schema enforces identity, ownership and OTP invariants', async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const userSql = `
      INSERT INTO public.users (username, email, password_hash) VALUES ($1, $2, $3)
      RETURNING id, role, email_verified_at
    `;
    const userValues = ['Fixture', `${randomUUID()}@example.test`, 'fixture-only'];
    const { rows: [user] } = await client.query(userSql, userValues);
    assert.ok(user.id > 0);
    assert.equal(user.role, 'listener');
    assert.equal(user.email_verified_at, null);
    await expectConstraintError(client, '23505', userSql, userValues);
    await expectConstraintError(client, '23514', 'UPDATE public.users SET role = $1 WHERE id = $2', ['guest', user.id]);

    const otpSql = `
      INSERT INTO public.otp_challenges (
        id, user_id, purpose, code_digest, request_ip, delivery_status, created_at, expires_at
      ) VALUES ($1, $2, 'verify_email', $3, '127.0.0.1', 'reserved', now(), now() + interval '5 minutes')
      RETURNING failed_attempts
    `;
    const firstOtp = randomUUID();
    const digest = Buffer.alloc(32);
    const { rows: [otp] } = await client.query(otpSql, [firstOtp, user.id, digest]);
    assert.equal(otp.failed_attempts, 0);
    await expectConstraintError(client, '23505', otpSql, [randomUUID(), user.id, digest]);
    await expectConstraintError(client, '23514', 'UPDATE public.otp_challenges SET failed_attempts = 4 WHERE id = $1', [firstOtp]);
    await expectConstraintError(client, '23514', 'UPDATE public.otp_challenges SET code_digest = $1 WHERE id = $2', [Buffer.alloc(31), firstOtp]);
    await expectConstraintError(client, '23514', 'UPDATE public.otp_challenges SET consumed_at = now(), invalidated_at = now() WHERE id = $1', [firstOtp]);
    await client.query('UPDATE public.otp_challenges SET invalidated_at = now() WHERE id = $1', [firstOtp]);
    await client.query(otpSql, [randomUUID(), user.id, digest]);

    const sessionSql = `
      INSERT INTO public.auth_sessions (id, user_id, csrf_token, created_at, expires_at)
      VALUES ($1, $2, $3, now(), now() + interval '24 hours')
      RETURNING revoked_at
    `;
    const { rows: [session] } = await client.query(sessionSql, [randomUUID(), user.id, Buffer.alloc(32)]);
    assert.equal(session.revoked_at, null);
    await expectConstraintError(client, '23503', sessionSql, [randomUUID(), -1, Buffer.alloc(32)]);
    await expectConstraintError(client, '23514', sessionSql, [randomUUID(), user.id, Buffer.alloc(31)]);
    await expectConstraintError(client, '23001', 'DELETE FROM public.users WHERE id = $1', [user.id]);
  } finally {
    try {
      await client.query('ROLLBACK');
    } finally {
      client.release();
    }
  }
});

test('the catalog schema protects reviews, tracks, listener identities and playlist positions', async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows: [applicant, reviewer] } = await client.query(`
      INSERT INTO public.users (username, email, password_hash, role)
      VALUES ('Fixture', $1, 'fixture-only', 'listener'), ('Reviewer', $2, 'fixture-only', 'admin')
      RETURNING id
    `, [`${randomUUID()}@example.test`, `${randomUUID()}@example.test`]);
    const applicationSql = `
      INSERT INTO public.creator_applications (user_id, submitted_channel_name, activity_field)
      VALUES ($1, 'Original', 'Music') RETURNING id
    `;
    const { rows: [application] } = await client.query(applicationSql, [applicant.id]);
    await expectConstraintError(client, '23505', applicationSql, [applicant.id]);
    await expectConstraintError(client, '23514', `
      UPDATE public.creator_applications SET status = 'approved' WHERE id = $1
    `, [application.id]);
    const review = await client.query(`
      UPDATE public.creator_applications
      SET status = 'approved', reviewed_by = $1, reviewed_at = now(), channel_name = 'Updated'
      WHERE id = $2 RETURNING submitted_channel_name, channel_name
    `, [reviewer.id, application.id]);
    assert.deepEqual(review.rows, [{ submitted_channel_name: 'Original', channel_name: 'Updated' }]);

    const genreName = randomUUID();
    const { rows: [genre] } = await client.query(`
      INSERT INTO public.genres (name, slug) VALUES ($1, $1) RETURNING id
    `, [genreName]);
    const trackSql = `
      INSERT INTO public.tracks (title, artist_name, genre_id, creator_id, track_type, duration,
                                 audio_file_path, search_text)
      VALUES ('Test track', 'Soundwave', $1, $2, $3, $4, $5, 'test track soundwave') RETURNING id
    `;
    const { rows: [song] } = await client.query(trackSql, [genre.id, reviewer.id, 'music', 60, 'song.mp3']);
    const { rows: [episode] } = await client.query(trackSql, [genre.id, reviewer.id, 'podcast', 60, 'episode.mp3']);
    await expectConstraintError(client, '23514', trackSql, [genre.id, reviewer.id, 'music', 0, 'invalid.mp3']);
    await expectConstraintError(client, '23503', trackSql, [-1, reviewer.id, 'music', 60, 'invalid.mp3']);
    await expectConstraintError(client, '23514', 'UPDATE public.tracks SET play_count = -1 WHERE id = $1', [song.id]);
    await expectConstraintError(client, '23514', "UPDATE public.tracks SET lyrics = 'test' WHERE id = $1", [episode.id]);
    await expectConstraintError(client, '23514', "UPDATE public.tracks SET description = repeat('a', 5001) WHERE id = $1", [song.id]);

    const cooldownSql = `
      INSERT INTO public.listen_cooldowns (track_id, user_id, guest_id, last_counted_at)
      VALUES ($1, $2, $3, now())
    `;
    const guestId = randomUUID();
    await client.query(cooldownSql, [song.id, applicant.id, null]);
    await client.query(cooldownSql, [song.id, null, guestId]);
    await expectConstraintError(client, '23505', cooldownSql, [song.id, applicant.id, null]);
    await expectConstraintError(client, '23505', cooldownSql, [song.id, null, guestId]);
    await expectConstraintError(client, '23514', cooldownSql, [song.id, applicant.id, guestId]);
    await expectConstraintError(client, '23514', cooldownSql, [song.id, null, null]);

    const { rows: [playlist] } = await client.query(`
      INSERT INTO public.playlists (user_id, title) VALUES ($1, 'Fixture') RETURNING id
    `, [applicant.id]);
    await client.query(`
      INSERT INTO public.playlist_tracks (playlist_id, track_id, sort_order) VALUES ($1, $2, 1), ($1, $3, 2)
    `, [playlist.id, song.id, episode.id]);
    const orderSql = 'UPDATE public.playlist_tracks SET sort_order = $1 WHERE playlist_id = $2 AND track_id = $3';
    await expectConstraintError(client, '23514', orderSql, [0, playlist.id, song.id]);
    await client.query(orderSql, [2, playlist.id, song.id]);
    await client.query(orderSql, [1, playlist.id, episode.id]);
    await client.query('SET CONSTRAINTS public.playlist_tracks_position_key IMMEDIATE');
    await client.query('SET CONSTRAINTS public.playlist_tracks_position_key DEFERRED');
    await client.query(orderSql, [1, playlist.id, song.id]);
    await expectConstraintError(client, '23505', 'SET CONSTRAINTS public.playlist_tracks_position_key IMMEDIATE');
  } finally {
    try {
      await client.query('ROLLBACK');
    } finally {
      client.release();
    }
  }
});
