"use client";
import Link from "next/link";
import { useState } from "react";
import { money, type Catalog, type Product } from "@/lib/types";
import { ProductArt } from "./product-art";
import { Icon } from "./icon";
import { useCart } from "./cart-provider";

export function AddToBag({
  product,
  large = false,
}: {
  product: Product;
  large?: boolean;
}) {
  const { add } = useCart();
  return (
    <button
      className={large ? "button button-orange product-add" : "quick-add"}
      disabled={!product.inStock || product.maxQuantity < 1}
      aria-label={`Add ${product.name} to bag`}
      onClick={() => add(product.id, product.maxQuantity)}
    >
      {large && (product.inStock ? "Add to bag" : "Out of stock")}
      <Icon name="plus" size={large ? 20 : 18} />
    </button>
  );
}
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-visual" style={{ background: product.color }}>
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
        >
          <ProductArt product={product} />
        </Link>
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        <AddToBag product={product} />
      </div>
      <div className="product-info">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3>{product.name}</h3>
          </Link>
          <p>{product.subtitle}</p>
        </div>
        <span>{money(product.price, product.currency)}</span>
      </div>
    </article>
  );
}
export function ProductCatalog({
  catalog,
  initialPet = "all",
  initialQuery = "",
  featured = false,
}: {
  catalog: Catalog;
  initialPet?: string;
  initialQuery?: string;
  featured?: boolean;
}) {
  const [pet, setPet] = useState(
    ["dogs", "cats"].includes(initialPet) ? initialPet : "all",
  );
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const categories = [
    ...new Set(catalog.products.map((product) => product.category)),
  ];
  let products = catalog.products.filter(
    (product) =>
      (pet === "all" || product.pets.includes(pet)) &&
      (category === "all" || product.category === category) &&
      `${product.name} ${product.subtitle} ${product.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  if (sort === "price-asc")
    products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc")
    products = [...products].sort((a, b) => b.price - a.price);
  if (sort === "name")
    products = [...products].sort((a, b) => a.name.localeCompare(b.name));
  if (featured) products = products.slice(0, 4);
  return (
    <div className="catalog">
      <div className="catalog-toolbar">
        <div className="filter-tabs" aria-label="Filter by pet">
          {[
            ["all", "For everyone"],
            ["dogs", "For dogs"],
            ["cats", "For cats"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={pet === value ? "active" : ""}
              aria-pressed={pet === value}
              onClick={() => setPet(value)}
            >
              {label}
            </button>
          ))}
        </div>
        {featured ? (
          <Link href="/shop" className="text-link">
            Shop the whole collection <Icon name="arrow" size={18} />
          </Link>
        ) : (
          <div className="catalog-controls">
            <label className="sr-only" htmlFor="catalog-search">
              Search collection
            </label>
            <input
              id="catalog-search"
              type="search"
              placeholder="Find a little something…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <label className="sr-only" htmlFor="catalog-sort">
              Sort products
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </div>
        )}
      </div>
      {!featured && (
        <div className="category-filters">
          <button
            className={category === "all" ? "active" : ""}
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            All essentials
          </button>
          {categories.map((value) => (
            <button
              key={value}
              className={category === value ? "active" : ""}
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
          <span aria-live="polite">{products.length} good things</span>
        </div>
      )}
      {catalog.error ? (
        <div className="empty-state" role="alert">
          <h3>Back in a little while.</h3>
          <p>{catalog.error}</p>
          <button
            className="button button-dark"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      ) : products.length ? (
        <div className={`product-grid ${featured ? "featured-grid" : ""}`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="search" size={36} />
          <h3>No little treasures here. Yet.</h3>
          <p>Try another search or explore the whole collection.</p>
          <button
            className="button button-dark"
            onClick={() => {
              setQuery("");
              setPet("all");
              setCategory("all");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
