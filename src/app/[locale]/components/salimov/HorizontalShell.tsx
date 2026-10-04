'use client'

import { useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { SCROLLER_ID, DESKTOP_QUERY, NAVIGATE_EVENT } from "@/lib/scroll";
import { useHorizontalScroll } from "@/lib/useHorizontalScroll";

type Panel = {
  id: string;
  node: ReactNode;
  /** `band` = bandeau à fond décoratif ; `dark` = section sur fond uni. */
  kind: "dark" | "band";
};

/**
 * Ordinateur : les panneaux sont alignés horizontalement et la molette fait
 * défiler vers la droite (les panneaux n'ont pas de défilement vertical).
 * Mobile / tablette : empilement vertical classique.
 */
export default function HorizontalShell({ panels }: { panels: Panel[] }) {
  const t = useTranslations("ScrollBar");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollerRef);

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
      railRef.current?.setAttribute("aria-valuenow", String(Math.round(ratio * 100)));
    };

    const maxScroll = () => scroller.scrollWidth - scroller.clientWidth;
    // Interrompt le défilement fluide de la molette (voir useHorizontalScroll)
    const stop = () => window.dispatchEvent(new Event(NAVIGATE_EVENT));

    // Indicateur « Scroll » : on peut saisir la poignée pour la faire glisser,
    // ou cliquer sur la barre pour aller à cet endroit.
    const rail = railRef.current;
    const handle = progressRef.current;
    let dragging = false;
    let grabOffset = 0;
    const ratioAt = (clientX: number) => {
      if (!rail || !handle) return 0;
      const box = rail.getBoundingClientRect();
      const free = box.width - handle.offsetWidth;
      return free > 0 ? Math.min(1, Math.max(0, (clientX - box.left - grabOffset) / free)) : 0;
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!media.matches || e.button !== 0 || !handle) return;
      stop();
      if (handle.contains(e.target as Node)) {
        dragging = true;
        grabOffset = e.clientX - handle.getBoundingClientRect().left;
        rail?.setPointerCapture(e.pointerId);
        handle.classList.add("dragging");
        document.body.style.userSelect = "none";
        e.preventDefault();
      } else {
        // Clic sur la barre : on y glisse en douceur, poignée centrée sous le curseur
        grabOffset = handle.offsetWidth / 2;
        scroller.scrollTo({ left: ratioAt(e.clientX) * maxScroll(), behavior: "smooth" });
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (dragging) scroller.scrollLeft = ratioAt(e.clientX) * maxScroll();
    };
    const onPointerEnd = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      handle?.classList.remove("dragging");
      document.body.style.userSelect = "";
      if (rail?.hasPointerCapture(e.pointerId)) rail.releasePointerCapture(e.pointerId);
    };
    rail?.addEventListener("pointerdown", onPointerDown);
    rail?.addEventListener("pointermove", onPointerMove);
    rail?.addEventListener("pointerup", onPointerEnd);
    rail?.addEventListener("pointercancel", onPointerEnd);

    scroller.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      rail?.removeEventListener("pointerdown", onPointerDown);
      rail?.removeEventListener("pointermove", onPointerMove);
      rail?.removeEventListener("pointerup", onPointerEnd);
      rail?.removeEventListener("pointercancel", onPointerEnd);
      document.body.style.userSelect = "";
      scroller.removeEventListener("scroll", updateProgress);
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

      {/* Progression du défilement (ordinateur uniquement) : poignée à faire glisser */}
      <div className="sal-progress">
        <div
          ref={railRef}
          className="rail"
          role="scrollbar"
          aria-orientation="horizontal"
          aria-controls={SCROLLER_ID}
          aria-label={t("label")}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          tabIndex={0}
        >
          <div ref={progressRef} className="dragger" />
        </div>
      </div>
    </>
  );
}
