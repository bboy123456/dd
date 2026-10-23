import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCatalog } from "@/lib/commerce";
import { money } from "@/lib/types";
import { ProductArt } from "@/components/product-art";
import { AddToBag, ProductCard } from "@/components/catalog";
import { Icon } from "@/components/icon";

type Props = { params: Promise<{ slug: string }> };
function decodeSlug(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decodeSlug((await params).slug);
  const catalog = await getCatalog();
  const product = catalog.products.find((product) => product.slug === slug);
  return {
    title: product?.name || "Product",
    description: product?.subtitle,
    alternates: { canonical: `/products/${encodeURIComponent(slug)}` },
  };
}
async function ProductDetail({ params }: Props) {
  const slug = decodeSlug((await params).slug);
  const catalog = await getCatalog();
  if (catalog.error)
    return (
      <div className="empty-state">
        <h1>A little pause.</h1>
        <p>{catalog.error}</p>
        <Link href="/shop" className="button button-dark">
          Back to the shop
        </Link>
      </div>
    );
  const product = catalog.products.find((product) => product.slug === slug);
  if (!product) notFound();
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>
      <div className="product-detail">
        <div className="detail-art" style={{ background: product.color }}>
          <ProductArt product={product} priority />
          {catalog.mode === "demo" && (
            <span className="detail-art-note">
              PRODUCT CONCEPT · SAMPLE COLLECTION
            </span>
          )}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-subtitle">{product.subtitle}</p>
          <div className="detail-price">
            {money(product.price, product.currency)}
            <span>
              {product.inStock ? "Available" : "Currently out of stock"}
            </span>
          </div>
          <p className="detail-description">{product.description}</p>
          <AddToBag product={product} large />
          <p className="detail-shipping">
            <Icon name="bag" size={16} /> Shipping and taxes calculated at
            checkout.
          </p>
          {catalog.mode === "demo" && (
            <div className="demo-notice">
              This sample helps you explore the shop. It is not currently
              available to purchase.
            </div>
          )}
          <details open>
            <summary>The little details</summary>
            <p>
              {catalog.mode === "demo"
                ? "The illustrated color is a concept. Final dimensions, materials, safety information, and care instructions will be confirmed before launch."
                : product.description}
            </p>
          </details>
          <details>
            <summary>Shipping & returns</summary>
            <p>
              Review the available shipping options at checkout.{" "}
              <Link href="/policies/shipping" className="inline-link">
                Read shipping and returns information.
              </Link>
            </p>
          </details>
        </div>
      </div>
      <section className="related-products">
        <p className="eyebrow">A LITTLE MORE TO LOVE</p>
        <h2>Good things go together.</h2>
        <div className="product-grid">
          {catalog.products
            .filter((item) => item.id !== product.id)
            .slice(0, 3)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>
    </>
  );
}
export default function ProductPage(props: Props) {
  return (
    <main id="main" className="section-wrap product-page">
      <Suspense
        fallback={
          <div className="catalog-loading">Getting the little details…</div>
        }
      >
        <ProductDetail {...props} />
      </Suspense>
    </main>
  );
}
