"use client";

import Image from "next/image";
import Link from "next/link";
import { TaksitBadge } from "@/components/ProductCard";
import { CloseIcon, WhatsAppIcon } from "@/components/icons";
import { byId, formatPrice } from "@/lib/catalog";
import { t } from "@/lib/dict";
import { cart, useCart, useHydrated } from "@/lib/store";
import { cartLines, cartMessage, waLink } from "@/lib/whatsapp";

export default function CartPage() {
  const items = useCart();
  const { total } = cartLines(items);

  if (!useHydrated()) return <div className="min-h-[60vh]" />;
  if (!items.length) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-5xl font-semibold">{t.cart.title}</h1>
        <p className="mt-4 text-lg">{t.cart.empty}</p>
        <Link href="/axtar" className="btn btn-primary mt-6">{t.cart.emptyCta}</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8">
      <h1 className="font-display text-4xl font-semibold md:text-6xl">{t.cart.title}</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <ul className="space-y-2">
          {items.map((it) => {
            const p = byId(it.id);
            if (!p) return null;
            return (
              <li key={it.id} className="tile flex gap-3 p-3">
                <Link href={`/mehsul/${p.slug}`} className="relative size-20 shrink-0 overflow-hidden rounded-[10px] sm:size-24">
                  {p.image && <Image src={p.image} alt={p.name} fill sizes="96px" className="object-contain" />}
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-plum-soft" lang="en">{p.brand}</div>
                      <Link href={`/mehsul/${p.slug}`} className="line-clamp-2 text-[14px] leading-snug hover:text-raspberry">{p.name}</Link>
                    </div>
                    <button type="button" onClick={() => cart.remove(p.id)} aria-label={`${t.cart.remove}: ${p.name}`} className="grid size-8 shrink-0 place-items-center rounded-full text-plum-soft hover:bg-blush">
                      <CloseIcon className="size-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                    <div className="flex items-center rounded-full border border-plum/20">
                      <button type="button" onClick={() => cart.setQty(p.id, it.qty - 1)} className="grid size-9 place-items-center text-lg font-bold" aria-label="−1">−</button>
                      <span className="w-7 text-center font-bold tabular-nums" aria-live="polite">{it.qty}</span>
                      <button type="button" onClick={() => cart.setQty(p.id, it.qty + 1)} className="grid size-9 place-items-center text-lg font-bold" aria-label="+1">+</button>
                    </div>
                    <span className="text-[18px] font-bold tabular-nums text-raspberry">{formatPrice(p.price * it.qty)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="space-y-3 lg:sticky lg:top-36 lg:self-start">
          <div className="tile p-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[16px] font-medium">{t.cart.total}</span>
              <span className="price-tag text-[26px]">{formatPrice(total)}</span>
            </div>
            <Link href="/sifaris" className="btn btn-primary mt-5 w-full !py-4 text-[16px]">{t.cart.checkout}</Link>
            <a href={waLink(cartMessage(items))} target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-2 w-full !py-3.5 text-[15px]">
              <WhatsAppIcon />
              {t.cart.whatsapp}
            </a>
          </div>
          <div className="rounded-[var(--radius-tile)] border border-brass bg-white p-5">
            <TaksitBadge />
            <h2 className="mt-2 font-display text-xl font-semibold">{t.taksit.cartTitle}</h2>
            <p className="mt-1 text-[14px] text-plum-soft">{t.taksit.cartText}</p>
            <a
              href={waLink(cartMessage(items, t.taksit.cartMsg))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa mt-3 w-full !py-3 text-[14px]"
            >
              <WhatsAppIcon />
              {t.taksit.cartCta}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
