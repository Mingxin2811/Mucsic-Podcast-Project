import { fileURLToPath } from 'node:url';
import { runner } from 'node-pg-migrate';

export function migrateDatabase(databaseUrl) {
  return runner({
    databaseUrl,
    dir: fileURLToPath(new URL('../migrations/', import.meta.url)),
    direction: 'up',
    migrationsTable: 'pgmigrations',
    schema: 'public',
    singleTransaction: true,
    checkOrder: true,
  });
}
