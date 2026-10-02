'use client'

import { useEffect, useRef, type ReactNode } from "react";
import { SCROLLER_ID, DESKTOP_QUERY, scrollToSection } from "@/lib/scroll";

type Panel = {
  id: string;
  node: ReactNode;
  /** Classes de largeur du panneau sur ordinateur (par défaut : plein écran). */
  widthClass?: string;
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
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0.04, ratio))})`;
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
        className="lg:flex lg:h-screen lg:overflow-x-auto lg:overflow-y-hidden lg:overscroll-x-none lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
      >
        {panels.map(({ id, node, widthClass }) => (
          <div
            key={id}
            id={id}
            data-panel
            className={`${widthClass ?? "lg:w-screen"} lg:h-screen lg:shrink-0 lg:overflow-y-auto lg:overflow-x-hidden lg:pb-16`}
          >
            {node}
          </div>
        ))}
      </div>

      {/* Progression du défilement (ordinateur uniquement) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-6 left-1/2 z-40 hidden w-[min(60vw,48rem)] -translate-x-1/2 items-center gap-3 lg:flex"
      >
        <span className="text-xs uppercase tracking-widest text-yellow-500">
          Scroll
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div
            ref={progressRef}
            className="h-full origin-left rounded-full bg-yellow-500"
            style={{ transform: "scaleX(0.04)" }}
          />
        </div>
      </div>
    </>
  );
}
