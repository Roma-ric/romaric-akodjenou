'use client'

import { useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { SCROLLER_ID, scrollToSection } from "@/lib/scroll";
import { useHorizontalScroll } from "@/lib/useHorizontalScroll";

type Panel = { id: string; node: ReactNode };

/**
 * Sections du modèle Atelier. Ordinateur : côte à côte dans #scroller, avec en bas une règle
 * de progression (un segment par section, rempli au fil du défilement). Mobile : empilées.
 */
export default function Shell({ panels }: { panels: Panel[] }) {
  const t = useTranslations("Atelier");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const fillsRef = useRef<(HTMLSpanElement | null)[]>([]);
  useHorizontalScroll(scrollerRef);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = scroller.scrollWidth - scroller.clientWidth;
      const ratio = max > 0 ? scroller.scrollLeft / max : 0;
      // Point suivi : glisse du bord gauche au bord droit du contenu au fil du défilement
      const x = scroller.scrollLeft + ratio * scroller.clientWidth;
      Array.from(scroller.children).forEach((panel, i) => {
        const { offsetLeft, offsetWidth } = panel as HTMLElement;
        const fill = Math.min(1, Math.max(0, (x - offsetLeft) / offsetWidth));
        fillsRef.current[i]?.style.setProperty("transform", `scaleX(${fill})`);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div id={SCROLLER_ID} ref={scrollerRef} className="atl-scroller">
        {panels.map(({ id, node }) => (
          <div key={id} id={id} data-panel className={`atl-panel atl-panel-${id}`}>
            {node}
          </div>
        ))}
      </div>

      {/* Raccourcis à la souris : le rail reste la navigation accessible */}
      <div className="atl-ruler" aria-hidden="true">
        {panels.map(({ id }, i) => (
          <a
            key={id}
            href={`#${id}`}
            tabIndex={-1}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(id);
            }}
          >
            <span className="label">
              {String(i + 1).padStart(2, "0")} <span className="name">{t(`nav.${id}`)}</span>
            </span>
            <span className="bar">
              <span className="fill" ref={(el) => { fillsRef.current[i] = el; }} />
            </span>
          </a>
        ))}
        <span className="hint">{t("scrollHint")}</span>
      </div>
    </>
  );
}
