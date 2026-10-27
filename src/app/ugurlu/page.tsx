"use client";

import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import { getBranch, visibleAddress } from "@/lib/branches";
import { byId, formatPrice } from "@/lib/catalog";
import { t } from "@/lib/dict";
import { useHydrated, useLastOrder } from "@/lib/store";

export default function SuccessPage() {
  const order = useLastOrder();
  if (!useHydrated()) return <div className="min-h-[60vh]" />;

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-lg">{t.success.none}</p>
        <Link href="/" className="btn btn-primary mt-6">{t.success.home}</Link>
      </div>
    );
  }

  const branch = getBranch(order.branchId);
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-[var(--radius-tile)] bg-pink p-6 md:p-8">
        <span className="grid size-12 place-items-center rounded-full bg-plum text-blush">
          <CheckIcon className="size-6" />
        </span>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">{t.success.title}</h1>
        <p className="mt-2 text-[15px]">{t.success.demo}</p>
      </div>

      <dl className="tile mt-3 divide-y divide-brass/60 p-5 text-[15px]">
        <div className="flex justify-between gap-4 pb-3">
          <dt className="text-plum-soft">{t.success.number}</dt>
          <dd className="font-bold tabular-nums">{order.number}</dd>
        </div>
        {branch ? (
          <div className="py-3">
            <dt className="text-plum-soft">{t.success.branch}</dt>
            <dd className="mt-1">
              <span className="font-display text-xl font-semibold">{branch.name}</span>
              <span className="block text-[14px]">{visibleAddress(branch) ?? ""}</span>
              <span className="block text-[14px] font-bold tabular-nums">{branch.phone}</span>
            </dd>
          </div>
        ) : (
          <div className="py-3">
            <dt className="text-plum-soft">{t.success.delivery}</dt>
            <dd className="mt-1 font-medium">{order.address}</dd>
          </div>
        )}
        <div className="pt-3">
          <dt className="text-plum-soft">{t.success.items}</dt>
          <dd>
            <ul className="mt-2 space-y-1.5">
              {order.items.map((it) => {
                const p = byId(it.id);
                if (!p) return null;
                return (
                  <li key={it.id} className="flex justify-between gap-3 text-[14px]">
                    <span className="min-w-0">
                      {p.name} <b>× {it.qty}</b>
                    </span>
                    <span className="shrink-0 font-bold tabular-nums">{formatPrice(p.price * it.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-medium">{t.cart.total}</span>
              <span className="price-tag text-[22px]">{formatPrice(order.total)}</span>
            </div>
          </dd>
        </div>
      </dl>

      <Link href="/" className="btn btn-primary mt-6">{t.success.home}</Link>
    </div>
  );
}
