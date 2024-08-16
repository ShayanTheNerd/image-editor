import process from 'node:process';
import { devices, defineConfig } from '@playwright/test';

const { CI } = process.env;

export default defineConfig({
	reporter: 'list',
	testDir: 'tests/e2e',
	outputDir: 'tests/e2e/results',
	use: {
		bypassCSP: true,
		baseURL: 'http://127.0.0.1:3000',
		viewport: { width: 1024, height: 700 },
	},
	webServer: {
		timeout: 30000,
		reuseExistingServer: !CI,
		url: 'http://127.0.0.1:3000/image-editor',
		command: CI ? 'pnpm run preview' : 'pnpm run dev',
	},
	projects: [
		{
			name: 'Desktop: Chrome',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'Desktop: Microsoft Edge',
			use: { ...devices['Desktop Edge'], channel: 'msedge' },
		},
		{
			name: 'Desktop: Firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'Desktop: Safari',
			use: { ...devices['Desktop Safari'] },
		},
		{
			name: 'Mobile: Chrome',
			use: { ...devices['Pixel 5'] },
		},
		{
			name: 'Mobile: Chrome (landscape)',
			use: { ...devices['Pixel 5 landscape'] },
		},
		{
			name: 'Mobile: Safari',
			use: { ...devices['iPhone 7'] },
		},
		{
			name: 'Mobile: Safari (landscape)',
			use: { ...devices['iPhone 15 Pro Max landscape'] },
		},
	],
});
