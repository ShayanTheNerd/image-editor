/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './assets/js/app.js', './assets/js/modules/*.mjs'],
	theme: {
		extend: {
			colors: {
				platinum: '#e2e1e0',
				royalBlue: '#2C52ED',
				stormGrey: '#6C757D',
				warmBlue: '#2C52EDCC',
			},
		},
	},
};
