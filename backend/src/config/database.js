import pg from 'pg';

export function createDatabasePool(connectionString) {
  const pool = new pg.Pool({
    connectionString,
    max: 5,
    connectionTimeoutMillis: 3000,
  });

  pool.on('error', () => console.error('An idle PostgreSQL connection failed.'));
  return pool;
}
