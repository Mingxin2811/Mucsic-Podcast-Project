export function up(pgm) {
  pgm.sql(`
    CREATE TABLE public.users (
      id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      username varchar(50) NOT NULL,
      email varchar(254) NOT NULL UNIQUE,
      password_hash text NOT NULL,
      role text NOT NULL DEFAULT 'listener',
      created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      email_verified_at timestamptz,
      deleted_at timestamptz,
      avatar_url text,
      CONSTRAINT users_role_check CHECK (role IN ('listener', 'creator', 'admin'))
    );

    CREATE TABLE public.otp_challenges (
      id uuid PRIMARY KEY,
      user_id integer NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
      purpose text NOT NULL,
      code_digest bytea NOT NULL,
      failed_attempts smallint NOT NULL DEFAULT 0,
      request_ip inet NOT NULL,
      delivery_status text NOT NULL,
      created_at timestamptz NOT NULL,
      expires_at timestamptz NOT NULL,
      consumed_at timestamptz,
      invalidated_at timestamptz,
      CONSTRAINT otp_challenges_purpose_check CHECK (purpose IN ('verify_email', 'reset_password')),
      CONSTRAINT otp_challenges_digest_check CHECK (octet_length(code_digest) = 32),
      CONSTRAINT otp_challenges_attempts_check CHECK (failed_attempts BETWEEN 0 AND 3),
      CONSTRAINT otp_challenges_delivery_check CHECK (
        delivery_status IN ('reserved', 'accepted', 'failed', 'unknown')
      ),
      CONSTRAINT otp_challenges_resolution_check CHECK (
        consumed_at IS NULL OR invalidated_at IS NULL
      )
    );

    CREATE UNIQUE INDEX otp_challenges_open_user_purpose_idx
      ON public.otp_challenges (user_id, purpose)
      WHERE consumed_at IS NULL AND invalidated_at IS NULL;
    CREATE INDEX otp_challenges_user_created_at_idx
      ON public.otp_challenges (user_id, created_at);
    CREATE INDEX otp_challenges_ip_created_at_idx
      ON public.otp_challenges (request_ip, created_at);

    CREATE TABLE public.auth_sessions (
      id uuid PRIMARY KEY,
      user_id integer NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
      csrf_token bytea NOT NULL,
      created_at timestamptz NOT NULL,
      expires_at timestamptz NOT NULL,
      revoked_at timestamptz,
      CONSTRAINT auth_sessions_csrf_token_check CHECK (octet_length(csrf_token) = 32)
    );

    CREATE INDEX auth_sessions_user_id_idx ON public.auth_sessions (user_id);

    CREATE TABLE public.creator_applications (
      id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id integer NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
      submitted_channel_name text NOT NULL,
      submitted_bio text,
      activity_field text NOT NULL,
      status text NOT NULL DEFAULT 'pending',
      submitted_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      reviewed_by integer REFERENCES public.users (id) ON DELETE RESTRICT,
      reviewed_at timestamptz,
      rejection_reason text,
      channel_name text,
      channel_bio text,
      CONSTRAINT creator_applications_status_check CHECK (status IN ('pending', 'approved', 'rejected')),
      CONSTRAINT creator_applications_review_check CHECK (
        (status = 'pending' AND reviewed_by IS NULL AND reviewed_at IS NULL)
        OR (status <> 'pending' AND reviewed_by IS NOT NULL AND reviewed_at IS NOT NULL
            AND reviewed_at >= submitted_at)
      ),
      CONSTRAINT creator_applications_rejection_check CHECK (
        status = 'rejected' OR rejection_reason IS NULL
      ),
      CONSTRAINT creator_applications_channel_check CHECK (
        (status = 'approved' AND channel_name IS NOT NULL)
        OR (status <> 'approved' AND channel_name IS NULL AND channel_bio IS NULL)
      )
    );

    CREATE UNIQUE INDEX creator_applications_pending_user_idx
      ON public.creator_applications (user_id) WHERE status = 'pending';
    CREATE UNIQUE INDEX creator_applications_approved_user_idx
      ON public.creator_applications (user_id) WHERE status = 'approved';
    CREATE INDEX creator_applications_history_idx
      ON public.creator_applications (user_id, submitted_at DESC, id DESC);
    CREATE INDEX creator_applications_reviewed_by_idx ON public.creator_applications (reviewed_by);

    CREATE TABLE public.genres (
      id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL UNIQUE,
      slug text NOT NULL UNIQUE,
      description text
    );

    CREATE TABLE public.tracks (
      id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title text NOT NULL,
      artist_name text NOT NULL,
      genre_id integer NOT NULL REFERENCES public.genres (id) ON DELETE RESTRICT,
      creator_id integer NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
      track_type text NOT NULL,
      duration integer NOT NULL,
      audio_file_path text NOT NULL,
      cover_image_path text,
      search_text text NOT NULL,
      play_count integer NOT NULL DEFAULT 0,
      created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted_at timestamptz,
      lyrics text,
      description text,
      CONSTRAINT tracks_type_check CHECK (track_type IN ('music', 'podcast')),
      CONSTRAINT tracks_duration_check CHECK (duration > 0),
      CONSTRAINT tracks_play_count_check CHECK (play_count >= 0),
      CONSTRAINT tracks_text_check CHECK (
        (track_type = 'music' AND coalesce(char_length(lyrics), 0) <= 20000
            AND coalesce(char_length(description), 0) <= 5000)
        OR (track_type = 'podcast' AND lyrics IS NULL AND coalesce(char_length(description), 0) <= 20000)
      )
    );

    CREATE INDEX tracks_genre_id_idx ON public.tracks (genre_id);
    CREATE INDEX tracks_creator_id_idx ON public.tracks (creator_id);
    CREATE INDEX tracks_newest_idx ON public.tracks (created_at DESC, id DESC) WHERE deleted_at IS NULL;
    CREATE INDEX tracks_trending_idx ON public.tracks (play_count DESC, id DESC) WHERE deleted_at IS NULL;

    CREATE TABLE public.listen_cooldowns (
      track_id integer NOT NULL REFERENCES public.tracks (id) ON DELETE RESTRICT,
      user_id integer REFERENCES public.users (id) ON DELETE RESTRICT,
      guest_id uuid,
      last_counted_at timestamptz NOT NULL,
      CONSTRAINT listen_cooldowns_listener_check CHECK (num_nonnulls(user_id, guest_id) = 1),
      CONSTRAINT listen_cooldowns_track_listener_key UNIQUE NULLS NOT DISTINCT (track_id, user_id, guest_id)
    );

    CREATE INDEX listen_cooldowns_user_id_idx ON public.listen_cooldowns (user_id) WHERE user_id IS NOT NULL;
    CREATE INDEX listen_cooldowns_last_counted_at_idx ON public.listen_cooldowns (last_counted_at);

    CREATE TABLE public.playlists (
      id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id integer NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
      title text NOT NULL,
      description text,
      cover_image_path text,
      created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted_at timestamptz
    );

    CREATE INDEX playlists_user_id_idx ON public.playlists (user_id);

    CREATE TABLE public.playlist_tracks (
      playlist_id integer NOT NULL REFERENCES public.playlists (id) ON DELETE RESTRICT,
      track_id integer NOT NULL REFERENCES public.tracks (id) ON DELETE RESTRICT,
      sort_order integer NOT NULL,
      added_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (playlist_id, track_id),
      CONSTRAINT playlist_tracks_positive_order_check CHECK (sort_order > 0),
      CONSTRAINT playlist_tracks_position_key UNIQUE (playlist_id, sort_order) DEFERRABLE INITIALLY DEFERRED
    );

    CREATE INDEX playlist_tracks_track_id_idx ON public.playlist_tracks (track_id);
  `);
}

export function down(pgm) {
  pgm.sql(`
    DROP TABLE public.playlist_tracks;
    DROP TABLE public.playlists;
    DROP TABLE public.listen_cooldowns;
    DROP TABLE public.tracks;
    DROP TABLE public.genres;
    DROP TABLE public.creator_applications;
    DROP TABLE public.auth_sessions;
    DROP TABLE public.otp_challenges;
    DROP TABLE public.users;
  `);
}
