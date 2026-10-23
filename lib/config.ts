export const brand = {
  name: "pawmade",
  tagline: "Good things for your best friend.",
};
export const siteUrl = process.env.SITE_URL || "http://localhost:3000";
function envFlag(name: string) {
  return process.env[name]?.trim().toLowerCase() === "true";
}

export function isCommerceLive() {
  return process.env.COMMERCE_MODE?.trim().toLowerCase() === "live";
}

export function isCheckoutEnabled() {
  return envFlag("CHECKOUT_ENABLED");
}

export const isLive = isCommerceLive();
export const indexingEnabled = isCommerceLive() && envFlag("ALLOW_INDEXING");
export const supportEmail = process.env.SUPPORT_EMAIL || "";
