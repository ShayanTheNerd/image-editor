import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
	integrations: [tailwind()],
	build: { format: 'file', assets: 'assets' },
	server: { open: true, host: '127.0.0.1', port: 3000 },
});
