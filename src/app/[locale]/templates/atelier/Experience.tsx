'use client'

import { useTranslations } from "next-intl";
import { experiences } from "@/content/portfolio";
import Reveal from "../../components/salimov/Reveal";
import Heading from "./Heading";

export default function Experience({ num }: { num: string }) {
  const t = useTranslations("Atelier.experience");
  const about = useTranslations("AboutSection.experiences");

  return (
    <section className="atl-section atl-experience">
      <Heading num={num} section="experience" title={t("title")} />
      <ol className="atl-list">
        {experiences.map(({ key, current }, i) => (
          <Reveal as="li" key={key} delay={0.05 * i}>
            <span className={`period${current ? " current" : ""}`}>{about(`${key}.period`)}</span>
            <div>
              <h3>{about(`${key}.position`)}</h3>
              <p>
                {about(`${key}.company`)}
                {current && <span className="atl-tag">{t("current")}</span>}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
