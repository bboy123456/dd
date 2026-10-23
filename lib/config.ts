export const brand = {
  name: "pawmade",
  tagline: "Good things for your best friend.",
};
export const siteUrl = process.env.SITE_URL || "http://localhost:3000";
export const isLive = process.env.COMMERCE_MODE === "live";
export const indexingEnabled = isLive && process.env.ALLOW_INDEXING === "true";
export const supportEmail = process.env.SUPPORT_EMAIL || "";
