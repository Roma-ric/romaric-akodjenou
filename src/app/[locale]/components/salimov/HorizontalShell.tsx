'use client'

import { useEffect, useRef, type ReactNode } from "react";
import { SCROLLER_ID, DESKTOP_QUERY, NAVIGATE_EVENT, scrollToSection } from "@/lib/scroll";

type Panel = {
  id: string;
  node: ReactNode;
  /** `band` = bandeau à fond décoratif ; `dark` = section sur fond uni. */
  kind: "dark" | "band";
};

/**
 * Ordinateur : les panneaux sont alignés horizontalement, la molette fait
 * défiler vers la droite (sauf si le panneau a encore du contenu vertical à
 * montrer). Mobile / tablette : empilement vertical classique.
 */
export default function HorizontalShell({ panels }: { panels: Panel[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const media = window.matchMedia(DESKTOP_QUERY);

    const updateProgress = () => {
      const bar = progressRef.current;
      if (!bar) return;
      const max = scroller.scrollWidth - scroller.clientWidth;
      const ratio = max > 0 ? scroller.scrollLeft / max : 0;
      bar.style.left = `calc((100% - 27px) * ${Math.min(1, Math.max(0, ratio))})`;
    };

    // Défilement fluide : on accumule une cible et on s'en rapproche à chaque image.
    // La position courante est suivie en décimal (le navigateur arrondit scrollLeft,
    // ce qui empêchait la boucle de se terminer).
    let target = 0;
    let current = 0;
    let frame = 0;
    const maxScroll = () => scroller.scrollWidth - scroller.clientWidth;
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const step = () => {
      // Quelqu'un d'autre a fait défiler (clavier natif, barre…) : on s'efface
      if (Math.abs(scroller.scrollLeft - current) > 3) {
        frame = 0;
        return;
      }
      const diff = target - current;
      if (Math.abs(diff) < 0.5) {
        current = target;
        scroller.scrollLeft = target;
        frame = 0;
        return;
      }
      current += diff * 0.2;
      scroller.scrollLeft = current;
      frame = requestAnimationFrame(step);
    };
    const scrollByAmount = (amount: number) => {
      if (!frame) {
        current = scroller.scrollLeft;
        target = current;
      }
      target = Math.round(Math.min(maxScroll(), Math.max(0, target + amount)));
      if (!frame) frame = requestAnimationFrame(step);
    };

    // Écouté sur la fenêtre : la molette fonctionne partout (en-tête, courbes, marges)
    const onWheel = (e: WheelEvent) => {
      if (!media.matches || e.ctrlKey) return;
      // Geste horizontal natif (trackpad) : on laisse faire
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const panel = (e.target as HTMLElement | null)?.closest?.<HTMLElement>("[data-panel]") ?? null;
      if (panel && panel.scrollHeight > panel.clientHeight + 1) {
        const atTop = panel.scrollTop <= 0;
        const atBottom =
          panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
      }

      e.preventDefault();
      // Firefox envoie des « lignes » (deltaMode 1) : on les convertit en pixels
      const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1;
      scrollByAmount(e.deltaY * unit * 1.6);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!media.matches || e.altKey || e.ctrlKey || e.metaKey) return;
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, select, [contenteditable]")) return;
      const page = window.innerWidth * 0.8;
      const moves: Record<string, number> = {
        ArrowRight: 160, ArrowLeft: -160, PageDown: page, PageUp: -page,
      };
      if (e.key in moves) {
        e.preventDefault();
        scrollByAmount(moves[e.key]);
      } else if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        scrollByAmount(e.key === "Home" ? -maxScroll() : maxScroll());
      }
    };

    const onHashChange = () => {
      const id = window.location.hash.substring(1);
      if (id) scrollToSection(id);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(NAVIGATE_EVENT, stop);
    scroller.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    updateProgress();

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(NAVIGATE_EVENT, stop);
      stop();
      scroller.removeEventListener("scroll", updateProgress);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return (
    <>
      <div
        id={SCROLLER_ID}
        ref={scrollerRef}
        className="sal-scroller"
      >
        {panels.map(({ id, node, kind }, i) => {
          // Courbes de raccord entre une section sombre et un bandeau voisin
          const curveRight = kind === "dark" && panels[i + 1]?.kind === "band";
          const curveLeft = kind === "dark" && panels[i - 1]?.kind === "band";
          return (
            <div
              key={id}
              id={id}
              data-panel
              className={`sal-panel ${curveRight ? "sal-curve-r" : ""} ${curveLeft ? "sal-curve-l" : ""}`}
            >
              {node}
            </div>
          );
        })}
      </div>

      {/* Progression du défilement (ordinateur uniquement) */}
      <div aria-hidden="true" className="sal-progress">
        <div className="rail">
          <div ref={progressRef} className="dragger" />
        </div>
      </div>
    </>
  );
}
