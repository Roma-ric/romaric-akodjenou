'use client'

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { projects } from "@/content/portfolio";
import Reveal from "../../components/salimov/Reveal";
import Heading from "./Heading";

/**
 * Ordinateur : toutes les cartes côte à côte (elles défilent avec la page).
 * Mobile / tablette : une carte à la fois, avec précédent / « Voir » / suivant sur une ligne.
 */
export default function Projects({ num }: { num: string }) {
  const t = useTranslations("Atelier.projects");
  const p = useTranslations("ProjectsSection");
  const [index, setIndex] = useState(0);
  const go = (to: number) => setIndex((to + projects.length) % projects.length);
  const active = projects[index];

  return (
    <section className="atl-section atl-projects">
      <Heading
        num={num}
        section="projects"
        title={t("title")}
        aside={<p className="atl-count">{t("count", { count: projects.length })}</p>}
      />

      <ul className="atl-cards" aria-roledescription="carousel">
        {projects.map(({ key, link, src }, i) => (
          <Reveal as="li" key={key} delay={0.08 * i} className={i === index ? "active" : ""}>
            <a className="shot" href={link} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
              <Image src={src} alt="" fill sizes="(min-width: 1025px) 22rem, 92vw" />
            </a>
            <p className="cat">
              {String(i + 1).padStart(2, "0")} · {p(`projects.${key}.category`)}
            </p>
            <h3>{p(`projects.${key}.title`)}</h3>
            <p className="desc">{p(`projects.${key}.description`)}</p>
            <a className="atl-link" href={link} target="_blank" rel="noopener noreferrer">
              {p("preview")} <ArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>
        ))}
      </ul>

      <div className="atl-carousel-nav">
        <button type="button" className="atl-icon-btn" onClick={() => go(index - 1)} aria-label={p("previous")}>
          <ChevronLeft aria-hidden="true" />
        </button>
        <a className="atl-btn primary" href={active.link} target="_blank" rel="noopener noreferrer">
          {p("previewShort")} <ArrowUpRight aria-hidden="true" />
        </a>
        <button type="button" className="atl-icon-btn" onClick={() => go(index + 1)} aria-label={p("next")}>
          <ChevronRight aria-hidden="true" />
        </button>
        <p className="sr-only" aria-live="polite">
          {t("position", { current: index + 1, total: projects.length })}
        </p>
      </div>
    </section>
  );
}
