"use client";
import { Icon } from "@/components/icon";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="error-page">
      <Icon name="paw" size={52} />
      <h1>A little unexpected pause.</h1>
      <p>We couldn&apos;t load this page. Please give it another try.</p>
      <button className="button button-orange" onClick={reset}>
        Try again <Icon name="arrow" size={18} />
      </button>
    </main>
  );
}
