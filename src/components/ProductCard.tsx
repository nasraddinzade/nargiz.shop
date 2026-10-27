"use client";

import Image from "next/image";
import Link from "next/link";
import { discountPct, formatPrice } from "@/lib/catalog";
import { t } from "@/lib/dict";
import { cart, useCart } from "@/lib/store";
import type { Product } from "@/lib/types";
import { CheckIcon } from "./icons";

export function TaksitBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border border-brass px-2 py-0.5 text-[11px] font-medium leading-tight text-plum ${className}`}>
      <span className="size-1.5 rounded-full bg-brass" aria-hidden />
      {t.taksit.badge}
    </span>
  );
}

export function OldPrice({ p, size = "sm" }: { p: Product; size?: "sm" | "lg" }) {
  if (!p.oldPrice) return null;
  return (
    <span className={`flex items-center gap-1.5 ${size === "lg" ? "text-base" : "text-[13px]"}`}>
      <s className="text-plum-soft decoration-plum-soft">{formatPrice(p.oldPrice)}</s>
      <span className="rounded bg-raspberry px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">−{discountPct(p)}%</span>
    </span>
  );
}

export function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const inCart = useCart().some((i) => i.id === p.id);
  return (
    <article className="tile group relative flex flex-col p-2.5 sm:p-3">
      <Link href={`/mehsul/${p.slug}`} className="flex flex-1 flex-col">
        <span className="price-tag self-start text-[19px] sm:text-[22px]">{formatPrice(p.price)}</span>
        <div className="relative mt-2 aspect-square w-full overflow-hidden rounded-[10px]">
          <Image
            src={p.image!}
            alt={p.name}
            fill
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 220px"
            className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            priority={priority}
          />
        </div>
        <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-plum-soft" lang="en">{p.brand}</div>
        <h3 className="line-clamp-2 mt-0.5 min-h-[2.6em] text-[13.5px] leading-[1.3] sm:text-[14px]">{p.name}</h3>
        <div className="mt-1.5 min-h-[20px]">
          <OldPrice p={p} />
        </div>
      </Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-1.5">
        <TaksitBadge />
        <button
          type="button"
          onClick={() => cart.add(p.id)}
          className={`ml-auto grid size-9 place-items-center rounded-full text-lg font-bold transition-colors ${inCart ? "bg-pink text-plum" : "bg-raspberry text-white hover:bg-raspberry-dark"}`}
          aria-label={`${t.product.addToCart}: ${p.name}`}
          title={inCart ? t.product.added : t.product.addToCart}
        >
          {inCart ? <CheckIcon className="size-4" /> : "+"}
        </button>
      </div>
    </article>
  );
}

const COLS = {
  four: "md:grid-cols-4",
  catalog: "md:grid-cols-4 xl:grid-cols-5",
  wide: "md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
};

export function ProductGrid({ products, cols = "four" }: { products: Product[]; cols?: keyof typeof COLS }) {
  return (
    <div className={`grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 ${COLS[cols]}`}>
      {products.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}
