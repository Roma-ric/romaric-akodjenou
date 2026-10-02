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

// ---- Conservation de la position au changement de langue ----
const POSITION_KEY = "sal-scroll-position";

/** Mémorise la section affichée et la progression dans cette section (le texte change de largeur d'une langue à l'autre). */
export function saveScrollPosition() {
  const scroller = getScroller();
  if (!scroller) return;
  const atEnd = scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 2;
  const panel = getPanels().find(
    (p) => scroller.scrollLeft >= p.offsetLeft && scroller.scrollLeft < p.offsetLeft + p.offsetWidth,
  );
  if (!panel) return;
  try {
    sessionStorage.setItem(
      POSITION_KEY,
      JSON.stringify({ id: panel.id, atEnd, fraction: (scroller.scrollLeft - panel.offsetLeft) / panel.offsetWidth }),
    );
  } catch {
    /* stockage indisponible : on retombera sur l'ancre de l'URL */
  }
}

/**
 * Lit (et efface) la position mémorisée. Retourne une fonction qui replace la page, ou null
 * s'il n'y a rien à restaurer. La fonction peut être rappelée : la mise en page se
 * stabilise juste après l'affichage (polices, images), donc la position est recalée.
 */
export function takeSavedScrollPosition(): (() => number | null) | null {
  try {
    const raw = sessionStorage.getItem(POSITION_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(POSITION_KEY);
    const { id, fraction, atEnd } = JSON.parse(raw) as { id: string; fraction: number; atEnd?: boolean };
    return () => {
      const panel = document.getElementById(id);
      const scroller = getScroller();
      if (!panel || !scroller) return null;
      const left = atEnd
        ? scroller.scrollWidth - scroller.clientWidth // en bout de page : on y reste
        : panel.offsetLeft + fraction * panel.offsetWidth;
      scroller.scrollTo({ left, behavior: "instant" });
      return scroller.scrollLeft;
    };
  } catch {
    return null;
  }
}
