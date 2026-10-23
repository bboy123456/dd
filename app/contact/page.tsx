import type { Metadata } from "next";
import Link from "next/link";
import { supportEmail } from "@/lib/config";
import { Icon } from "@/components/icon";
export const metadata: Metadata = {
  title: "Say hello",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <main id="main" className="section-wrap editorial-page">
      <div className="page-heading">
        <p className="eyebrow">GOOD CONVERSATIONS START HERE</p>
        <h1>
          A little question? <span>Say hello.</span>
        </h1>
        <p>We&apos;re here for you and your favorite four-legged person.</p>
      </div>
      <div className="prose">
        <div className="contact-card">
          <h2>Let&apos;s talk.</h2>
          {supportEmail ? (
            <>
              <p>
                For product questions or help with an order, email us. If
                you&apos;ve already placed an order, include your order number.
                Please don&apos;t include payment card details.
              </p>
              <a className="button button-dark" href={`mailto:${supportEmail}`}>
                {supportEmail}
                <Icon name="arrow" size={18} />
              </a>
            </>
          ) : (
            <>
              <p>
                We&apos;re getting the shop ready. Our customer support details
                will be available here before orders open.
              </p>
              <Link href="/shop" className="button button-dark">
                Explore the collection <Icon name="arrow" size={18} />
              </Link>
            </>
          )}
        </div>
        <h2>Looking for a quick answer?</h2>
        <p>
          Find details about{" "}
          <Link href="/policies/shipping">shipping and returns</Link>, or take a
          look at our <Link href="/policies/faq">common questions</Link>.
        </p>
      </div>
    </main>
  );
}
