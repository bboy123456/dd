"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Catalog } from "@/lib/types";
import { money } from "@/lib/types";
import { useCart } from "./cart-provider";
import { Icon } from "./icon";
import { ProductArt } from "./product-art";

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const searchRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <div className="announcement">
        <span>Little things. Big tail wags.</span>
        <span>
          Made for a life with pets <Icon name="paw" size={13} />
        </span>
      </div>
      <header className="header">
        <Link href="/" className="wordmark" aria-label="Pawmade home">
          <Icon name="paw" size={30} />
          pawmade<span className="logo-period">✳</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/shop">Shop all</Link>
          <Link href="/shop?pet=dogs">For dogs</Link>
          <Link href="/shop?pet=cats">For cats</Link>
          <Link href="/about">Our story</Link>
          <Link href="/journal">The good life</Link>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            aria-label="Search products"
            onClick={() => searchRef.current?.showModal()}
          >
            <Icon name="search" />
          </button>
          <button
            className="bag-button"
            aria-label={`Open shopping bag, ${count} items`}
            onClick={() => setOpen(true)}
          >
            <Icon name="bag" />
            <span className="bag-label">Bag</span>
            <span className="bag-count">{count}</span>
          </button>
          <button
            className="icon-button mobile-menu-button"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "close" : "menu"} />
          </button>
        </div>
      </header>
      {menu && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {[
            ["/shop", "Shop all"],
            ["/shop?pet=dogs", "For dogs"],
            ["/shop?pet=cats", "For cats"],
            ["/about", "Our story"],
            ["/journal", "The good life"],
          ].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenu(false)}>
              {label}
              <Icon name="arrow" />
            </Link>
          ))}
        </nav>
      )}
      <dialog
        className="search-dialog"
        ref={searchRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) searchRef.current?.close();
        }}
        aria-labelledby="search-title"
      >
        <button
          className="icon-button dialog-close"
          aria-label="Close search"
          onClick={() => searchRef.current?.close()}
        >
          <Icon name="close" />
        </button>
        <p className="eyebrow">FIND THEIR NEXT FAVORITE</p>
        <h2 id="search-title">What are you looking for?</h2>
        <form action="/shop" onSubmit={() => searchRef.current?.close()}>
          <label className="sr-only" htmlFor="site-search">
            Search products
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Try bowls, beds, or toys…"
            required
          />
          <button className="button button-dark" type="submit">
            Search <Icon name="arrow" size={18} />
          </button>
        </form>
      </dialog>
    </>
  );
}

export function CartDrawer({ catalog }: { catalog: Catalog }) {
  const { items, open, setOpen, update } = useCart();
  const dialog = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    if (!open && dialog.current?.open) dialog.current?.close();
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [open]);
  const lines = items.map((item) => ({
    ...item,
    product: catalog.products.find((product) => product.id === item.id),
  }));
  const subtotal = lines.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );
  const invalid = lines.some(
    (item) =>
      !item.product ||
      !item.product.inStock ||
      item.quantity > item.product.maxQuantity,
  );
  async function checkout() {
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error || "Checkout is unavailable. Please try again.",
        );
      window.location.assign(data.url);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Please try again.");
      setBusy(false);
    }
  }
  return (
    <dialog
      ref={dialog}
      className="cart-dialog"
      aria-labelledby="bag-title"
      onCancel={() => setOpen(false)}
      onClose={() => setOpen(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div className="cart-panel">
        <div className="cart-heading">
          <h2 id="bag-title">
            Your goodie bag
            <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
          </h2>
          <button
            className="icon-button"
            aria-label="Close shopping bag"
            onClick={() => setOpen(false)}
          >
            <Icon name="close" />
          </button>
        </div>
        {items.length === 0 ? (
          <div className="empty-bag">
            <Icon name="bag" size={64} />
            <h3>A little empty. For now.</h3>
            <p>Your best friend&apos;s next favorite is waiting.</p>
            <Link
              href="/shop"
              className="button button-orange"
              onClick={() => setOpen(false)}
            >
              Explore the shop <Icon name="arrow" size={18} />
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {lines.map(({ id, quantity, product }) => (
                <div className="cart-line" key={id}>
                  {product && (
                    <div
                      className="cart-line-art"
                      style={{ background: product.color }}
                    >
                      <ProductArt product={product} />
                    </div>
                  )}
                  <div className="cart-line-info">
                    <h3>{product?.name || "Unavailable product"}</h3>
                    <p>
                      {product
                        ? money(product.price, product.currency)
                        : "Please remove this item"}
                    </p>
                    {product &&
                      (!product.inStock || quantity > product.maxQuantity) && (
                        <p className="form-error">
                          Please update the quantity or remove this item.
                        </p>
                      )}
                    <div className="quantity-row">
                      <div className="quantity-control">
                        <button
                          aria-label={`Decrease ${product?.name || "item"} quantity`}
                          onClick={() => update(id, quantity - 1)}
                          disabled={busy}
                        >
                          <Icon name="minus" size={14} />
                        </button>
                        <span>{quantity}</span>
                        <button
                          aria-label={`Increase ${product?.name || "item"} quantity`}
                          disabled={
                            busy ||
                            !product ||
                            quantity >= product.maxQuantity ||
                            items.reduce(
                              (sum, item) => sum + item.quantity,
                              0,
                            ) >= 50
                          }
                          onClick={() => update(id, quantity + 1)}
                        >
                          <Icon name="plus" size={14} />
                        </button>
                      </div>
                      <button
                        className="text-button"
                        onClick={() => update(id, 0)}
                        disabled={busy}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-bottom">
              <div className="subtotal">
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <p>Shipping and taxes calculated at checkout.</p>
              {catalog.mode === "demo" ? (
                <div className="demo-notice">
                  <strong>You&apos;re exploring our sample collection.</strong>
                  <span>
                    Checkout will open when the store launches. No payment will
                    be collected.
                  </span>
                </div>
              ) : (
                <>
                  <button
                    className="button button-orange checkout-button"
                    disabled={busy || invalid}
                    onClick={checkout}
                  >
                    {busy
                      ? "Preparing checkout…"
                      : "Continue to secure checkout"}
                    <Icon name="lock" size={17} />
                  </button>
                  <p className="checkout-note">
                    You&apos;ll continue to our secure checkout to confirm your
                    order.
                  </p>
                </>
              )}
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button
                className="text-button continue-shopping"
                onClick={() => setOpen(false)}
              >
                A little more browsing
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}

export function Footer({ demo, email }: { demo: boolean; email: string }) {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" className="wordmark">
            <Icon name="paw" size={30} />
            pawmade<span className="logo-period">✳</span>
          </Link>
          <p>
            For the paws that make
            <br />a house a home.
          </p>
          <span className="footer-small">A little more love. Every day.</span>
        </div>
        <div>
          <h3>Good things</h3>
          <Link href="/shop">Shop all</Link>
          <Link href="/shop?pet=dogs">For dogs</Link>
          <Link href="/shop?pet=cats">For cats</Link>
          <Link href="/journal">The good life</Link>
        </div>
        <div>
          <h3>Get to know us</h3>
          <Link href="/about">Our story</Link>
          <Link href="/contact">Say hello</Link>
          <Link href="/policies/shipping">Shipping & returns</Link>
          <Link href="/policies/faq">Common questions</Link>
        </div>
        <div className="footer-note">
          <Icon name="sun" size={33} />
          <h3>
            Good company.
            <br />
            Great little things.
          </h3>
          {email ? (
            <a href={`mailto:${email}`}>{email}</a>
          ) : (
            <Link href="/contact">
              Let&apos;s talk <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 pawmade. Made for the love of pets.</span>
        <div>
          <Link href="/policies/privacy">Privacy</Link>
          <Link href="/policies/terms">Terms</Link>
          <span>United States · USD $</span>
        </div>
      </div>
      {demo && (
        <div className="preview-note">
          STORE PREVIEW · Sample products and concept illustrations. Orders are
          not open yet.
        </div>
      )}
    </footer>
  );
}
