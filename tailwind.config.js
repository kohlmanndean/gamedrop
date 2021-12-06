module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				night: {
					DEFAULT: '#030023',
					light: '#04002E',
				},
				day: '#56AEFF',
			},
		},
	},
	variants: {
		extend: { opacity: ['disabled'] },
	},
	plugins: [require('@tailwindcss/forms')],
}
