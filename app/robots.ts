import type { MetadataRoute } from "next";
import { indexingEnabled, siteUrl } from "@/lib/config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexingEnabled
      ? { userAgent: "*", allow: "/", disallow: ["/api/"] }
      : { userAgent: "*", disallow: "/" },
    ...(indexingEnabled ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
