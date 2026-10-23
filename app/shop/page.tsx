import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCatalog } from "@/components/catalog";
import { getCatalog } from "@/lib/commerce";
export const metadata: Metadata = {
  title: "Shop everyday pet essentials",
  alternates: { canonical: "/shop" },
};
async function Collection({
  searchParams,
}: {
  searchParams: Promise<{ pet?: string; q?: string }>;
}) {
  const [catalog, params] = await Promise.all([getCatalog(), searchParams]);
  const pet = typeof params.pet === "string" ? params.pet : "all";
  const q = typeof params.q === "string" ? params.q : "";
  return (
    <ProductCatalog
      key={`${pet}-${q}`}
      catalog={catalog}
      initialPet={pet}
      initialQuery={q}
    />
  );
}
export default function Shop({
  searchParams,
}: {
  searchParams: Promise<{ pet?: string; q?: string }>;
}) {
  return (
    <main id="main" className="section-wrap shop-page">
      <div className="page-heading">
        <p className="eyebrow">THE GOOD STUFF, ALL IN ONE PLACE</p>
        <h1>
          The everyday <span>extraordinary.</span>
        </h1>
        <p>
          For their favorite moments. And the ones you haven&apos;t made yet.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="catalog-loading">Finding their next favorite…</div>
        }
      >
        <Collection searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
