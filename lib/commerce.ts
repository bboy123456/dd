import "server-only";
import { cacheLife } from "next/cache";
import { demoProducts } from "./demo-products";
import { isLive } from "./config";
import type { Catalog, Product } from "./types";

type WooProduct = {
  id: number;
  slug: string;
  name: string;
  type: string;
  short_description: string;
  description: string;
  prices: { price: string; currency_code: string; currency_minor_unit: number };
  categories: { name: string; slug: string }[];
  images: { src: string }[];
  is_in_stock: boolean;
  is_purchasable: boolean;
  add_to_cart?: { maximum?: number };
};

export function wordpressUrl() {
  const configured =
    process.env.WORDPRESS_URL ||
    process.env.NEXT_PUBLIC_WP_API_URL?.replace(/\/wp-json\/.*$/, "");
  if (!configured) throw new Error("WordPress URL is not configured.");
  const url = new URL(configured);
  if (
    url.protocol !== "https:" &&
    !(process.env.NODE_ENV !== "production" && url.hostname === "localhost")
  ) {
    throw new Error("WordPress must use HTTPS.");
  }
  return url.toString().replace(/\/$/, "");
}

function plainText(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getCatalog(): Promise<Catalog> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 300 });
  if (!isLive) return { products: demoProducts, mode: "demo" };
  try {
    const products: Product[] = [];
    // Read all pages so products do not silently disappear after the first 100.
    for (let page = 1; ; page++) {
      const response = await fetch(
        `${wordpressUrl()}/wp-json/wc/store/v1/products?per_page=100&type=simple&catalog_visibility=visible&page=${page}`,
        { signal: AbortSignal.timeout(12000) },
      );
      if (!response.ok)
        throw new Error(`WooCommerce returned ${response.status}`);
      const data: WooProduct[] = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid WooCommerce catalog");
      products.push(
        ...data
          .filter(
            (p) =>
              p.type === "simple" &&
              p.prices.currency_code === "USD" &&
              Number.isFinite(Number(p.prices.price)),
          )
          .map((p) => ({
            id: p.id,
            slug: decodeURIComponent(p.slug),
            name: plainText(p.name),
            subtitle:
              plainText(p.short_description).slice(0, 100) ||
              "A little something for your best friend",
            description:
              plainText(p.description) ||
              plainText(p.short_description) ||
              "Please contact us for product details before ordering.",
            price: Number(p.prices.price) / 10 ** p.prices.currency_minor_unit,
            currency: p.prices.currency_code,
            category: plainText(
              p.categories.find((c) => !["dogs", "cats"].includes(c.slug))
                ?.name || "Everyday essentials",
            ),
            pets: p.categories
              .filter((c) => ["dogs", "cats"].includes(c.slug))
              .map((c) => c.slug),
            image: p.images[0]?.src,
            color: "#eee9e0",
            inStock: p.is_in_stock && p.is_purchasable,
            maxQuantity: Math.max(
              0,
              Math.min(20, p.add_to_cart?.maximum ?? 20),
            ),
          })),
      );
      const pages = Number(response.headers.get("X-WP-TotalPages") || 1);
      if (page >= pages) break;
      if (page >= 20)
        throw new Error("Catalog exceeds the supported 2000-product size");
    }
    return { products, mode: "live" };
  } catch (error) {
    console.error(
      "Catalog unavailable:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return {
      products: [],
      mode: "live",
      error: "Our shop is taking a little breather. Please try again shortly.",
    };
  }
}
