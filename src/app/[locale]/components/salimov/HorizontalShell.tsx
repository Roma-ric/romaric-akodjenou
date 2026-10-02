'use client'

import { useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { SCROLLER_ID, DESKTOP_QUERY, NAVIGATE_EVENT, scrollToSection } from "@/lib/scroll";

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
    window.addEventListener("hashchange", onHashChange);
    updateProgress();

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(NAVIGATE_EVENT, stop);
      rail?.removeEventListener("pointerdown", onPointerDown);
      rail?.removeEventListener("pointermove", onPointerMove);
      rail?.removeEventListener("pointerup", onPointerEnd);
      rail?.removeEventListener("pointercancel", onPointerEnd);
      document.body.style.userSelect = "";
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
