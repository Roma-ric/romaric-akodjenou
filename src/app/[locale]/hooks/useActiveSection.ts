import { useState, useEffect, useMemo } from 'react';
import { SCROLLER_ID, getPanels, getVisiblePanelId } from '@/lib/scroll';

type SectionData = {
  endpoint: string;
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

  const key = sectionsData.map((s) => s.endpoint).join('|');
  const endpoints = useMemo(() => key.split('|').filter(Boolean), [key]);

  useEffect(() => {
    const known = new Set(endpoints);
    let frame = 0;

    const update = () => {
      frame = 0;
      const visibleId = getVisiblePanelId();
      if (!visibleId) return;
      // Un bandeau sans entrée de menu reste rattaché à la section précédente
      const panels = getPanels();
      let index = panels.findIndex((panel) => panel.id === visibleId);
      while (index > 0 && !known.has(`#${panels[index].id}`)) index -= 1;
      const anchor = `#${panels[Math.max(index, 0)]?.id ?? visibleId}`;
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
  }, [endpoints]);

  return activeAnchor;
};
