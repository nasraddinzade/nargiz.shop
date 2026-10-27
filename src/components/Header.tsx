"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "@/lib/catalog";
import { t } from "@/lib/dict";
import { useCartCount } from "@/lib/store";
import { waLink } from "@/lib/whatsapp";
import { CartIcon, SearchIcon, WhatsAppIcon } from "./icons";

export function DemoBanner() {
  return (
    <div className="bg-plum px-4 py-2 text-center text-[13px] font-medium leading-snug text-blush">{t.demo}</div>
  );
}

export function SearchBox({ big = false, initial = "" }: { big?: boolean; initial?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/axtar${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
      }}
      className={`flex w-full items-center bg-white ${big ? "price-search h-14 pl-5 pr-2 text-lg" : "h-10 rounded-full border border-plum/15 pl-4 pr-1 text-[15px]"}`}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.nav.search}
        aria-label={t.nav.search}
        className="min-w-0 flex-1 bg-transparent text-plum placeholder:text-plum-soft focus:outline-none"
        style={{ fontSize: big ? undefined : 16 }}
      />
      <button
        type="submit"
        aria-label={t.nav.search}
        className={`grid shrink-0 place-items-center rounded-full bg-raspberry text-white ${big ? "size-11" : "size-8"}`}
      >
        <SearchIcon className={big ? "size-5" : "size-4"} />
      </button>
    </form>
  );
}

export function Header() {
  const count = useCartCount();
  return (
    <header className="z-30 border-b border-brass bg-blush/95 backdrop-blur md:sticky md:top-0">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 md:gap-6">
        <Link href="/" className="shrink-0 font-display text-xl font-semibold tracking-[0.06em] md:text-2xl">
          {t.brand}
        </Link>
        <div className="hidden flex-1 md:block md:max-w-md">
          <SearchBox />
        </div>
        <nav className="hidden items-center gap-5 text-[15px] font-medium lg:flex">
          <Link href="/filiallar" className="hover:text-raspberry">{t.nav.branches}</Link>
          <Link href="/taksit" className="hover:text-raspberry">{t.nav.taksit}</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa !px-3 !py-2 text-sm"
            aria-label={t.nav.whatsapp}
          >
            <WhatsAppIcon className="size-5" />
            <span className="hidden sm:inline">{t.nav.whatsapp}</span>
          </a>
          <Link href="/sebet" className="relative grid size-10 place-items-center rounded-full hover:bg-pink/30" aria-label={`${t.nav.cart}: ${count}`}>
            <CartIcon />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-raspberry px-1 text-[11px] font-bold leading-5 text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-4 pb-3 md:hidden">
        <SearchBox />
      </div>
      <nav className="mx-auto flex max-w-[1400px] gap-5 overflow-x-auto px-4 pb-2.5 text-[14px] font-medium [scrollbar-width:none]">
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/kateqoriya/${c.slug}`} className="shrink-0 hover:text-raspberry">
            {c.name}
          </Link>
        ))}
        <span className="shrink-0 text-brass" aria-hidden>|</span>
        <Link href="/filiallar" className="shrink-0 hover:text-raspberry lg:hidden">{t.nav.branches}</Link>
        <Link href="/taksit" className="shrink-0 hover:text-raspberry lg:hidden">{t.nav.taksit}</Link>
        <Link href="/axtar?endirim=1" className="shrink-0 text-raspberry">{t.budget.sale}</Link>
      </nav>
    </header>
  );
}
