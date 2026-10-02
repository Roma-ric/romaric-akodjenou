'use client'

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

const projects = [
  { key: "founders", link: "https://founders.friym.com", src: "/realisation/founders-friym.png" },
  { key: "brand", link: "https://brand.friym.com", src: "/realisation/brand-friym.png" },
  { key: "simam-cargo", link: "https://simam-cargo.vercel.app", src: "/realisation/simam-cargo.png" },
  { key: "template-carrefoot-2", link: "https://vote.carrefoot.com", src: "/realisation/template-carrefoot-2.png" },
  { key: "timer", link: "https://nexus-timer.vercel.app/", src: "/realisation/timer.png" },
] as const;

export default function Portfolio() {
  const t = useTranslations("ProjectsSection");
  const reduceMotion = useReducedMotion();
  const [[index, direction], setPage] = useState<[number, number]>([0, 1]);

  const go = (to: number) =>
    setPage(([current]) => [(to + projects.length) % projects.length, to >= current ? 1 : -1]);

  const project = projects[index];
  const host = new URL(project.link).hostname;

  return (
    <section className="sal-section sal-portfolio">
      <div className="sal-title">
        <h3>{t("title")}</h3>
      </div>

      <div className="sal-carousel" aria-roledescription="carousel" aria-label={t("title")}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={project.key}
            className="sal-slide"
            custom={direction}
            initial={reduceMotion ? false : { opacity: 0, y: 60 * direction }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -60 * direction }}
            transition={{ duration: 0.35 }}
          >
            <a className="shot" href={project.link} target="_blank" rel="noopener noreferrer">
              <Image
                src={project.src}
                alt={t(`projects.${project.key}.title`)}
                fill
                sizes="(min-width: 1024px) 650px, 90vw"
              />
            </a>
            <div className="details">
              <h4>{t(`projects.${project.key}.title`)}</h4>
              <p>{t(`projects.${project.key}.description`)}</p>
              <p className="meta">
                <ArrowUpRight size={16} aria-hidden="true" /> <b>{host}</b>
              </p>
              <a className="sal-btn" href={project.link} target="_blank" rel="noopener noreferrer">
                <span>{t("preview")} <ArrowUpRight size={16} aria-hidden="true" /></span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="sal-nav">
          <button type="button" className="sal-round" onClick={() => go(index + 1)} aria-label={t("next")}>
            <ChevronDown aria-hidden="true" />
          </button>
          <button type="button" className="sal-round" onClick={() => go(index - 1)} aria-label={t("previous")}>
            <ChevronUp aria-hidden="true" />
          </button>
        </div>

        <div className="sal-dots">
          {projects.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => go(i)}
              aria-label={`${i + 1} / ${projects.length}`}
              aria-current={i === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
