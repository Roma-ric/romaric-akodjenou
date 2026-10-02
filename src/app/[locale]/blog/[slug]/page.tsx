import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Newspaper, Tag } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getPost, posts } from "@/content/posts";
import BlogBar from "../../components/salimov/BlogBar";

type Props = { params: Promise<{ locale: "en" | "fr"; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    alternates: { canonical: `/${locale}/blog/${slug}` },
    robots: post.placeholder ? { index: false, follow: true } : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "BlogSection" });
  const date = post.date
    ? new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(post.date))
    : t("comingSoon");

  return (
    <div className="sal sal-blogpage">
      <BlogBar backLabel={t("back")} backHref="/blog" />
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
