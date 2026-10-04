import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getPost, posts } from "@/content/posts";
import { currentTemplate } from "@/lib/template";
import { AtelierPostView } from "../../templates/atelier/BlogPages";
import PostView from "../../components/salimov/PostView";

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
    alternates: { canonical: `/blog/${slug}` },
    robots: post.placeholder ? { index: false, follow: true } : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!getPost(slug)) notFound();
  return (await currentTemplate()) === "atelier" ? <AtelierPostView slug={slug} /> : <PostView slug={slug} />;
}
