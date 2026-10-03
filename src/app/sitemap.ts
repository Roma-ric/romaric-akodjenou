import type { MetadataRoute } from "next";
import { publishedPosts } from "@/content/posts";

// Une seule adresse par page : la langue n'apparaît pas dans l'URL (choisie par cookie)
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_APP_LINK ?? "").replace(/\/$/, "");
  const posts = publishedPosts();
  const pages = ["", ...(posts.length ? ["/blog"] : []), ...posts.map((p) => `/blog/${p.slug}`)];

  return pages.map((path) => ({ url: `${base}${path || "/"}`, lastModified: new Date() }));
}
