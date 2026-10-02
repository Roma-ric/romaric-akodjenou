import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

const items = ["0", "1"] as const;

export default function Testimonials() {
  const t = useTranslations("TestimonialsSection");

  return (
    <section className="sal-band">
      <h2 className="sr-only">{t("title")}</h2>
      <div className="sal-quotes">
        {items.map((i) => (
          <Reveal className="sal-quote" key={i} delay={0.15 * Number(i)}>
            <blockquote>
              <span className="text">“{t(`items.${i}.text`)}”</span>
              <span className="person">{t(`items.${i}.name`)}</span>
              <span className="job">{t(`items.${i}.job`)}</span>
            </blockquote>
            <span className="avatar" aria-hidden="true">{t(`items.${i}.name`).charAt(0)}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
