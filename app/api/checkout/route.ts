import { createHmac } from "node:crypto";
import { isCheckoutEnabled, isCommerceLive } from "@/lib/config";
import { wordpressUrl } from "@/lib/commerce";
import { validateCart } from "@/lib/cart-validation";

const noStore = { "Cache-Control": "no-store" };
function failure(error: string, status: number, code?: string) {
  return Response.json(
    { error, ...(code ? { code } : {}) },
    { status, headers: noStore },
  );
}

export async function POST(request: Request) {
  if (!isCommerceLive())
    return failure(
      "Orders aren't open yet. Please enjoy exploring our collection.",
      503,
      "COMMERCE_NOT_LIVE",
    );
  if (!isCheckoutEnabled())
    return failure(
      "Orders aren't open yet. Please enjoy exploring our collection.",
      503,
      "CHECKOUT_DISABLED",
    );
  // Next.js may expose an internal hostname in request.url behind a proxy.
  // The browser's Origin must match the incoming Host, not that internal URL.
  let origin: URL;
  try {
    origin = new URL(request.headers.get("origin") || "");
  } catch {
    return failure("Please start checkout from the store.", 403);
  }
  if (
    origin.host !== request.headers.get("host") ||
    !["https:", "http:"].includes(origin.protocol)
  )
    return failure("Please start checkout from the store.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return failure("Invalid checkout request.", 415);
  const secret = process.env.WOOCOMMERCE_BRIDGE_SECRET;
  if (!secret || secret.length < 32)
    return failure(
      "Checkout is being prepared. Please try again later.",
      503,
      "BRIDGE_NOT_CONFIGURED",
    );
  try {
    const reader = request.body?.getReader();
    if (!reader) return failure("Your bag is empty.", 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 4096) {
        await reader.cancel();
        return failure("This bag is too large.", 413);
      }
      chunks.push(value);
    }
    let body: { items?: unknown };
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return failure("Invalid checkout request.", 400);
    }
    const items = validateCart(body?.items);
    if (!items)
      return failure("Please check your bag quantities and try again.", 400);
    const payload = Buffer.from(
      JSON.stringify({ v: 1, exp: Math.floor(Date.now() / 1000) + 300, items }),
    ).toString("base64url");
    const signature = createHmac("sha256", secret)
      .update(payload)
      .digest("hex");
    const url = new URL(wordpressUrl());
    url.searchParams.set("pawmade_checkout", `${payload}.${signature}`);
    return Response.json({ url: url.toString() }, { headers: noStore });
  } catch {
    return failure("We couldn't prepare checkout. Please try again.", 503);
  }
}
