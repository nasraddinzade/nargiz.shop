"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { discountPct, fold, matches, VISIBLE } from "@/lib/catalog";
import { BUDGETS } from "@/lib/constants";
import { SUB_NAMES, t } from "@/lib/dict";
import type { CategorySlug, MakeupSub, Product } from "@/lib/types";
import { CloseIcon, FilterIcon } from "./icons";
import { ProductGrid } from "./ProductCard";

type Sort = "" | "asc" | "desc" | "discount";

type State = {
  q: string;
  brands: string[];
  min: number | null;
  max: number | null;
  sale: boolean;
  sort: Sort;
  sub: MakeupSub | null;
};

function num(v: string | null): number | null {
  if (v === null || v.trim() === "") return null;
  const n = Number(v.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function readState(sp: URLSearchParams): State {
  const sub = sp.get("alt");
  return {
    q: sp.get("q") ?? "",
    brands: (sp.get("brend") ?? "").split("|").filter(Boolean),
    min: num(sp.get("min")),
    max: num(sp.get("max")),
    sale: sp.get("endirim") === "1",
    sort: (["asc", "desc", "discount"].includes(sp.get("sort") ?? "") ? sp.get("sort") : "") as Sort,
    sub: sub === "uz" || sub === "goz" || sub === "dodaq" ? sub : null,
  };
}

function toQuery(s: State): string {
  const qs = new URLSearchParams();
  if (s.q) qs.set("q", s.q);
  if (s.sub) qs.set("alt", s.sub);
  if (s.brands.length) qs.set("brend", s.brands.join("|"));
  if (s.min !== null) qs.set("min", String(s.min));
  if (s.max !== null) qs.set("max", String(s.max));
  if (s.sale) qs.set("endirim", "1");
  if (s.sort) qs.set("sort", s.sort);
  const str = qs.toString();
  return str ? `?${str}` : "";
}

function apply(list: Product[], s: State): Product[] {
  const out = list.filter(
    (p) =>
      matches(p, s.q) &&
      (!s.sub || p.sub === s.sub) &&
      (!s.brands.length || s.brands.includes(p.brand)) &&
      (s.min === null || p.price >= s.min) &&
      (s.max === null || p.price <= s.max) &&
      (!s.sale || !!p.oldPrice),
  );
  if (s.sort === "asc") out.sort((a, b) => a.price - b.price);
  if (s.sort === "desc") out.sort((a, b) => b.price - a.price);
  if (s.sort === "discount") out.sort((a, b) => discountPct(b) - discountPct(a));
  return out;
}

export function Catalog({ category, title: fixedTitle }: { category?: CategorySlug; title?: string }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const state = useMemo(() => readState(new URLSearchParams(sp.toString())), [sp]);
  const [sheet, setSheet] = useState(false);

  const base = useMemo(() => (category ? VISIBLE.filter((p) => p.category === category) : VISIBLE), [category]);
  const results = useMemo(() => apply(base, state), [base, state]);
  const subs = useMemo(
    () => (category === "makiyaj" ? (["uz", "goz", "dodaq"] as MakeupSub[]).filter((s) => base.some((p) => p.sub === s)) : []),
    [category, base],
  );

  const set = (patch: Partial<State>) => router.replace(`${pathname}${toQuery({ ...state, ...patch })}`, { scroll: false });

  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheet]);

  const chips: { label: string; clear: Partial<State> }[] = [];
  if (state.q) chips.push({ label: `“${state.q}”`, clear: { q: "" } });
  state.brands.forEach((b) => chips.push({ label: b, clear: { brands: state.brands.filter((x) => x !== b) } }));
  if (state.min !== null || state.max !== null)
    chips.push({
      label: state.min !== null && state.max !== null ? `${state.min} ₼ - ${state.max} ₼` : state.min !== null ? `${state.min} ₼-dən` : `${state.max} ₼-dək`,
      clear: { min: null, max: null },
    });
  if (state.sale) chips.push({ label: t.catalog.onlySale, clear: { sale: false } });

  const filters = <Filters base={base} state={state} set={set} />;
  const title = fixedTitle ?? (state.q ? `${t.catalog.searchFor} ${state.q}` : state.sale ? t.sale.title : t.catalog.allProducts);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8">
      <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>

      {subs.length > 0 && (
        <div className="mt-5 flex gap-2 overflow-x-auto [scrollbar-width:none]" role="tablist">
          {[null, ...subs].map((s) => (
            <button
              key={s ?? "all"}
              role="tab"
              aria-selected={state.sub === s}
              onClick={() => set({ sub: s })}
              className={`shrink-0 rounded-full px-5 py-2 text-[15px] font-bold ${state.sub === s ? "bg-plum text-blush" : "bg-white text-plum hover:bg-pink/40"}`}
            >
              {s ? SUB_NAMES[s] : t.catalog.tabsAll}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8">
        <aside className="hidden lg:block">{filters}</aside>

        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setSheet(true)} className="btn btn-outline !px-4 !py-2 text-[14px] lg:hidden">
              <FilterIcon className="size-4" />
              {t.catalog.filters}
            </button>
            <label className="ml-auto flex items-center gap-2 text-[14px]">
              <span className="text-plum-soft">{t.catalog.sort}</span>
              <select
                value={state.sort}
                onChange={(e) => set({ sort: e.target.value as Sort })}
                className="rounded-full border border-plum/20 bg-white px-3 py-2 text-[14px] font-medium"
              >
                <option value="">{t.catalog.sortDefault}</option>
                <option value="asc">{t.catalog.sortAsc}</option>
                <option value="desc">{t.catalog.sortDesc}</option>
                <option value="discount">{t.catalog.sortDiscount}</option>
              </select>
            </label>
          </div>

          {chips.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {chips.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => set(c.clear)}
                  className="flex items-center gap-1.5 rounded-full bg-plum py-1.5 pl-3 pr-2 text-[13px] font-medium text-blush"
                >
                  {c.label}
                  <CloseIcon className="size-3.5" />
                </button>
              ))}
              <button type="button" onClick={() => set({ q: "", brands: [], min: null, max: null, sale: false })} className="px-2 text-[13px] font-bold text-raspberry">
                {t.catalog.clear}
              </button>
            </div>
          )}

          {results.length ? (
            <ProductGrid products={results} cols="catalog" />
          ) : (
            <p className="tile p-8 text-center text-[16px]">{t.catalog.empty}</p>
          )}
        </div>
      </div>

      {sheet && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t.catalog.filters}>
          <button type="button" aria-label={t.catalog.close} className="absolute inset-0 bg-plum/40" onClick={() => setSheet(false)} />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-[20px] bg-blush">
            <div className="flex items-center justify-between border-b border-brass px-4 py-3">
              <span className="font-display text-2xl font-semibold">{t.catalog.filters}</span>
              <button type="button" onClick={() => setSheet(false)} aria-label={t.catalog.close} className="grid size-10 place-items-center">
                <CloseIcon />
              </button>
            </div>
            <div className="overflow-y-auto px-4 py-4">{filters}</div>
            <div className="border-t border-plum/10 p-4">
              <button type="button" onClick={() => setSheet(false)} className="btn btn-primary w-full">
                {t.catalog.show}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Filters({ base, state, set }: { base: Product[]; state: State; set: (p: Partial<State>) => void }) {
  const [brandQ, setBrandQ] = useState("");
  const [min, setMin] = useState(state.min?.toString() ?? "");
  const [max, setMax] = useState(state.max?.toString() ?? "");
  useEffect(() => {
    setMin(state.min?.toString() ?? "");
    setMax(state.max?.toString() ?? "");
  }, [state.min, state.max]);

  const brands = useMemo(() => [...new Set(base.map((p) => p.brand))].sort((a, b) => a.localeCompare(b, "az")), [base]);
  const shownBrands = brands.filter((b) => fold(b).includes(fold(brandQ)));

  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="mb-2.5 text-[13px] font-bold uppercase tracking-[0.08em]">{t.catalog.price}</legend>
        <div className="flex flex-wrap gap-1.5">
          {BUDGETS.map((b) => {
            const on = state.min === b.min && state.max === b.max;
            return (
              <button
                key={b.key}
                type="button"
                onClick={() => set(on ? { min: null, max: null } : { min: b.min, max: b.max })}
                className={`rounded-full border-[1.5px] px-3 py-1.5 text-[13px] font-bold ${on ? "border-raspberry bg-raspberry text-white" : "border-plum/25 bg-white"}`}
              >
                {t.budget[b.key]}
              </button>
            );
          })}
        </div>
        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            set({ min: num(min), max: num(max) });
          }}
        >
          <input inputMode="decimal" value={min} onChange={(e) => setMin(e.target.value)} onBlur={() => set({ min: num(min) })} placeholder={t.catalog.from} aria-label={`${t.catalog.price} ${t.catalog.from}`} className="field !py-2 text-center" />
          <span aria-hidden>–</span>
          <input inputMode="decimal" value={max} onChange={(e) => setMax(e.target.value)} onBlur={() => set({ max: num(max) })} placeholder={t.catalog.to} aria-label={`${t.catalog.price} ${t.catalog.to}`} className="field !py-2 text-center" />
          <span className="font-bold">₼</span>
          <button type="submit" className="sr-only">OK</button>
        </form>
      </fieldset>

      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[12px] bg-white px-4 py-3">
        <span className="text-[15px] font-bold">{t.catalog.onlySale}</span>
        <input type="checkbox" checked={state.sale} onChange={(e) => set({ sale: e.target.checked })} className="size-5 accent-[#B5236B]" />
      </label>

      <fieldset>
        <legend className="mb-2.5 text-[13px] font-bold uppercase tracking-[0.08em]">{t.catalog.brand}</legend>
        <input value={brandQ} onChange={(e) => setBrandQ(e.target.value)} placeholder={t.catalog.brandSearch} className="field !py-2" aria-label={t.catalog.brandSearch} />
        <ul className="mt-2 max-h-72 space-y-0.5 overflow-y-auto pr-1">
          {shownBrands.map((b) => {
            const on = state.brands.includes(b);
            return (
              <li key={b}>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-[14px] hover:bg-white">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => set({ brands: on ? state.brands.filter((x) => x !== b) : [...state.brands, b] })}
                    className="size-4 accent-[#B5236B]"
                  />
                  {b}
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </div>
  );
}
