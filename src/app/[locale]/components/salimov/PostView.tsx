'use client'

import { CalendarDays, Newspaper, Tag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getPost } from "@/content/posts";
import type { AppLocale } from "@/i18n/LocaleProvider";
import BlogBar from "./BlogBar";
import { useDocumentMeta } from "./DocumentMeta";

// Page d'un article (/blog/[slug]) ; le slug est vérifié par la page serveur
export default function PostView({ slug }: { slug: string }) {
  const t = useTranslations("BlogSection");
  const locale = useLocale() as AppLocale;
  const post = getPost(slug)!;
  useDocumentMeta(post.title[locale], post.excerpt[locale]);

  // Fuseau fixe : serveur et navigateur affichent le même jour
  const date = post.date
    ? new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.date))
    : t("comingSoon");

  return (
    <div className="sal sal-blogpage">
      <BlogBar back="blog" />
      <article className="sal-article">
        <div className="banner" aria-hidden="true">
          <Newspaper size={72} />
        </div>
        <span className="cat">{post.category[locale]}</span>
        <h1>{post.title[locale]}</h1>
        <div className="meta">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <CalendarDays size={15} aria-hidden="true" /> {date}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Tag size={15} aria-hidden="true" /> {post.category[locale]}
          </span>
        </div>
        <div className="body">
          {post.body[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
