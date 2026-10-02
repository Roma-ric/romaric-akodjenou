'use client'

import { useLayoutEffect } from "react";
import { getScroller, scrollToSection, takeSavedScrollPosition } from "@/lib/scroll";

// Au chargement : après un changement de langue, retrouve la position exacte ;
// sinon rejoint la section ciblée par le hash de l'URL.
export default function HashScroll() {
  useLayoutEffect(() => {
    const scroller = () => getScroller();
    const restore = takeSavedScrollPosition();
    const hashId = window.location.hash.substring(1);
    if (!restore && !hashId) return;

    // Place la page, puis la recale tant que l'utilisateur n'a pas bougé : la mise en page
    // (polices, images) peut encore s'élargir juste après l'affichage.
    const place = () => {
      if (restore) return restore();
      scrollToSection(hashId, "instant");
      return scroller()?.scrollLeft ?? window.scrollY;
    };
    let landedAt = place();
    const settle = () => {
      const now = scroller()?.scrollLeft ?? window.scrollY;
      if (landedAt !== null && Math.abs(now - landedAt) < 2) landedAt = place();
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
