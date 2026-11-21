import { once } from 'node:events';
import { promisify } from 'node:util';
import express from 'express';
import { createDatabasePool } from './config/database.js';

export async function startServer({ databaseUrl, host, port }) {
  const app = express();
  app.disable('x-powered-by');

  const pool = createDatabasePool(databaseUrl);
  let server;
  try {
    await pool.query('SELECT 1');
    server = app.listen(port, host);
    await once(server, 'listening');
  } catch (error) {
    await pool.end();
    throw error;
  }

  return {
    server,
    async close() {
      try {
        await promisify(server.close).call(server);
      } finally {
        await pool.end();
      }
    },
  };
}
