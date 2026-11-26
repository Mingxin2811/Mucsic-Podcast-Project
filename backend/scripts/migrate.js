import { readDatabaseUrl } from '../src/config/env.js';
import { migrateDatabase } from './migrations.js';

await migrateDatabase(readDatabaseUrl('DATABASE_URL'));
