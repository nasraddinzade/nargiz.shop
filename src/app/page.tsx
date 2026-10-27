import Image from "next/image";
import Link from "next/link";
import { BranchListCompact } from "@/components/Branches";
import { SearchBox } from "@/components/Header";
import { ProductCard, ProductGrid } from "@/components/ProductCard";
import { CounterEdge, SectionHead, TaksitStrip } from "@/components/Sections";
import { CATEGORIES, VISIBLE } from "@/lib/catalog";
import { BUDGETS } from "@/lib/constants";
import { t } from "@/lib/dict";
import type { Product } from "@/lib/types";

const HERO_IDS = ["1658103", "162919", "2846273", "651916"];

function inBudget(p: Product, b: (typeof BUDGETS)[number]) {
  return (b.min === null || p.price >= b.min) && (b.max === null || p.price <= b.max);
}

function budgetHref(b: (typeof BUDGETS)[number]) {
  const qs = new URLSearchParams();
  if (b.min !== null) qs.set("min", String(b.min));
  if (b.max !== null) qs.set("max", String(b.max));
  return `/axtar?${qs}`;
}

/** Hər büdcə sırası üçün 4 məhsul: kateqoriyaları qarışdıraraq, təkrarsız. */
function pickRows(): Product[][] {
  const used = new Set<string>();
  return BUDGETS.map((b) => {
    const pool = VISIBLE.filter((p) => inBudget(p, b) && !used.has(p.id));
    const out: Product[] = [];
    const cats = new Set<string>();
    for (const p of pool) if (out.length < 4 && !cats.has(p.category)) (out.push(p), cats.add(p.category));
    for (const p of pool) if (out.length < 4 && !out.includes(p)) out.push(p);
    out.forEach((p) => used.add(p.id));
    return out;
  });
}

export default function Home() {
  const hero = HERO_IDS.map((id) => VISIBLE.find((p) => p.id === id)).filter(Boolean) as Product[];
  const rows = pickRows();
  const sale = VISIBLE.filter((p) => p.oldPrice).slice(0, 8);

  return (
    <>
      {/* 1. İlk ekran */}
      <section className="lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="bg-pink px-4 pb-10 pt-10 md:px-10 md:pb-14 md:pt-14 lg:pl-[max(2.5rem,calc((100vw-1400px)/2+1rem))]">
          <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.02em] text-plum">
            <span className="block text-[clamp(52px,16vw,128px)] lg:text-[clamp(64px,7.3vw,128px)]">{t.hero.title1}</span>
            <span className="block text-[clamp(38px,11vw,88px)] lg:text-[clamp(44px,5.6vw,88px)]">{t.hero.title2}</span>
          </h1>
          <p className="mt-5 max-w-md text-[16px] leading-snug md:text-[17px]">{t.hero.sub}</p>
          <div className="mt-6 max-w-xl">
            <SearchBox big />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {BUDGETS.map((b) => (
              <Link key={b.key} href={budgetHref(b)} className="rounded-full border-[1.5px] border-plum bg-blush px-4 py-2 text-[15px] font-bold hover:bg-white">
                {t.budget[b.key]}
              </Link>
            ))}
            <Link href="/axtar?endirim=1" className="rounded-full bg-raspberry px-4 py-2 text-[15px] font-bold text-white hover:bg-raspberry-dark">
              {t.budget.sale}
            </Link>
          </div>
        </div>
        <div className="hidden content-center gap-3 p-8 lg:grid lg:grid-cols-2 xl:pr-[max(2rem,calc((100vw-1400px)/2+1rem))]">
          {hero.map((p, i) => (
            <ProductCard key={p.id} p={p} priority={i < 2} />
          ))}
        </div>
      </section>

      {/* Mobildə mozaika yoxdur, dərhal taksit zolağı */}
      <TaksitStrip className="lg:hidden" />

      {/* 2. Büdcənə görə */}
      <CounterEdge />
      <section className="mx-auto max-w-[1400px] px-4 py-10">
        <SectionHead title={t.budget.title} lead={t.budget.lead} />
        <div className="space-y-8">
          {BUDGETS.map((b, i) => (
            <div key={b.key}>
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="price-tag text-[18px]">{t.budget[b.key]}</h3>
                <Link href={budgetHref(b)} className="text-[14px] font-bold text-raspberry underline-offset-4 hover:underline">
                  {t.budget.all} →
                </Link>
              </div>
              <ProductGrid products={rows[i]} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Taksit zolağı */}
      <TaksitStrip className="hidden lg:block" />

      {/* 4. Kateqoriyalar */}
      <CounterEdge />
      <section className="mx-auto max-w-[1400px] px-4 py-10">
        <SectionHead title={t.categories.title} />
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/kateqoriya/${c.slug}`}
              className="group relative flex min-h-[140px] items-end overflow-hidden rounded-[var(--radius-tile)] bg-pink p-4 md:min-h-[200px] md:p-6"
            >
              {c.cover && (
                <div className="absolute right-2 top-2 size-[68px] overflow-hidden rounded-[10px] bg-white md:right-4 md:top-4 md:size-28">
                  <Image src={c.cover} alt="" fill sizes="112px" className="object-contain transition-transform group-hover:scale-105" />
                </div>
              )}
              <span className="relative font-display text-[26px] font-semibold leading-none md:text-[40px]">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Endirimlər */}
      <CounterEdge />
      <section className="mx-auto max-w-[1400px] px-4 py-10">
        <SectionHead title={t.sale.title} href="/axtar?endirim=1&sort=discount" linkText={t.sale.all} />
        <ProductGrid products={sale} />
      </section>

      {/* 6. 7 filial */}
      <CounterEdge />
      <section className="mx-auto max-w-[1400px] px-4 py-10">
        <SectionHead title={t.branches.title} lead={t.branches.lead} href="/filiallar" linkText={t.branches.pageTitle} />
        <BranchListCompact />
      </section>

      {/* 7. Necə sifariş verilir */}
      <CounterEdge />
      <section className="mx-auto max-w-[1400px] px-4 py-10">
        <SectionHead title={t.how.title} />
        <ol className="grid gap-3 md:grid-cols-3">
          {t.how.steps.map((s, i) => (
            <li key={s.t} className="tile p-5">
              <span className="font-display text-5xl font-semibold text-raspberry">{i + 1}</span>
              <h3 className="mt-2 text-lg font-bold">{s.t}</h3>
              <p className="mt-1 text-[15px] leading-snug text-plum-soft">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
