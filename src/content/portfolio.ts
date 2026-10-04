// Données communes à tous les modèles (les textes sont dans messages/*.json).

/** Expériences, du plus récent au plus ancien : postes en cours d'abord, puis par date de fin. */
export const experiences = [
  { key: "carrefoot", current: true },
  { key: "fidevo", current: true },
  { key: "simam", current: false },
  { key: "explotel", current: false },
  { key: "romas", current: false },
  { key: "payPlus", current: false },
] as const;

/** Projets mis en avant (textes : `ProjectsSection.projects.<key>`). */
export const projects = [
  { key: "founders", link: "https://founders.friym.com", src: "/realisation/founders-friym.webp" },
  { key: "brand", link: "https://brand.friym.com", src: "/realisation/brand-friym.webp" },
  { key: "simam-cargo", link: "https://simam-cargo.vercel.app", src: "/realisation/simam-cargo.webp" },
  { key: "template-carrefoot-2", link: "https://vote.carrefoot.com", src: "/realisation/template-carrefoot-2.webp" },
  { key: "timer", link: "https://nexus-timer.vercel.app/", src: "/realisation/timer.webp" },
] as const;

/** Services proposés (textes : `ServicesSection.services.<key>`). */
export const serviceKeys = ["dev", "template", "doc", "integration", "maintenance"] as const;

export const CV_PATH = "/cv/CV-de-Romaric-AKODJENOU.pdf";
export const PHOTO_PATH = "/files/profile-bg.png";
