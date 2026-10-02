'use client'

import { useEffect, useRef, type ReactNode } from "react";
import { SCROLLER_ID, DESKTOP_QUERY, scrollToSection } from "@/lib/scroll";

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

    const onWheel = (e: WheelEvent) => {
      if (!media.matches || e.ctrlKey) return;
      // Geste horizontal natif (trackpad) : on laisse faire
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const panel = (e.target as HTMLElement).closest<HTMLElement>("[data-panel]");
      if (panel && panel.scrollHeight > panel.clientHeight + 1) {
        const atTop = panel.scrollTop <= 0;
        const atBottom =
          panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
      }

      e.preventDefault();
      scroller.scrollBy({ left: e.deltaY });
    };

    const onHashChange = () => {
      const id = window.location.hash.substring(1);
      if (id) scrollToSection(id);
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    updateProgress();

    return () => {
      scroller.removeEventListener("wheel", onWheel);
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
