/** @type {import('prettier').Options} */
export default {
	useTabs: true,
	printWidth: 130,
	singleQuote: true,
	trailingComma: 'all',
	quoteProps: 'consistent',
	astroAllowShorthand: true,
	plugins: ['prettier-plugin-astro'],
	overrides: [
		{
			files: '*.svg',
			options: {
				parser: 'html',
			},
		},
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
		{
			files: '*.{yml,yaml}',
			options: {
				tabWidth: 2,
			},
		},
	],
};
