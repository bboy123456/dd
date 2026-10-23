import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
export const metadata: Metadata = {
  title: "Our story",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <main id="main" className="section-wrap editorial-page">
      <div className="page-heading">
        <p className="eyebrow">A LITTLE ABOUT US</p>
        <h1>
          Life is better <span>with paws.</span>
        </h1>
        <p>And we think the everyday things should be better, too.</p>
      </div>
      <div className="editorial-image">
        <Image
          src="/images/dog-friends.jpg"
          alt="Two dogs making the most of a walk together"
          fill
          sizes="(max-width: 760px) 100vw, 1000px"
          preload
        />
      </div>
      <div className="prose">
        <h2>For the little moments that mean everything.</h2>
        <p>
          There&apos;s a certain kind of joy that only a pet brings. The
          enthusiastic welcome when you walk through the door. The quiet company
          when you need it most. The very convincing argument for one more walk.
        </p>
        <p>
          Pawmade is a new store concept built around those moments. Our aim is
          simple: bring together useful, good-looking essentials for pets and
          the people who share their lives.
        </p>
        <h2>A home for the everyday essentials.</h2>
        <p>
          We&apos;re starting with the things that become part of your daily
          rhythm: mealtimes, walks, play, and rest. A considered collection that
          feels at home in your space, and in your pet&apos;s routine.
        </p>
        <h2>A little more thoughtful. A lot more love.</h2>
        <p>
          As our collection grows, we want to share clear product details,
          practical care information, and honest answers. Because choosing
          something for your best friend should feel good.
        </p>
        <Link href="/shop" className="button button-orange">
          Explore the collection <Icon name="arrow" size={18} />
        </Link>
      </div>
    </main>
  );
}
