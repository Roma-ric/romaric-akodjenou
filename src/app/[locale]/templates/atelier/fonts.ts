import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";

// Pas de préchargement : ces polices ne sont téléchargées que si ce modèle est affiché
// (sinon elles seraient préchargées sur toutes les pages, même avec le modèle Classique).
const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--atl-font-display", preload: false });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--atl-font-body", preload: false });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--atl-font-mono", preload: false });

/** Classes à poser sur la racine `.atl` : variables CSS des polices du modèle. */
export const atelierFonts = `${display.variable} ${body.variable} ${mono.variable}`;
