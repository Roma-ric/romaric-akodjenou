import { CalendarDays, Newspaper } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";

const posts = ["0", "1", "2"] as const;

export default function Blog() {
  const t = useTranslations("BlogSection");

  return (
    <section className="sal-section">
      <div className="sal-title">
        <Reveal as="h3" from="left">{t("title")}</Reveal>
      </div>
      <ul className="sal-posts">
        {posts.map((i) => (
          <Reveal as="li" className="sal-post" key={i} delay={0.12 * Number(i)}>
            <Link href="/blog">
              <span className="img-holder">
                <span
                  aria-hidden="true"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    height: 200,
                    color: "var(--sal-accent-fg)",
                    background: "linear-gradient(135deg, var(--sal-accent), #ff7a00)",
                  }}
                >
                  <Newspaper size={56} />
                </span>
              </span>
              <span className="content">
                <span className="category">{t(`posts.${i}.category`)}</span>
                <span className="title">{t(`posts.${i}.title`)}</span>
                <p className="excerpt">{t(`posts.${i}.excerpt`)}</p>
                <span className="meta">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <CalendarDays size={14} aria-hidden="true" /> {t(`posts.${i}.date`)}
                  </span>
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
