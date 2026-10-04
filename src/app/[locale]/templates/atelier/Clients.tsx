'use client'

import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import Reveal from "../../components/salimov/Reveal";
import Heading from "./Heading";

export default function Clients({ num }: { num: string }) {
  const t = useTranslations("Atelier.clients");

  return (
    <section className="atl-section atl-clients">
      <Heading num={num} section="clients" title={t("title")} />
      <ul>
        {siteConfig.clients.map((name, i) => (
          <Reveal as="li" key={name} delay={0.05 * i}>
            {name}
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
