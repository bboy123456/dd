export type Product = {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  pets: string[];
  image?: string;
  art?: "bowl" | "harness" | "bed" | "rope" | "toy" | "carrier";
  color: string;
  badge?: string;
  inStock: boolean;
  maxQuantity: number;
};

export type CartItem = { id: number; quantity: number };
export type Catalog = {
  products: Product[];
  mode: "demo" | "live";
  error?: string;
};

export function money(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount,
  );
}
