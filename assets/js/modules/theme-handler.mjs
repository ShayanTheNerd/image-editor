export default function determineAndApplyTheme() {
	const theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; // determin theme based on user's preference

	document.documentElement.setAttribute('data-theme', theme);
	document.getElementById('themeColorMetaTag').setAttribute('content', theme === 'dark' ? '#6C757D' : '#e2e1e0');
}
