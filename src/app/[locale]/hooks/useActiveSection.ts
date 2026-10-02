import { useState, useEffect, JSX } from 'react';
import { SCROLLER_ID, getVisiblePanelId } from '@/lib/scroll';

type SectionData = {
  id: number;
  tooltip: string;
  endpoint: string;
  icon: JSX.Element;
};

/**
 * Détecte la section visible (horizontalement sur ordinateur, verticalement
 * sur mobile) et reflète son ancre dans l'URL (ex. `#about`).
 *
 * @param sectionsData - Sections du menu (`endpoint` = `#id`)
 * @returns L'ancre de la section active (par ex. '#home')
 */
export const useActiveSection = (sectionsData: SectionData[]): string => {
  const [activeAnchor, setActiveAnchor] = useState<string>(
    sectionsData[0]?.endpoint || '#home',
  );

  useEffect(() => {
    const known = new Set(sectionsData.map((s) => s.endpoint));
    let frame = 0;

    const update = () => {
      frame = 0;
      const id = getVisiblePanelId();
      if (!id) return;
      const anchor = `#${id}`;
      if (!known.has(anchor)) return;
      setActiveAnchor((prev) => {
        if (prev !== anchor) window.history.replaceState(null, '', anchor);
        return anchor;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const scroller = document.getElementById(SCROLLER_ID);
    scroller?.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      scroller?.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionsData]);

  return activeAnchor;
};
