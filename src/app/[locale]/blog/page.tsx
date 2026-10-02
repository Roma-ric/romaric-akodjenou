import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { posts } from "@/content/posts";
import BlogBar from "../components/salimov/BlogBar";
import PostCard from "../components/salimov/PostCard";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogSection" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: `/${locale}/blog` },
    // Tant que tous les articles sont des « placeholders », la page n'est pas indexée
    robots: posts.every((p) => p.placeholder) ? { index: false, follow: true } : undefined,
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "BlogSection" });

  return (
    <div className="sal sal-blogpage">
      <BlogBar backLabel={t("backHome")} backHref="/" />
      <main>
        <h1 className="page-title">{t("title")}</h1>
        <ul className="sal-bloggrid">
          {posts.map((post) => (
            <li key={post.slug} className="sal-post">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
