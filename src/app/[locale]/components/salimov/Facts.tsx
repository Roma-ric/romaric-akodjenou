import { useTranslations } from "next-intl";
import Counter from "./Counter";
import Reveal from "./Reveal";
import { skills } from "./skills";

export default function Facts() {
  const t = useTranslations("AboutSection.stats");

  const facts = [
    { to: t.raw("yearsOfExperience.value"), label: t("yearsOfExperience.label") },
    { to: t.raw("completedProjects.value"), label: t("completedProjects.label") },
    { to: t.raw("happyCustomers.value"), label: t("happyCustomers.label") },
    { to: String(skills.length), label: t("technologies.label") },
  ];

  return (
    <section className="sal-band sal-facts">
      <ul className="sal-facts-grid">
        {facts.map(({ to, label }, i) => (
          <Reveal as="li" className="sal-fact-wrap" key={label} delay={0.12 * i}>
            <div className="sal-fact">
              <div>
                <Counter to={Number(to)} />
                <p>{label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
