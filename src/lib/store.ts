"use client";

import { useSyncExternalStore } from "react";
import type { CartItem } from "./types";

// localStorage üzərində kiçik store: səbət yenidən yükləmədən sonra da qalır.
function createStore<T>(key: string, fallback: T) {
  let cache: T = fallback;
  let loaded = false;
  const listeners = new Set<() => void>();

  const read = () => {
    if (!loaded && typeof window !== "undefined") {
      loaded = true;
      try {
        const raw = window.localStorage.getItem(key);
        if (raw) cache = JSON.parse(raw) as T;
      } catch {}
    }
    return cache;
  };

  const set = (next: T) => {
    cache = next;
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {}
    listeners.forEach((l) => l());
  };

  const subscribe = (l: () => void) => {
    listeners.add(l);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        loaded = false;
        read();
        l();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(l);
      window.removeEventListener("storage", onStorage);
    };
  };

  const use = () => useSyncExternalStore(subscribe, read, () => fallback);
  return { use, get: read, set };
}

const EMPTY: CartItem[] = [];
const cartStore = createStore<CartItem[]>("nargiz-cart", EMPTY);
const branchStore = createStore<string | null>("nargiz-branch", null);

export const useCart = cartStore.use;
export const useBranch = branchStore.use;
export const setBranch = (id: string | null) => branchStore.set(id);

export const cart = {
  add(id: string, qty = 1) {
    const items = cartStore.get();
    const found = items.find((i) => i.id === id);
    cartStore.set(found ? items.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i)) : [...items, { id, qty }]);
  },
  setQty(id: string, qty: number) {
    const items = cartStore.get();
    cartStore.set(qty <= 0 ? items.filter((i) => i.id !== id) : items.map((i) => (i.id === id ? { ...i, qty } : i)));
  },
  remove(id: string) {
    cartStore.set(cartStore.get().filter((i) => i.id !== id));
  },
  clear() {
    cartStore.set(EMPTY);
  },
};

const noop = () => () => {};
/** Serverdə false, brauzerdə true: localStorage-dan asılı səhifələrdə "boş səbət" yanıb-sönməsin. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}

export function useCartCount(): number {
  return useCart().reduce((n, i) => n + i.qty, 0);
}

export type LastOrder = {
  number: string;
  items: CartItem[];
  total: number;
  method: "pickup" | "delivery";
  branchId?: string;
  address?: string;
  name: string;
};

const orderStore = createStore<LastOrder | null>("nargiz-last-order", null);
export const useLastOrder = orderStore.use;
export const saveLastOrder = (o: LastOrder) => orderStore.set(o);
