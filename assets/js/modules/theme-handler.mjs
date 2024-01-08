export default function determineAndApplyTheme() {
	const theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; // determin theme based on user's preference

	document.documentElement.setAttribute('data-theme', theme);
	document.getElementById('theme_color_meta_tag').setAttribute('content', theme === 'dark' ? '#6C757D' : '#e2e1e0');
}
