import { useState, useEffect, JSX } from 'react';

type SectionData = {
  id: number;
  tooltip: string;
  endpoint: string;
  icon: JSX.Element;
};

/**
 * Hook personnalisé amélioré qui détecte la section visible dans le viewport
 * 
 * @param sectionsData - Tableau d'objets contenant les données des sections
 * @param options - Options de configuration supplémentaires
 * @returns L'ancre de la section active (par ex. '#home')
 */
export const useActiveSection = (
  sectionsData: SectionData[],
  options = {
    threshold: 0.2,           
    rootMargin: '-80px 0px',  
    debugMode: false,         
  }
): string => {
  const [activeAnchor, setActiveAnchor] = useState<string>(sectionsData[0]?.endpoint || '#home');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { threshold, rootMargin, debugMode } = options;
    const observers: IntersectionObserver[] = [];
    const visibilityRatios: Record<string, number> = {};

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], 
    };

    const determineActiveSectionFromRatios = () => {
      let maxRatio = -1;
      let maxSection = activeAnchor;
      
      for (const [section, ratio] of Object.entries(visibilityRatios)) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxSection = section;
        }
      }
      
      if (maxRatio >= threshold && maxSection !== activeAnchor) {
        if (debugMode) console.log(`Setting active section to ${maxSection} with ratio ${maxRatio}`);
        setActiveAnchor(maxSection);
        window.history.replaceState(null, '', maxSection);
      }
    };

    sectionsData.forEach(section => {
      const id = section.endpoint.substring(1); 
      const element = document.getElementById(id);
      
      if (!element) {
        if (debugMode) console.warn(`Element with id "${id}" not found in DOM`);
        return;
      }

      if (debugMode) console.log(`Creating observer for section ${id}`);
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const sectionId = section.endpoint;
          visibilityRatios[sectionId] = entry.intersectionRatio;
          
          if (debugMode) {
            console.log(`Section ${sectionId} visibility: ${entry.intersectionRatio.toFixed(2)}`);
          }
          
          determineActiveSectionFromRatios();
        });
      }, observerOptions);

      observer.observe(element);
      observers.push(observer);
      visibilityRatios[section.endpoint] = 0;
    });

    if (window.location.hash) {
      const hash = window.location.hash;
      const exists = sectionsData.some(section => section.endpoint === hash);
      
      if (exists) {
        setTimeout(() => {
          const id = hash.substring(1);
          const element = document.getElementById(id);
          if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY;
            // window.scrollTo({ top: y, behavior: "smooth" });
            setActiveAnchor(hash);
          }
        }, 0);
      }
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionsData, options]);

  return activeAnchor;
};