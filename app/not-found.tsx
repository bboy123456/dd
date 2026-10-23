import Link from "next/link";
import { Icon } from "@/components/icon";
export default function NotFound() {
  return (
    <main id="main" className="error-page">
      <Icon name="paw" size={52} />
      <p className="eyebrow">A LITTLE OFF THE TRAIL · 404</p>
      <h1>Let&apos;s find our way back.</h1>
      <p>This page seems to have wandered off.</p>
      <Link href="/shop" className="button button-orange">
        Back to the good things <Icon name="arrow" size={18} />
      </Link>
    </main>
  );
}
