import type { Config } from "tailwindcss";

// Tailwind ne sert plus qu'à quelques utilitaires (sr-only, hidden, dark:…) :
// le design vit dans src/app/[locale]/salimov.css.
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	darkMode: ["class"],
} satisfies Config;
