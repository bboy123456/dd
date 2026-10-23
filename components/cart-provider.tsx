"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
import type { CartItem } from "@/lib/types";

const key = "pawmade-cart-v1";
const empty: CartItem[] = [];
let snapshot = empty;
let rawSnapshot: string | null = null;
let memoryOnly = false;
const listeners = new Set<() => void>();
function read() {
  if (memoryOnly) return snapshot;
  try {
    const raw = localStorage.getItem(key);
    if (raw === rawSnapshot) return snapshot;
    rawSnapshot = raw;
    const data: unknown = raw ? JSON.parse(raw) : [];
    const seen = new Set<number>();
    snapshot = Array.isArray(data)
      ? data
          .filter((item): item is CartItem => {
            if (
              !item ||
              !Number.isSafeInteger(item.id) ||
              item.id < 1 ||
              !Number.isSafeInteger(item.quantity) ||
              item.quantity < 1 ||
              item.quantity > 20 ||
              seen.has(item.id)
            )
              return false;
            seen.add(item.id);
            return true;
          })
          .slice(0, 20)
          .map(({ id, quantity }) => ({ id, quantity }))
      : empty;
  } catch {
    /* Retain the in-memory cart if storage is restricted. */
  }
  return snapshot;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}
function write(items: CartItem[]) {
  snapshot = items;
  rawSnapshot = JSON.stringify(items);
  try {
    localStorage.setItem(key, rawSnapshot);
  } catch {
    memoryOnly = true;
  }
  listeners.forEach((listener) => listener());
}

type CartContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (id: number, maxQuantity: number) => void;
  update: (id: number, quantity: number) => void;
};
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const add = useCallback((id: number, maxQuantity: number) => {
    const current = read();
    const existing = current.find((item) => item.id === id);
    if (maxQuantity < 1) return;
    const next = existing
      ? current.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(maxQuantity, 20, item.quantity + 1),
              }
            : item,
        )
      : [...current, { id, quantity: 1 }];
    if (
      next.length <= 20 &&
      next.reduce((sum, item) => sum + item.quantity, 0) <= 50
    )
      write(next);
    setOpen(true);
  }, []);
  const update = useCallback((id: number, quantity: number) => {
    const next = read()
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.min(20, quantity) } : item,
      )
      .filter((item) => item.quantity > 0);
    if (next.reduce((sum, item) => sum + item.quantity, 0) <= 50) write(next);
  }, []);
  return (
    <CartContext.Provider
      value={{
        open,
        setOpen,
        add,
        update,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  // Each streamed consumer hydrates with the server snapshot independently.
  const items = useSyncExternalStore(subscribe, read, () => empty);
  if (!context) throw new Error("CartProvider is required");
  return {
    ...context,
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}
