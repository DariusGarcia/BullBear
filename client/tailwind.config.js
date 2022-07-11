/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			primary: '#212841',
			secondary: '#111322',
			blue: '#76b4ff',
			lightBlue: '#3eb2ce',
			red: '#dc2626',
			white: '#ffffff',
			black: '#000000',
			grey: '#334155',
		},
		fontFamily: {
			primary: ['Work Sans'],
		},
		extend: {
			boxShadow: {
				'3xl': '10px 10px 20px rgb(9, 10, 17)',
			},
		},
	},
	plugins: [],
};
