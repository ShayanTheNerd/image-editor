import { resolve } from 'node:path';
import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import { URL, fileURLToPath } from 'node:url';

export default defineConfig({
	viewportWidth: 1024,
	scrollBehavior: 'center',
	e2e: {
		supportFile: false,
		experimentalStudio: true,
		baseUrl: 'http://127.0.0.1:3000/image-editor',
		specPattern: 'tests/cypress/e2e/**/*.cy.ts',
		videosFolder: 'tests/cypress/videos',
		fixturesFolder: 'tests/cypress/fixtures',
		downloadsFolder: 'tests/cypress/downloads',
		screenshotsFolder: 'tests/cypress/screenshots',
		setupNodeEvents(on) {
			on('file:preprocessor', vitePreprocessor({
				resolve: {
					alias: {
						'@ts': resolve(fileURLToPath(new URL('./src/assets/ts', import.meta.url))),
						'@types': resolve(fileURLToPath(new URL('./src/types.d.ts', import.meta.url))),
					},
				},
			}));
		},
	},
});
