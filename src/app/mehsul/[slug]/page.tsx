import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/ProductActions";
import { OldPrice, ProductGrid, TaksitBadge } from "@/components/ProductCard";
import { CounterEdge, SectionHead } from "@/components/Sections";
import { bySlug, formatPrice, VISIBLE } from "@/lib/catalog";
import { CATEGORY_NAMES, SUB_NAMES, t } from "@/lib/dict";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return VISIBLE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = bySlug((await params).slug);
  return p ? { title: p.name, description: `${p.name} — ${formatPrice(p.price)}` } : {};
}

export default async function ProductPage({ params }: Props) {
  const p = bySlug((await params).slug);
  if (!p) notFound();
  const similar = VISIBLE.filter((x) => x.category === p.category && x.id !== p.id && (!p.sub || x.sub === p.sub)).slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-4 py-6 md:py-10">
        <nav className="mb-4 flex flex-wrap gap-1.5 text-[14px] text-plum-soft">
          <Link href="/" className="hover:text-raspberry">{t.brand}</Link>
          <span aria-hidden>/</span>
          <Link href={`/kateqoriya/${p.category}`} className="hover:text-raspberry">{CATEGORY_NAMES[p.category]}</Link>
          {p.sub && (
            <>
              <span aria-hidden>/</span>
              <Link href={`/kateqoriya/${p.category}?alt=${p.sub}`} className="hover:text-raspberry">{SUB_NAMES[p.sub]}</Link>
            </>
          )}
        </nav>

        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <div className="tile relative aspect-square overflow-hidden">
            <Image src={p.image!} alt={p.name} fill priority sizes="(max-width: 768px) 100vw, 560px" className="object-contain" />
          </div>

          <div className="flex flex-col">
            <div className="text-[13px] font-medium uppercase tracking-[0.1em] text-plum-soft" lang="en">{p.brand}</div>
            <h1 className="mt-1.5 font-display text-[26px] font-semibold leading-[1.15] md:text-[34px]">{p.name}</h1>
            {p.volume && (
              <p className="mt-2 text-[15px]">
                <span className="text-plum-soft">{t.product.volume}:</span> <span className="font-medium">{p.volume}</span>
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="price-tag text-[34px] md:text-[42px]">{formatPrice(p.price)}</span>
              <OldPrice p={p} size="lg" />
            </div>
            {p.oldPrice && (
              <p className="mt-2 text-[15px] font-bold text-raspberry">
                {t.product.save}: {formatPrice(p.oldPrice - p.price)}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-2 text-[14px]">
              <TaksitBadge className="!text-[13px]" />
              <span>
                {t.taksit.productLine}.{" "}
                <Link href="/taksit" className="font-bold text-raspberry underline underline-offset-2">{t.taksit.more}</Link>
              </span>
            </div>

            <div className="mt-6">
              <ProductActions p={p} />
            </div>

            <div className="mt-6 rounded-[var(--radius-tile)] border border-brass bg-white p-5">
              <h2 className="font-display text-xl font-semibold">{t.product.pickupTitle}</h2>
              <p className="mt-1 text-[15px] leading-snug text-plum-soft">{t.product.pickupText}</p>
              <Link href="/filiallar" className="mt-2 inline-block text-[15px] font-bold text-raspberry underline-offset-4 hover:underline">
                {t.product.pickupLink} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <>
          <CounterEdge />
          <section className="mx-auto max-w-[1200px] px-4 py-10">
            <SectionHead title={t.product.similar} href={`/kateqoriya/${p.category}`} linkText={CATEGORY_NAMES[p.category]} />
            <ProductGrid products={similar} />
          </section>
        </>
      )}
    </>
  );
}
