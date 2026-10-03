'use client'

import { Briefcase, Building2, Clock, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Reveal from "./Reveal";
import { skills } from "./skills";

// Du plus récent au plus ancien : postes en cours d'abord, puis par date de fin
const experienceKeys = ["carrefoot", "fidevo", "simam", "explotel", "romas", "payPlus"] as const;

// `age` est calculé sur le serveur (page régénérée chaque jour) : le client affiche la même valeur.
export default function About({ age }: { age: number }) {
  const t = useTranslations("AboutSection");

  // Clé stable (pas le libellé traduit) : au changement de langue, l'élément est conservé
  const info = (key: "age" | "nationality" | "freelance" | "languages" | "address" | "phone" | "email") =>
    [key, t(`personalInfo.${key}.label`), t(`personalInfo.${key}.value`, { age })] as const;
  const infosA = [info("age"), info("nationality"), info("freelance"), info("languages")];
  const infosB = [info("address"), info("phone"), info("email")];

  const steps = [
    ...experienceKeys.map((key) => ({
      key,
      title: t(`experiences.${key}.position`),
      period: t(`experiences.${key}.period`),
      place: t(`experiences.${key}.company`),
      icon: <Building2 aria-hidden="true" />,
      mark: <Briefcase aria-hidden="true" />,
    })),
  ];

  return (
    <section className="sal-section sal-about">
      {/* Infos personnelles */}
      <div className="info">
        <Reveal className="sal-photo">
          <Image
            src="/files/profile-bg.png"
            alt={t("photoAlt")}
            fill
            sizes="(min-width: 1024px) 380px, 90vw"
            className="object-cover"
          />
        </Reveal>

        <div className="name-block">
          <h2 className="sal-name">
            <Reveal as="span">{t("personalInfo.firstName.value")}</Reveal>
            <Reveal as="span" delay={0.15}>{t("personalInfo.lastName.value")}</Reveal>
          </h2>

        <div className="sal-infos-wrap">
          <ul className="sal-infos">
            {infosA.map(([key, label, value], i) => (
              <Reveal as="li" key={key} delay={0.1 * i}>
                <span>{label} :</span> <span>{value}</span>
              </Reveal>
            ))}
          </ul>
          <ul className="sal-infos">
            {infosB.map(([key, label, value], i) => (
              <Reveal as="li" key={key} delay={0.1 * i}>
                <span>{label} :</span> <span>{value}</span>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.3}>
              <span>CV :</span>{" "}
              <a href="/cv/CV-de-Romaric-AKODJENOU.pdf" download>
                <Download size={16} aria-hidden="true" style={{ display: "inline", marginRight: 6 }} />
                {t("downloadText")}
              </a>
            </Reveal>
          </ul>
        </div>
        </div>
      </div>

      {/* Compétences */}
      <div className="sal-about-block">
        <div className="sal-title">
          <Reveal as="h3" from="left">{t("skillsTitle")}</Reveal>
        </div>
        <ul className="sal-skills-content">
          {skills.map(({ name, logo }, i) => (
            <Reveal as="li" className="sal-skill" key={name} delay={0.05 * (i % 6)}>
              <div className="diamond" aria-hidden="true">{logo}</div>
              <h4>{name}</h4>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Parcours */}
      <div className="sal-about-block sal-resume">
        <div className="sal-title">
          <Reveal as="h3" from="left">{t("resumeTitle")}</Reveal>
        </div>
        <ol className="sal-timeline">
          {steps.map(({ key, title, period, place, icon, mark }, i) => (
            <li className="step" key={key}>
              <Reveal className="sal-card" delay={0.05 * (i % 3)}>
                <span className="mark">{mark}</span>
                <h4>{title}</h4>
                <p><Clock aria-hidden="true" /> <span>{period}</span></p>
                <p>{icon} <span>{place}</span></p>
              </Reveal>
            </li>
          ))}
          <li className="step" aria-hidden="true" />
        </ol>
      </div>
    </section>
  );
}
