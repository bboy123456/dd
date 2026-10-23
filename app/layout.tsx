import type { Metadata } from "next";
import { Suspense } from "react";
import { CartProvider } from "@/components/cart-provider";
import { CartDrawer, Footer, Header } from "@/components/store-shell";
import { getCatalog } from "@/lib/commerce";
import { indexingEnabled, isLive, siteUrl, supportEmail } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "pawmade — Good things for your best friend",
    template: "%s | pawmade",
  },
  description:
    "Thoughtful everyday essentials for dogs, cats, and the people who love them. Discover a little more joy in life with pets.",
  robots: { index: indexingEnabled, follow: indexingEnabled },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "pawmade",
    title: "pawmade — Good things for your best friend",
    description: "Everyday essentials. Extraordinary little companions.",
    images: [
      {
        url: "/images/dog-friends.jpg",
        width: 1200,
        height: 800,
        alt: "Two dogs enjoying a day outside",
      },
    ],
  },
};

async function Bag() {
  return <CartDrawer catalog={await getCatalog()} />;
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          {children}
          <Footer demo={!isLive} email={supportEmail} />
          <Suspense fallback={null}>
            <Bag />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
