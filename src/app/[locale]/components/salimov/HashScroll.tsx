'use client'

import { useLayoutEffect } from "react";
import { getScroller, scrollToSection } from "@/lib/scroll";

// Au chargement : rejoint la section ciblée par le hash de l'URL (`/fr#contact`).
export default function HashScroll() {
  useLayoutEffect(() => {
    const hashId = window.location.hash.substring(1);
    if (!hashId) return;

    // Place la page, puis la recale tant que l'utilisateur n'a pas bougé : la mise en page
    // (polices, images) peut encore s'élargir juste après l'affichage.
    const position = () => getScroller()?.scrollLeft ?? window.scrollY;
    const place = () => {
      scrollToSection(hashId, "instant");
      return position();
    };
    let landedAt = place();
    const settle = () => {
      if (Math.abs(position() - landedAt) < 2) landedAt = place();
    };

    const frame = requestAnimationFrame(() => requestAnimationFrame(settle));
    document.fonts?.ready.then(settle);
    const timer = setTimeout(settle, 400);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  return null;
}
