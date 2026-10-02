'use client'

import { useEffect, useRef, useState } from "react";
import { getScroller } from "@/lib/scroll";

// Compteur animé de 0 à `to`, lancé quand il devient visible
export default function Counter({ to, duration = 1500 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(id);
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { root: getScroller(), threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return <h3 ref={ref} aria-label={String(to)}>{value}</h3>;
}
