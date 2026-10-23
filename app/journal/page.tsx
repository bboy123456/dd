import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "The good life journal",
  alternates: { canonical: "/journal" },
};
export default function Journal() {
  return (
    <main id="main" className="section-wrap editorial-page">
      <div className="page-heading">
        <p className="eyebrow">THE GOOD LIFE JOURNAL</p>
        <h1>
          Notes on life <span>with paws.</span>
        </h1>
        <p>A few little ideas for a happier everyday.</p>
      </div>
      <div className="prose">
        <article className="journal-article" id="happy-walks">
          <p className="eyebrow">01 / EVERYDAY RITUALS</p>
          <h2>A happier walk starts before the door.</h2>
          <p>
            A walk is more than getting from one place to another. It&apos;s
            time to sniff, explore, and enjoy being together. A few small habits
            can help it go smoothly.
          </p>
          <h3>Find the right fit.</h3>
          <p>
            Check your dog&apos;s harness or collar before heading out. Follow
            the manufacturer&apos;s fitting instructions, inspect clips and
            stitching, and make sure your dog can move comfortably. Recheck the
            fit as your dog grows or their weight changes.
          </p>
          <h3>Pack for the day you&apos;re having.</h3>
          <p>
            Bring waste bags and water, choose a route suited to your dog, and
            consider the weather and pavement temperature. A shorter, slower
            outing can be the right choice on a warm day.
          </p>
          <h3>Make room for the sniff stops.</h3>
          <p>
            Where it&apos;s safe, let your dog explore at their own pace. Keep
            them on a suitable leash and respect local rules. If you&apos;re
            unsure about exercise needs, ask your veterinarian for advice
            tailored to your dog.
          </p>
        </article>
        <article className="journal-article" id="cat-space">
          <p className="eyebrow">02 / HAPPY AT HOME</p>
          <h2>A little space, just for your cat.</h2>
          <p>
            Even in a busy home, small changes can give a cat more choice about
            where to rest, watch, and play.
          </p>
          <h3>A quiet corner.</h3>
          <p>
            Offer a resting spot away from heavy foot traffic. Let your cat
            decide whether it&apos;s their kind of place; a familiar blanket may
            help make a new spot feel inviting.
          </p>
          <h3>Something to climb. Something to scratch.</h3>
          <p>
            Stable perches and suitable scratching surfaces give your cat places
            to stretch and observe. Secure furniture carefully and check that
            any elevated space is safe to reach.
          </p>
          <h3>A little play, every day.</h3>
          <p>
            Short, supervised play sessions can add interest to the day. Put
            away string toys after play, replace damaged toys, and choose items
            suitable for your cat&apos;s size and habits.
          </p>
        </article>
      </div>
    </main>
  );
}
