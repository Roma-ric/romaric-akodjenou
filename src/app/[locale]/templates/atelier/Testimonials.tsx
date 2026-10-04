'use client'

import { useTranslations } from "next-intl";
import Reveal from "../../components/salimov/Reveal";
import Heading from "./Heading";

const items = ["0", "1"] as const;

export default function Testimonials({ num }: { num: string }) {
  const t = useTranslations("Atelier.testimonials");
  const q = useTranslations("TestimonialsSection.items");

  return (
    <section className="atl-section atl-testimonials">
      <Heading num={num} section="testimonials" title={t("title")} />
      <ul className="atl-quotes">
        {items.map((i) => (
          <Reveal as="li" className="atl-tile" key={i} delay={0.1 * Number(i)}>
            <blockquote>
              <p>“{q(`${i}.text`)}”</p>
              <footer>
                <span className="avatar" aria-hidden="true">{q(`${i}.name`).charAt(0)}</span>
                <span>
                  <strong>{q(`${i}.name`)}</strong>
                  <span className="muted">{q(`${i}.job`)}</span>
                </span>
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
