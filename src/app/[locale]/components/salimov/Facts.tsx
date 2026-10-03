'use client'

import { useTranslations } from "next-intl";
import Counter from "./Counter";
import Reveal from "./Reveal";

export default function Facts() {
  const t = useTranslations("AboutSection.stats");

  // `prefix` (ex. « + ») s'affiche devant le nombre : « +9 projets réalisés »
  const stat = (key: "yearsOfExperience" | "completedProjects" | "happyCustomers") => ({
    key,
    to: t.raw(`${key}.value`) as number,
    prefix: t.has(`${key}.prefix`) ? t(`${key}.prefix`) : "",
    label: t(`${key}.label`),
  });
  const facts = [stat("yearsOfExperience"), stat("completedProjects"), stat("happyCustomers")];

  return (
    <section className="sal-band sal-facts">
      <ul className="sal-facts-grid">
        {facts.map(({ key, to, prefix, label }, i) => (
          <Reveal as="li" className="sal-fact-wrap" key={key} delay={0.12 * i}>
            <div className="sal-fact">
              <div>
                <Counter to={Number(to)} prefix={prefix} />
                <p>{label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
