import type { CartItem } from "./types";

export function validateCart(value: unknown): CartItem[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 20)
    return null;
  const seen = new Set<number>();
  let quantity = 0;
  const items: CartItem[] = [];
  for (const item of value) {
    if (
      !item ||
      typeof item !== "object" ||
      !Number.isSafeInteger(item.id) ||
      item.id < 1 ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 20 ||
      seen.has(item.id)
    )
      return null;
    seen.add(item.id);
    quantity += item.quantity;
    items.push({ id: item.id, quantity: item.quantity });
  }
  return quantity <= 50 ? items : null;
}
