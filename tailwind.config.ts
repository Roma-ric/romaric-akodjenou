import type { Config } from "tailwindcss";

import svgToDataUri from "mini-svg-data-uri";
import colors from "tailwindcss/colors";

const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: ["class"],
	theme: {
		extend: {
			colors: {
				gray: 'var(--gray)',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontSize: {
				xs: '0.75rem',
				sm: '0.87rem',
				md: '0.9rem',
				base: '0.875rem',
				lg: '1rem',
				xl: '1.125rem',
				'2xl': '1.25rem',
				'3xl': '1.5rem',
				'4xl': '2rem',
				'5xl': '2.25rem',
				'6xl': '2.5rem',
				'7xl': '3rem',
				'8xl': '4rem',
				'9xl': '6rem',
				'10xl': '8rem'
			},
			screens: {
				scr_0: {
					max: "1430px",
				},
				scr_1: {
					min: "1390px",
				},
				scr_1_0: {
					max: "1300px",
				},
				scr_1_1: {
					min: "1300px",
				},
				scr_1_2: {
					max: "1285px",
				},
				scr_1_3: {
					min: "1200px",
				},
				scr_2: {
					max: "1200px",
				},
				scr_2_0: {
					max: "1100px",
				},
				scr_2_1: {
					max: "945px",
				},
				scr_2_2: {
					max: "850px",
				},
				scr_3: {
					max: "780px",
				},
				scr_3_0: {
					max: "767.5px",
				},
				scr_3_1: {
					max: "600px",
				},
				scr_4: {
					max: "575px",
				},
				scr_4_0: {
					max: "500px",
				},
				scr_4_1: {
					max: "475px",
				},
				scr_4_2: {
					max: "445px",
				},
				scr_4_3: {
					max: "400px",
				},
				scr_5: {
					max: "370px",
				},
				scr_5_1: {
					max: "330px",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ matchUtilities, theme }: any) {
			matchUtilities(
				{
					"bg-grid": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`,
					}),
					"bg-grid-small": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`,
					}),
					"bg-dot": (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
						)}")`,
					}),
				},
				{ values: flattenColorPalette(theme("backgroundColor")), type: "color" }
			);
		},
	],
} satisfies Config;