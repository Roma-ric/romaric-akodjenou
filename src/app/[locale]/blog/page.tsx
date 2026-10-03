import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { posts } from "@/content/posts";
import BlogIndex from "../components/salimov/BlogIndex";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogSection" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/blog" },
    // Tant que tous les articles sont des « placeholders », la page n'est pas indexée
    robots: posts.every((p) => p.placeholder) ? { index: false, follow: true } : undefined,
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogIndex />;
}
