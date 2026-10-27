import { PRODUCTS } from "@/data/products";
import { CATEGORY_NAMES } from "./dict";
import type { CategorySlug, Product } from "./types";

/** Kataloqda yalnız şəkli olan məhsullar göstərilir. */
export const VISIBLE: Product[] = PRODUCTS.filter((p) => !p.noImage && p.image);

const ORDER: CategorySlug[] = ["etirler", "uz-qullugu", "gunesden-qorunma", "sac", "makiyaj", "beden"];

/** Boş kateqoriyalar naviqasiyaya, ana səhifəyə və filtrlərə düşmür. */
export const CATEGORIES = ORDER.filter((c) => VISIBLE.some((p) => p.category === c)).map((slug) => ({
  slug,
  name: CATEGORY_NAMES[slug],
  cover: VISIBLE.find((p) => p.category === slug)?.image,
}));

export function bySlug(slug: string) {
  return VISIBLE.find((p) => p.slug === slug);
}

export function byId(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function discountPct(p: Product): number {
  return p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
}

export function formatPrice(n: number): string {
  return `${n.toFixed(2)} ₼`;
}

/** Axtarış üçün: kiçik hərf, azərbaycan hərfləri latın ekvivalentinə də uyğun gəlsin. */
const FOLD: Record<string, string> = { ə: "e", ş: "s", ç: "c", ğ: "g", ı: "i", i̇: "i", ö: "o", ü: "u", é: "e" };
export function fold(s: string): string {
  return s
    .toLocaleLowerCase("az")
    .replace(/[əşçğıöüé]|i̇/g, (ch) => FOLD[ch] ?? ch)
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function matches(p: Product, q: string): boolean {
  const words = fold(q).split(" ").filter(Boolean);
  if (!words.length) return true;
  const hay = fold(`${p.brand} ${p.name} ${CATEGORY_NAMES[p.category]}`);
  return words.every((w) => hay.includes(w));
}
