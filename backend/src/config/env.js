import { z } from 'zod';

const postgresUrl = z.url({ protocol: /^postgres(?:ql)?$/ });

const serverEnvironment = z.object({
  HOST: z.string().min(1).default('127.0.0.1'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  APP_ORIGIN: z.url({ protocol: /^https?$/ }).refine(
    (value) => URL.canParse(value) && new URL(value).origin === value,
    'Expected an HTTP(S) origin without a path, query, or fragment',
  ),
  DATABASE_URL: postgresUrl,
});

export function readServerConfig(env = process.env) {
  const config = serverEnvironment.parse(env);
  return {
    host: config.HOST,
    port: config.PORT,
    appOrigin: config.APP_ORIGIN,
    databaseUrl: config.DATABASE_URL,
  };
}

export function readDatabaseUrl(variable, env = process.env) {
  return z.object({ [variable]: postgresUrl }).parse(env)[variable];
}
