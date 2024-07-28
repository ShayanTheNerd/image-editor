export default {
	useTabs: true,
	printWidth: 120,
	singleQuote: true,
	trailingComma: 'all',
	quoteProps: 'consistent',
	astroAllowShorthand: true,
	plugins: ['prettier-plugin-astro'],
	overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
};
