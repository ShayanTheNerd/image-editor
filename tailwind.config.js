/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./**/*.{html,css,js}'],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		extend: {
			screens: {
				support: { raw: '(hover: hover)' }, // Check if the device supports hover
			},
		},
	},
};
