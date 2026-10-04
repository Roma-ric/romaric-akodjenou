'use client'

import { ArrowLeft, CalendarDays } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getPost, posts } from "@/content/posts";
import type { AppLocale } from "@/i18n/LocaleProvider";
import { useDocumentMeta } from "../../components/salimov/DocumentMeta";
import { LanguageSwitch, ThemeButton } from "../../components/salimov/Header";
import { atelierFonts } from "./fonts";
import "./atelier.css";

// Pages du blog du modèle Atelier : défilement vertical, barre fixe (monogramme, langue, thème).

function useDate(style: "medium" | "long") {
  const locale = useLocale();
  const t = useTranslations("BlogSection");
  // Fuseau fixe : serveur et navigateur affichent le même jour
  return (iso?: string) =>
    iso ? new Intl.DateTimeFormat(locale, { dateStyle: style, timeZone: "UTC" }).format(new Date(iso)) : t("comingSoon");
}

function Bar() {
  const t = useTranslations("Atelier.nav");
  return (
    <>
      <Link href="/" className="atl-monogram" aria-label={t("home")}>
        RA
      </Link>
      <div className="atl-tools">
        <LanguageSwitch />
        <ThemeButton />
      </div>
    </>
  );
}

export function AtelierBlogIndex() {
  const t = useTranslations("BlogSection");
  const a = useTranslations("Atelier.blog");
  const locale = useLocale() as AppLocale;
  const date = useDate("medium");
  useDocumentMeta(t("metaTitle"), t("metaDescription"));

  return (
    <div className={`atl atl-standalone ${atelierFonts}`}>
      <Bar />
      <main className="atl-page">
        <Link href="/" className="atl-back">
          <ArrowLeft aria-hidden="true" /> {t("backHome")}
        </Link>
        <header className="atl-heading">
          <div>
            <p className="atl-kicker">{t("metaTitle")}</p>
            <h1>{a("title")}</h1>
          </div>
        </header>
        <ul className="atl-posts">
          {posts.map((post) => (
            <li key={post.slug} className="atl-tile">
              <Link href={`/blog/${post.slug}`}>
                <span className="cat">{post.category[locale]}</span>
                <span className="title">{post.title[locale]}</span>
                <span className="excerpt">{post.excerpt[locale]}</span>
                <span className="date">{date(post.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export function AtelierPostView({ slug }: { slug: string }) {
  const t = useTranslations("BlogSection");
  const locale = useLocale() as AppLocale;
  const date = useDate("long");
  const post = getPost(slug)!;
  useDocumentMeta(post.title[locale], post.excerpt[locale]);

  return (
    <div className={`atl atl-standalone ${atelierFonts}`}>
      <Bar />
      <main className="atl-page atl-article">
        <Link href="/blog" className="atl-back">
          <ArrowLeft aria-hidden="true" /> {t("back")}
        </Link>
        <p className="atl-kicker">{post.category[locale]}</p>
        <h1>{post.title[locale]}</h1>
        <p className="meta">
          <CalendarDays aria-hidden="true" /> {date(post.date)}
        </p>
        <div className="body">
          {post.body[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </main>
    </div>
  );
}
