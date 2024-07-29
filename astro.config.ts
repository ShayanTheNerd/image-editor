import browserslist from 'browserslist';
import { defineConfig } from 'astro/config';
import { Features, browserslistToTargets } from 'lightningcss';

export default defineConfig({
	base: '/image-editor',
	site: 'https://shayanthenerd.github.io',
	build: {
		format: 'file',
		assets: 'assets',
	},
	server: {
		open: true,
		port: 3000,
		host: '127.0.0.1',
	},
	vite: {
		build: {
			cssMinify: 'lightningcss',
		},
		css: {
			transformer: 'lightningcss',
			lightningcss: {
				drafts: { customMedia: true },
				exclude: Features.DirSelector,
				include: Features.MediaQueries,
				targets: browserslistToTargets(browserslist('>= 0.1%')),
			},
		},
	},
});
