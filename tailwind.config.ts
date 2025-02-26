import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: 'var(--blue)',
        indigo: 'var(--indigo)',
        purple: 'var(--purple)',
        pink: 'var(--pink)',
        red: 'var(--red)',
        orange: 'var(--orange)',
        yellow: 'var(--yellow)',
        green: 'var(--green)',
        teal: 'var(--teal)',
        cyan: 'var(--cyan)',
        white: 'var(--white)',
        gray: 'var(--gray)',
        'gray-dark': 'var(--gray-dark)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        success: 'var(--success)',
        info: 'var(--info)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
} satisfies Config;
