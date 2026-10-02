import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { publishedPosts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_APP_LINK ?? "").replace(/\/$/, "");
  const alternates = (path: string) => ({
    languages: Object.fromEntries(routing.locales.map((l) => [l, `${base}/${l}${path}`])),
  });

  const pages = ["", ...(publishedPosts().length ? ["/blog"] : []), ...publishedPosts().map((p) => `/blog/${p.slug}`)];

  return routing.locales.flatMap((locale) =>
    pages.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      alternates: alternates(path),
    })),
  );
}
