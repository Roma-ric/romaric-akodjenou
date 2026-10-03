'use client'

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { scrollToSection } from "@/lib/scroll";

export default function Home() {
  const t = useTranslations("HeroSection");

  return (
    <section className="sal-home">
      <div className="sal-home-inner">
        <h1 aria-label={`${t("greeting")}. ${t("iAm")} ${t("firstName")}`}>
          <span className="line" aria-hidden="true">
            <span className="word">{t("greeting")}.</span>
          </span>
          <span className="line" aria-hidden="true">
            <span className="word">{t("iAm")}</span>
          </span>
          <span className="line" aria-hidden="true">
            <span className="word">{t("firstName")}</span>
          </span>
        </h1>

        <p className="intro">{t("intro")}</p>
        <p className="sr-only">{t("description")}</p>

        <button
          type="button"
          className="sal-round cta"
          onClick={() => scrollToSection("about")}
          aria-label={t("moreText")}
          title={t("moreText")}
        >
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
