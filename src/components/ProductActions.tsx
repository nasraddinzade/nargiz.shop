"use client";

import Link from "next/link";
import { useState } from "react";
import { t } from "@/lib/dict";
import { cart, useCart } from "@/lib/store";
import type { Product } from "@/lib/types";
import { waLink } from "@/lib/whatsapp";
import { CheckIcon, WhatsAppIcon } from "./icons";

export function ProductActions({ p }: { p: Product }) {
  const inCart = useCart().find((i) => i.id === p.id);
  const [flash, setFlash] = useState(false);
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row">
      <button
        type="button"
        onClick={() => {
          cart.add(p.id);
          setFlash(true);
          setTimeout(() => setFlash(false), 1200);
        }}
        className="btn btn-primary flex-1 !py-4 text-[17px]"
      >
        {flash ? <CheckIcon /> : null}
        {flash ? t.product.added : t.product.addToCart}
      </button>
      <a
        href={waLink(`${t.product.askMsg} ${p.name}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-wa flex-1 !py-4 text-[15px]"
      >
        <WhatsAppIcon />
        {t.product.ask}
      </a>
      {inCart && (
        <Link href="/sebet" className="btn btn-outline !py-4 text-[15px] sm:hidden">
          {t.cart.title} · {inCart.qty}
        </Link>
      )}
    </div>
  );
}
