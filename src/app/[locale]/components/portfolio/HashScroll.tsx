'use client'

import { useEffect } from "react";
import { scrollToSection } from "@/lib/scroll";

// Au chargement, rejoint directement la section ciblée par le hash de l'URL
export default function HashScroll() {
  useEffect(() => {
    const id = window.location.hash.substring(1);
    if (!id) return;
    const timer = setTimeout(() => scrollToSection(id, "instant"), 50);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
