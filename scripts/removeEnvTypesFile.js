import { existsSync, unlinkSync } from 'node:fs';

const FILE_PATH = './src/env.d.ts';

if (existsSync(FILE_PATH)) {
	unlinkSync(FILE_PATH);
}
