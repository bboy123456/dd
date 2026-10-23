import type { MetadataRoute } from "next";
import { siteUrl, indexingEnabled } from "@/lib/config";
import { getCatalog } from "@/lib/commerce";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!indexingEnabled) return [];
  const catalog = await getCatalog();
  return [
    "",
    "/shop",
    "/about",
    "/journal",
    "/contact",
    ...catalog.products.map((product) => `/products/${product.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path === "/shop" ? 0.9 : 0.7,
  }));
}
