import { rmSync } from 'fs';
import { join } from 'path';

async function globalTeardown() {
  rmSync(join(process.cwd(), 'test-results', 'global'), { recursive: true, force: true });
  console.log('Global teardown completed.');
}

export default globalTeardown;
