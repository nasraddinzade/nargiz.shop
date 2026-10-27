"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/catalog";
import { INSTALLMENT_MONTHS, WHATSAPP_CREDIT_PHONE } from "@/lib/constants";
import { t } from "@/lib/dict";
import { useCart, useHydrated } from "@/lib/store";
import { cartLines, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

// Rəqəmlər yalnız bu səhifədə. Kartlarda və səbətdə ayda ödəniş göstərilmir.
export function TaksitCalculator() {
  const cartTotal = cartLines(useCart()).total;
  const hydrated = useHydrated();
  const [raw, setRaw] = useState<string | null>(null);
  const [months, setMonths] = useState<number>(INSTALLMENT_MONTHS[INSTALLMENT_MONTHS.length - 1]);

  const value = raw ?? (hydrated && cartTotal > 0 ? cartTotal.toFixed(2) : "100");
  const amount = Number(value.replace(",", "."));
  const perMonth = Number.isFinite(amount) && amount > 0 ? amount / months : 0;

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="tile p-5 md:p-7">
        <h2 className="font-display text-3xl font-semibold">{t.taksit.calcTitle}</h2>

        <label className="mt-5 block">
          <span className="mb-1.5 block text-[14px] font-medium">{t.taksit.amount}</span>
          <div className="flex items-center gap-2">
            <input
              inputMode="decimal"
              value={value}
              onChange={(e) => setRaw(e.target.value)}
              className="field text-[20px] font-bold tabular-nums"
            />
            <span className="text-[20px] font-bold">₼</span>
          </div>
        </label>

        <div className="mt-5">
          <span className="mb-1.5 block text-[14px] font-medium">{t.taksit.months}</span>
          <div className="grid grid-cols-3 gap-2" role="radiogroup">
            {INSTALLMENT_MONTHS.map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={months === m}
                onClick={() => setMonths(m)}
                className={`rounded-[12px] border-[1.5px] py-3 text-[17px] font-bold ${months === m ? "border-raspberry bg-raspberry text-white" : "border-plum/20 bg-white"}`}
              >
                {m} {t.taksit.monthShort}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[12px] bg-blush p-4">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="price-tag text-[32px]">{formatPrice(perMonth)}</span>
            <span className="text-[16px] font-medium">/ {t.taksit.perMonth}</span>
          </div>
          <p className="mt-3 text-[14px] leading-snug">{t.taksit.disclaimer}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-[var(--radius-tile)] border-2 border-brass bg-white p-5 md:p-7">
        <h2 className="font-display text-3xl font-semibold leading-tight">{t.taksit.strip2}</h2>
        <p className="mt-2 text-[15px] text-plum-soft">{t.taksit.onlineNote}</p>
        <a
          href={waLink(t.taksit.cartMsg, WHATSAPP_CREDIT_PHONE)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-5 self-start !py-4 text-[16px]"
        >
          <WhatsAppIcon />
          {t.taksit.onlineCta}
        </a>
      </div>
    </div>
  );
}
