module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				day: '#56AEFF',
				night: {
					DEFAULT: '#030023',
					light: '#04002E',
				},
			},
		},
	},
	variants: {
		extend: { opacity: ['disabled'] },
	},
	plugins: [require('@tailwindcss/forms')],
}
