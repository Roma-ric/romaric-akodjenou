'use client'

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { getScroller } from "@/lib/scroll";

type Props = {
  as?: "div" | "span" | "li" | "h2" | "h3" | "p" | "section";
  className?: string;
  from?: "up" | "left" | "right";
  delay?: number;
  children: ReactNode;
};

// Fait apparaître l'élément quand il entre dans la zone visible
// (conteneur horizontal sur ordinateur, fenêtre sur mobile).
export default function Reveal({
  as = "div",
  className = "",
  from = "up",
  delay = 0,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          observer.disconnect();
        }
      },
      { root: getScroller(), threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag: ElementType = as;
  const direction = from === "up" ? "" : `sal-${from}`;
  const style = delay ? ({ "--d": `${delay}s` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref as never} className={`sal-reveal ${direction} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
