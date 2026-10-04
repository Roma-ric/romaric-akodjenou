// Modèles de mise en page du portfolio.
// Le modèle public est `siteConfig.template` ; le propriétaire peut en essayer
// un autre via le panneau de personnalisation (NEXT_PUBLIC_TEMPLATE_SWITCHER=true),
// le choix étant gardé dans un cookie.
// Un modèle `ready: false` apparaît dans le panneau comme « bientôt » sans être sélectionnable.
export const templates = [
  { id: "classic", ready: true },
  { id: "atelier", ready: false },
] as const;

export type TemplateId = (typeof templates)[number]["id"];

export const TEMPLATE_COOKIE = "portfolio-template";

export function isReadyTemplate(value: string | undefined): value is TemplateId {
  return templates.some((t) => t.id === value && t.ready);
}

// Côté navigateur : mémorise le modèle choisi (lu par la page au rendu suivant)
export function saveTemplateChoice(id: TemplateId) {
  document.cookie = `${TEMPLATE_COOKIE}=${id}; path=/; max-age=31536000; samesite=lax`;
}
