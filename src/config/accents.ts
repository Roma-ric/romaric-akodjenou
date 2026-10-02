// Couleurs d'accent proposées par le sélecteur (palette du template Salimov).
// `text` = variante plus foncée utilisée pour du texte sur fond clair.
export const accents = [
  { id: "yellow", color: "#ffb400", text: "#b27700" },
  { id: "blue", color: "#007bff", text: "#0062cc" },
  { id: "green", color: "#72b626", text: "#4f8a10" },
  { id: "red", color: "#f72b1c", text: "#c4180b" },
  { id: "yellowgreen", color: "#9acd32", text: "#5f8200" },
  { id: "orange", color: "#fa5b0f", text: "#c2410c" },
  { id: "pink", color: "#ff1466", text: "#cc0a50" },
  { id: "goldenrod", color: "#daa520", text: "#8a6208" },
  { id: "turquoise", color: "#40e0d0", text: "#0d8f84" },
] as const;

export type AccentId = (typeof accents)[number]["id"];

export const ACCENT_STORAGE_KEY = "sal-accent";

// Texte lisible sur la couleur d'accent : sombre sur les teintes claires, blanc sinon
export function foregroundFor(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return luminance > 0.3 ? "#111" : "#fff";
}

export function applyAccent(id: string) {
  const accent = accents.find((a) => a.id === id) ?? accents[0];
  const root = document.documentElement.style;
  root.setProperty("--sal-user-accent", accent.color);
  root.setProperty("--sal-user-accent-text", accent.text);
  root.setProperty("--sal-user-accent-fg", foregroundFor(accent.color));
}
