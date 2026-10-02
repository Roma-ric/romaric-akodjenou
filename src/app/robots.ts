import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_LINK;
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(base ? { sitemap: `${base.replace(/\/$/, "")}/sitemap.xml` } : {}),
  };
}
