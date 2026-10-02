import { Building2, Clock, Download, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getAge, siteConfig } from "@/config/site";
import Reveal from "./Reveal";
import { skills } from "./skills";

const experienceKeys = ["simam", "carrefoot", "explotel", "fidevo", "romas", "payPlus"] as const;
const educationKeys = ["professionalBachelor", "computerMaintenance", "baccalaureate"] as const;

export default function About() {
  const t = useTranslations("AboutSection");
  const age = getAge(siteConfig.birthDate);

  const infosA = [
    [t("personalInfo.age.label"), t("personalInfo.age.value", { age })],
    [t("personalInfo.nationality.label"), t("personalInfo.nationality.value")],
    [t("personalInfo.freelance.label"), t("personalInfo.freelance.value")],
    [t("personalInfo.languages.label"), t("personalInfo.languages.value")],
  ];
  const infosB = [
    [t("personalInfo.address.label"), t("personalInfo.address.value")],
    [t("personalInfo.phone.label"), t("personalInfo.phone.value")],
    [t("personalInfo.email.label"), t("personalInfo.email.value")],
  ];

  const steps = [
    ...experienceKeys.map((key) => ({
      key,
      title: t(`experiences.${key}.position`),
      period: t(`experiences.${key}.period`),
      place: t(`experiences.${key}.company`),
      icon: <Building2 aria-hidden="true" />,
    })),
    ...educationKeys.map((key) => ({
      key,
      title: t(`education.${key}.degree`),
      period: t(`education.${key}.period`),
      place: t(`education.${key}.institution`),
      icon: <GraduationCap aria-hidden="true" />,
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
        </div>

        <div className="sal-infos-wrap">
          <ul className="sal-infos">
            {infosA.map(([label, value], i) => (
              <Reveal as="li" key={label} delay={0.1 * i}>
                <span>{label} :</span> <span>{value}</span>
              </Reveal>
            ))}
          </ul>
          <ul className="sal-infos">
            {infosB.map(([label, value], i) => (
              <Reveal as="li" key={label} delay={0.1 * i}>
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
          {steps.map(({ key, title, period, place, icon }, i) => (
            <li className="step" key={key}>
              <Reveal className="sal-card" delay={0.05 * (i % 3)}>
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
