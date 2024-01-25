/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './assets/js/app.js', './assets/js/modules/*.mjs'],
	future: { hoverOnlyWhenSupported: true },
	theme: {
		extend: {
			colors: {
				tuna: '#393e42',
				cloud: '#c4c4c4',
				hitGray: '#aaaaaa',
				platinum: '#e2e1e0',
				toryBlue: '#284ad5',
				davyGray: '#4b5157',
				royalBlue: '#2C52ED',
				warmBlue: '#2C52EDCC',
			},
			ringOffsetWidth: {
				'7px': '7px',
				'2.5px': '2.5px',
			},
			ringWidth: {
				'2.5px': '2.5px',
			},
			fontSize: {
				md: '1.063rem' /* 17px */,
			},
			boxShadow: {
				inset: 'inset 0 0 0 1.5px #4b5157',
			},
		},
	},
};
