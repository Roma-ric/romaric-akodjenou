'use client'

import Image from "next/image";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { CV_PATH, PHOTO_PATH } from "@/content/portfolio";
import Counter from "../../components/salimov/Counter";
import Reveal from "../../components/salimov/Reveal";
import { skills } from "../../components/salimov/skills";
import Heading from "./Heading";
import { useStats } from "./useStats";

const infoKeys = ["age", "nationality", "languages", "freelance", "phone", "address"] as const;
const bio = ["0", "1", "2"] as const;

export default function About({ num, age }: { num: string; age: number }) {
  const t = useTranslations("Atelier.about");
  const home = useTranslations("Atelier.home");
  const about = useTranslations("AboutSection");
  const stats = useStats();

  return (
    <section className="atl-section atl-about">
      <Heading num={num} section="about" title={t("title")} />

      <div className="atl-bento">
        <Reveal as="section" className="atl-tile atl-bio">
          <div className="who">
            <Image src={PHOTO_PATH} alt="" width={64} height={64} />
            <div>
              <p className="name">
                {about("personalInfo.firstName.value")} {about("personalInfo.lastName.value")}
              </p>
              <p className="muted">{home("role")}</p>
            </div>
          </div>
          {bio.map((i) => (
            <p key={i}>{t(`bio.${i}`)}</p>
          ))}
          <a className="atl-btn" href={CV_PATH} download>
            <Download aria-hidden="true" /> {t("cv")}
          </a>
        </Reveal>

        <div className="atl-stack">
          <Reveal as="section" className="atl-tile atl-counters" delay={0.1}>
            <ul>
              {stats.map(({ key, to, prefix, label }) => (
                <li key={key}>
                  <Counter to={to} prefix={prefix} />
                  <p>{label}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="section" className="atl-tile atl-infos" delay={0.15}>
            <dl>
              {infoKeys.map((key) => (
                <div key={key}>
                  <dt>{about(`personalInfo.${key}.label`)}</dt>
                  <dd>{about(`personalInfo.${key}.value`, { age })}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal as="section" className="atl-tile atl-skills" delay={0.2}>
          <h3>{t("skills")}</h3>
          <ul>
            {skills.map(({ name, logo }) => (
              <li key={name}>
                <span className="logo" aria-hidden="true">{logo}</span>
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
