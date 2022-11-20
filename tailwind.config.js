/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './assets/js/main.js'],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		extend: {
			screens: {
				support: { raw: '(hover: hover)' }, // Check if the device supports hover
			},
			colors: {
				stormGrey: '#6C757D',
				royalBlue: '#2C52ED',
				warmBlue: '#2C52EDCC',
			},
		},
	},
};
