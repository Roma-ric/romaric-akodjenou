'use client'

import { CalendarDays, Newspaper } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/content/posts";

export default function PostCard({ post }: { post: Post }) {
  const t = useTranslations("BlogSection");
  const locale = useLocale() as "en" | "fr";

  const date = post.date
    ? new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(post.date))
    : t("comingSoon");

  return (
    <Link href={`/blog/${post.slug}`}>
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
        <span className="category">{post.category[locale]}</span>
        <span className="title">{post.title[locale]}</span>
        <p className="excerpt">{post.excerpt[locale]}</p>
        <span className="meta">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <CalendarDays size={14} aria-hidden="true" /> {date}
          </span>
        </span>
      </span>
    </Link>
  );
}
