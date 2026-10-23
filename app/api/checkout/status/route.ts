import { isCheckoutEnabled, isCommerceLive } from "@/lib/config";
import { connection } from "next/server";

export async function GET() {
  // Cache Components requires a request boundary, not force-dynamic.
  await connection();
  return Response.json(
    {
      version: "checkout-config-v1",
      commerceMode: isCommerceLive() ? "live" : "not-live",
      checkoutEnabled: isCheckoutEnabled(),
      commerceModePresent: process.env.COMMERCE_MODE !== undefined,
      checkoutFlagPresent: process.env.CHECKOUT_ENABLED !== undefined,
      bridgeSecretConfigured:
        (process.env.WOOCOMMERCE_BRIDGE_SECRET?.length || 0) >= 32,
      wordpressConfigured: Boolean(
        process.env.WORDPRESS_URL || process.env.NEXT_PUBLIC_WP_API_URL,
      ),
      vercelEnvironment: process.env.VERCEL_ENV || "local",
      deploymentUrl: process.env.VERCEL_URL || null,
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || null,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
