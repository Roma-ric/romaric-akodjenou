'use client'

import { useEffect, type RefObject } from "react";
import { DESKTOP_QUERY, NAVIGATE_EVENT, scrollToSection } from "@/lib/scroll";

/**
 * Défilement horizontal du conteneur des sections, commun à tous les modèles (ordinateur uniquement) :
 * molette fluide (écoutée sur la fenêtre, elle marche partout), flèches, PageUp/PageDown, Début/Fin,
 * et ancre de l'URL. Les gestes horizontaux natifs (trackpad) sont laissés au navigateur.
 * Une navigation par menu (`NAVIGATE_EVENT`) interrompt le défilement fluide en cours.
 */
export function useHorizontalScroll(scrollerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const media = window.matchMedia(DESKTOP_QUERY);

    // On accumule une cible et on s'en rapproche à chaque image. La position courante est
    // suivie en décimal (le navigateur arrondit scrollLeft, la boucle ne finirait jamais).
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

    const onWheel = (e: WheelEvent) => {
      if (!media.matches || e.ctrlKey) return;
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
    window.addEventListener("hashchange", onHashChange);
    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(NAVIGATE_EVENT, stop);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [scrollerRef]);
}
