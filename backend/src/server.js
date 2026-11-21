import { startServer } from './app.js';
import { readServerConfig } from './config/env.js';

try {
  const config = readServerConfig();
  const backend = await startServer(config);
  console.log(`Soundwave listening on ${config.host}:${backend.server.address().port}`);

  async function shutdown() {
    process.off('SIGINT', shutdown);
    process.off('SIGTERM', shutdown);
    try {
      await backend.close();
    } catch (error) {
      console.error(`Soundwave could not shut down cleanly: ${error.message}`);
      process.exitCode = 1;
    }
  }

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
} catch (error) {
  console.error(`Soundwave could not start: ${error.message}`);
  process.exitCode = 1;
}
