/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				primary: '#2C71F6',
				secondaryBlue: '#2257BE',
				success: '#17B530',
				lightDark: '#202020',
			},
		},
	},
	darkMode: 'class',
	plugins: [nextui()],
};
