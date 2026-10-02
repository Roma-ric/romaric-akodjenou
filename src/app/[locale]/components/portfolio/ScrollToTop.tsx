"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { SCROLLER_ID, getScroller, scrollToSection } from "@/lib/scroll";

// Retour à l'accueil : visible dès qu'on a dépassé le premier écran
// (horizontalement sur ordinateur, verticalement sur mobile).
const ScrollToTop = () => {
  const t = useTranslations("ScrollToTop");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scroller = document.getElementById(SCROLLER_ID);

    const toggleVisibility = () => {
      const horizontal = getScroller();
      const offset = horizontal ? horizontal.scrollLeft : window.scrollY;
      const size = horizontal ? window.innerWidth : window.innerHeight;
      setIsVisible(offset > size);
    };

    scroller?.addEventListener("scroll", toggleVisibility, { passive: true });
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    window.addEventListener("resize", toggleVisibility);
    return () => {
      scroller?.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => scrollToSection("home")}
      aria-label={t("label")}
      title={t("label")}
      className={`fixed ${isVisible ? "block" : "hidden"} right-0 bottom-0 p-2 bg-black dark:bg-white rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 z-50 m-5`}
    >
      <ArrowUp className="w-5 h-5 text-white dark:text-black" aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
