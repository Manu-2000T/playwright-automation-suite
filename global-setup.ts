import { mkdirSync } from 'fs';
import { join } from 'path';

async function globalSetup() {
  mkdirSync(join(process.cwd(), 'test-results', 'global'), { recursive: true });
  console.log('Global setup completed.');
}

export default globalSetup;
