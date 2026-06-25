import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPolicies, getPolicy, POLICY_SLUGS } from "@/lib/shopify";

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(POLICY_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = await getPolicy(slug).catch(() => null);
  if (!policy) return { title: "Policy" };
  return {
    title: policy.title,
    description: `${policy.title} for Western Ave Pharmacy.`,
    alternates: { canonical: `/policies/${slug}` },
  };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in POLICY_SLUGS)) notFound();
  const policy = await getPolicy(slug).catch(() => null);
  if (!policy) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{policy.title}</h1>
      <div
        className="policy-body mt-8 space-y-4 leading-relaxed text-slate [&_a]:text-cyan [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-navy [&_ul]:list-disc [&_ul]:pl-6 [&_strong]:text-navy"
        dangerouslySetInnerHTML={{ __html: policy.body }}
      />
      <p className="mt-12 text-sm text-slate/70">
        Questions? Call us at{" "}
        <a href="tel:+18182425887" className="text-cyan underline">
          (818) 242-5887
        </a>{" "}
        or visit 501 Western Ave, Glendale, CA 91201.
      </p>
    </article>
  );
}
