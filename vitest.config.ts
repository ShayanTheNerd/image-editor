import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		expect: {
			requireAssertions: true,
		},
		typecheck: {
			enabled: true,
			allowJs: true,
			tsconfig: './tsconfig.json',
		},
	},
});
