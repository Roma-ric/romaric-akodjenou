'use client'

import { useTranslations } from "next-intl";
import { serviceKeys } from "@/content/portfolio";
import Reveal from "../../components/salimov/Reveal";
import Heading from "./Heading";

export default function Services({ num }: { num: string }) {
  const t = useTranslations("Atelier.services");
  const s = useTranslations("ServicesSection.services");

  return (
    <section className="atl-section atl-services">
      <Heading num={num} section="services" title={t("title")} />
      <ol className="atl-list numbered">
        {serviceKeys.map((key, i) => (
          <Reveal as="li" key={key} delay={0.05 * i}>
            <span className="period">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{s(`${key}.title`)}</h3>
              <p>{s(`${key}.description`)}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
