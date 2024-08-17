import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		include: ['tests/unit/**/*.test.ts'],
		expect: {
			requireAssertions: true,
		},
	},
});
