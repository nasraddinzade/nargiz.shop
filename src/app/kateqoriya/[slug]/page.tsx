import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Catalog } from "@/components/Catalog";
import { CATEGORIES } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = CATEGORIES.find((x) => x.slug === slug);
  return { title: c?.name };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const c = CATEGORIES.find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <Suspense>
      <Catalog category={c.slug} title={c.name} />
    </Suspense>
  );
}
