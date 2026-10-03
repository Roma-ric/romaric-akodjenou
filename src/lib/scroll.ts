// Défilement partagé : sur ordinateur (>= 1024 px) les sections sont alignées
// horizontalement dans le conteneur #scroller ; en dessous, la page défile
// verticalement de façon classique.

export const SCROLLER_ID = "scroller";
// Horizontal uniquement sur grand écran avec un vrai pointeur : les tablettes tactiles
// restent en défilement vertical (un balayage vertical n'y ferait pas défiler le conteneur).
export const DESKTOP_QUERY = "(min-width: 1025px) and (hover: hover)";

// Annonce une navigation par menu : le défilement fluide de la molette doit s'arrêter
export const NAVIGATE_EVENT = "sal:navigate";

export const isDesktop = () =>
  typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches;

export const getScroller = (): HTMLElement | null =>
  isDesktop() ? document.getElementById(SCROLLER_ID) : null;

export const getPanels = (): HTMLElement[] =>
  Array.from(document.querySelectorAll<HTMLElement>("[data-panel]"));

export function scrollToSection(
  id: string,
  behavior: ScrollBehavior = "smooth",
) {
  const element = document.getElementById(id);
  if (!element) return;
  window.dispatchEvent(new Event(NAVIGATE_EVENT));

  const scroller = getScroller();
  if (scroller) {
    scroller.scrollTo({ left: element.offsetLeft, behavior });
  } else {
    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior });
  }
}

/** Retourne l'id du panneau le plus visible dans la fenêtre. */
export function getVisiblePanelId(): string | null {
  const panels = getPanels();
  const horizontal = isDesktop();
  const viewport = horizontal ? window.innerWidth : window.innerHeight;

  let best: { id: string; visible: number } | null = null;
  for (const panel of panels) {
    const rect = panel.getBoundingClientRect();
    const start = horizontal ? rect.left : rect.top;
    const end = horizontal ? rect.right : rect.bottom;
    const visible = Math.min(end, viewport) - Math.max(start, 0);
    if (visible > 0 && (!best || visible > best.visible)) {
      best = { id: panel.id, visible };
    }
  }
  return best?.id ?? null;
}

// ---- Ancrage du défilement (changement de langue sur place) ----
export type ScrollAnchor = { element: Element; left: number; top: number };

/**
 * Repère l'élément affiché au centre de l'écran et sa position. Les textes changent de
 * longueur d'une langue à l'autre : on recale ensuite la page pour qu'il ne bouge pas.
 */
export function captureScrollAnchor(): ScrollAnchor | null {
  const candidates = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2);
  // On ignore ce qui flotte au-dessus du contenu (en-tête, menu mobile ouvert…)
  let element = candidates.find((el) => el.closest("[data-panel], main, article"));
  if (!element) return null;
  // Un morceau de texte se déplace dans son paragraphe : on prend le bloc qui le contient
  while (element.parentElement && getComputedStyle(element).display.startsWith("inline")) {
    element = element.parentElement;
  }
  const { left, top } = element.getBoundingClientRect();
  return { element, left, top };
}

/** Replace la page pour que l'élément repéré retrouve sa position à l'écran. */
export function restoreScrollAnchor(anchor: ScrollAnchor | null) {
  if (!anchor?.element.isConnected) return;
  const { left, top } = anchor.element.getBoundingClientRect();
  const scroller = getScroller();
  if (scroller) {
    const dx = left - anchor.left;
    if (Math.abs(dx) >= 1) scroller.scrollTo({ left: scroller.scrollLeft + dx, behavior: "instant" });
  } else {
    const dy = top - anchor.top;
    if (Math.abs(dy) >= 1) window.scrollTo({ top: window.scrollY + dy, behavior: "instant" });
  }
}
