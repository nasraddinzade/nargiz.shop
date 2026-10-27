import { WHATSAPP_PHONE } from "./constants";
import { byId, formatPrice } from "./catalog";
import { t } from "./dict";
import type { CartItem } from "./types";

export function waLink(text?: string, phone: string = WHATSAPP_PHONE): string {
  return `https://wa.me/${phone}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function cartLines(items: CartItem[]): { lines: string[]; total: number } {
  let total = 0;
  const lines: string[] = [];
  for (const it of items) {
    const p = byId(it.id);
    if (!p) continue;
    total += p.price * it.qty;
    lines.push(`• ${p.name} × ${it.qty} = ${formatPrice(p.price * it.qty)}`);
  }
  return { lines, total };
}

export function cartMessage(items: CartItem[], intro: string = t.cart.msgIntro): string {
  const { lines, total } = cartLines(items);
  return [intro, "", ...lines, "", `${t.cart.msgTotal}: ${formatPrice(total)}`].join("\n");
}
