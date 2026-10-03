'use client'

import { useTranslations } from "next-intl";
import { posts } from "@/content/posts";
import BlogBar from "./BlogBar";
import { useDocumentMeta } from "./DocumentMeta";
import PostCard from "./PostCard";

// Liste des articles (/blog)
export default function BlogIndex() {
  const t = useTranslations("BlogSection");
  useDocumentMeta(t("metaTitle"), t("metaDescription"));

  return (
    <div className="sal sal-blogpage">
      <BlogBar back="home" />
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
