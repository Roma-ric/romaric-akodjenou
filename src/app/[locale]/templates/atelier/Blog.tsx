'use client'

import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { posts } from "@/content/posts";
import Reveal from "../../components/salimov/Reveal";
import Heading from "./Heading";

export default function Blog({ num }: { num: string }) {
  const t = useTranslations("Atelier.blog");
  const b = useTranslations("BlogSection");
  const locale = useLocale() as "en" | "fr";
  const date = (iso?: string) =>
    iso
      ? new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(iso))
      : b("comingSoon");

  return (
    <section className="atl-section atl-blog">
      <Heading
        num={num}
        section="blog"
        title={t("title")}
        aside={
          <Link className="atl-link" href="/blog">
            {t("all")} <ArrowUpRight aria-hidden="true" />
          </Link>
        }
      />
      <ul className="atl-posts">
        {posts.slice(0, 3).map((post, i) => (
          <Reveal as="li" className="atl-tile" key={post.slug} delay={0.08 * i}>
            <Link href={`/blog/${post.slug}`}>
              <span className="cat">{post.category[locale]}</span>
              <span className="title">{post.title[locale]}</span>
              <span className="excerpt">{post.excerpt[locale]}</span>
              <span className="date">{date(post.date)}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
