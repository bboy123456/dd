import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "@/components/icon";
import { ProductCatalog } from "@/components/catalog";
import { getCatalog } from "@/lib/commerce";

async function Favorites() {
  return <ProductCatalog catalog={await getCatalog()} featured />;
}
export default function Home() {
  return (
    <main id="main">
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-line" /> FOR THE LOVE OF PAWS
          </div>
          <h1>
            Good things.
            <br />
            For your
            <br />
            <span>best friend.</span>
            <svg
              className="hero-scribble"
              viewBox="0 0 350 18"
              aria-hidden="true"
            >
              <path
                d="M3 12Q170-3 344 9M30 17Q180 7 320 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </h1>
          <p>
            For muddy walks, cozy naps, and everything
            <br className="desktop-break" /> in between. Little essentials. Lots
            of love.
          </p>
          <div className="hero-buttons">
            <Link href="/shop" className="button button-orange">
              Find their next favorite <Icon name="arrow" size={19} />
            </Link>
            <Link href="/about" className="hero-story">
              Get to know us <span>↗</span>
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="mini-paw">
              <Icon name="paw" size={18} />
            </span>
            <span>
              For pets. For their people.
              <br />
              <strong>For all the everyday moments.</strong>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo">
            <Image
              src="/images/hero-dog.jpg"
              alt="A golden retriever with a happy smile enjoying the sunshine"
              fill
              sizes="(max-width: 760px) 100vw, 52vw"
              preload
            />
          </div>
          <div className="hero-sticker">
            <Icon name="heart" size={23} />
            <span>
              GOOD DAYS
              <br />
              START WITH
              <br />
              <em>four paws.</em>
            </span>
          </div>
          <span className="hero-doodle" aria-hidden="true">
            ✳
          </span>
          <div className="hero-photo-caption">
            <span>A life with pets is a good life.</span>
            <Icon name="paw" size={20} />
          </div>
          <span className="hero-side-note">MORE LOVE. MORE WAGS.</span>
        </div>
      </section>
      <div className="brand-ribbon" aria-label="Our philosophy">
        <span>EVERYDAY ESSENTIALS</span>
        <Icon name="paw" />
        <span>EXTRAORDINARY LITTLE COMPANIONS</span>
        <Icon name="sun" />
        <span>A LITTLE MORE JOY</span>
        <Icon name="paw" />
        <span>MADE FOR LIFE TOGETHER</span>
        <Icon name="sun" />
      </div>
      <section className="section-wrap favorites-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE EVERYDAY COLLECTION</p>
            <h2>
              Small things. <span>Happy tails.</span>
            </h2>
          </div>
          <p>
            Good-looking essentials for their favorite
            <br className="desktop-break" /> parts of the day. And yours.
          </p>
        </div>
        <Suspense
          fallback={
            <div className="catalog-loading">Gathering the good things…</div>
          }
        >
          <Favorites />
        </Suspense>
      </section>
      <section className="section-wrap pet-section">
        <div className="pet-category dog-category">
          <Image
            src="/images/dog-friends.jpg"
            alt="Two playful dogs running together outside"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className="pet-category-overlay" />
          <div className="pet-category-copy">
            <p className="eyebrow">FOR YOUR ADVENTURE BUDDY</p>
            <h2>
              Big love.
              <br />
              Bigger tail wags.
            </h2>
            <Link href="/shop?pet=dogs" className="button button-cream">
              Shop for dogs <Icon name="arrow" size={18} />
            </Link>
          </div>
          <span className="category-number">01 / THE DOG EDIT</span>
        </div>
        <div className="pet-category cat-category">
          <Image
            src="/images/cat.jpg"
            alt="A curious cat looking up, ready for the next little adventure"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className="pet-category-overlay" />
          <div className="pet-category-copy">
            <p className="eyebrow">FOR YOUR LITTLE HOUSE ROYALTY</p>
            <h2>
              Made for
              <br />
              their meow-ment.
            </h2>
            <Link href="/shop?pet=cats" className="button button-cream">
              Shop for cats <Icon name="arrow" size={18} />
            </Link>
          </div>
          <span className="category-number">02 / THE CAT EDIT</span>
        </div>
      </section>
      <section className="story-section section-wrap">
        <div className="story-intro">
          <p className="eyebrow">A LITTLE ABOUT PAWMADE</p>
          <h2>
            They make life better.
            <br />
            Let&apos;s return <span>the favor.</span>
          </h2>
          <p>
            The welcome-home wiggles. The accidental naps together. The small
            moments that turn into the best parts of your day.
          </p>
          <p>
            We&apos;re building pawmade around a simple idea: everyday things
            for pets should feel every bit as special as the life you share.
          </p>
          <Link href="/about" className="text-link">
            A peek at our story <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="values-grid">
          <div>
            <div className="value-icon sage">
              <Icon name="heart" size={29} />
            </div>
            <h3>Pets come first</h3>
            <p>Their comfort and happiness are where every good idea begins.</p>
          </div>
          <div>
            <div className="value-icon peach">
              <Icon name="sun" size={29} />
            </div>
            <h3>Everyday, made better</h3>
            <p>
              Less fuss. More play. Little things that fit right into your life.
            </p>
          </div>
          <div>
            <div className="value-icon butter">
              <Icon name="paw" size={29} />
            </div>
            <h3>For life together</h3>
            <p>From your first hello to your favorite daily rituals.</p>
          </div>
          <div>
            <div className="value-icon lavender">
              <Icon name="bag" size={29} />
            </div>
            <h3>Thoughtfully chosen</h3>
            <p>A focused collection, with a place for every essential.</p>
          </div>
        </div>
      </section>
      <section className="good-life-banner">
        <span className="banner-doodle" aria-hidden="true">
          ✳
        </span>
        <p className="eyebrow">THE BEST THINGS IN LIFE HAVE PAWS</p>
        <h2>
          A little more wag.
          <br />A little less ordinary.
        </h2>
        <Link href="/shop" className="button button-dark">
          Make their day <Icon name="arrow" size={19} />
        </Link>
        <Icon name="paw" className="banner-paw" size={100} />
      </section>
      <section className="journal-teaser section-wrap">
        <div>
          <p className="eyebrow">THE GOOD LIFE JOURNAL</p>
          <h2>
            A few notes on{" "}
            <br />
            <span>life with paws.</span>
          </h2>
        </div>
        <Link href="/journal" className="journal-link">
          <span>01</span>
          <div>
            <p>EVERYDAY RITUALS</p>
            <h3>A happier walk starts before the door.</h3>
          </div>
          <Icon name="arrow" />
        </Link>
        <Link href="/journal#cat-space" className="journal-link">
          <span>02</span>
          <div>
            <p>HAPPY AT HOME</p>
            <h3>A little space, just for your cat.</h3>
          </div>
          <Icon name="arrow" />
        </Link>
      </section>
    </main>
  );
}
