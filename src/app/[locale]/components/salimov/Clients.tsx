'use client'

import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import Reveal from "./Reveal";

export default function Clients() {
  const t = useTranslations("ClientsSection");

  return (
    <section className="sal-band">
      <div className="sal-clients">
        <Reveal as="h3">{t("title")}</Reveal>
        <ul>
          {siteConfig.clients.map((name, i) => (
            <Reveal as="li" key={name} delay={0.07 * i}>{name}</Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
