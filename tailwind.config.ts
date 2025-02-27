import type { Config } from "tailwindcss";

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
				xs: {
					min: '385px',
					max: '480px'
				},
				sm: {
					min: '480.01px',
					max: '640px'
				},
				md: {
					min: '640.01px',
					max: '768px'
				},
				lg: {
					min: '768.01px',
					max: '1024px'
				},
				xl: {
					min: '1024.01px',
					max: '1280px'
				},
				'2xl': {
					min: '1280.01px',
					max: '1536px'
				},
				'3xl': {
					min: '1536.01px'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
