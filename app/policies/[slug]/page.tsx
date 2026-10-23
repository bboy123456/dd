import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { policies } from "@/lib/policies";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: policies[slug]?.title || "Information" };
}
export default async function Policy({ params }: Props) {
  const policy = policies[(await params).slug];
  if (!policy) notFound();
  return (
    <main id="main" className="section-wrap editorial-page">
      <div className="page-heading">
        <p className="eyebrow">THE LITTLE DETAILS</p>
        <h1>{policy.title}</h1>
      </div>
      <div className="prose">
        <div className="demo-notice">{policy.intro}</div>
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
