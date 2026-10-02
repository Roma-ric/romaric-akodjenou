'use client'

import { useEffect } from "react";

// Fait défiler jusqu'à la section ciblée par le hash de l'URL au chargement
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const timer = setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
