"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { BRANCHES } from "@/lib/branches";
import { byId, formatPrice } from "@/lib/catalog";
import { t } from "@/lib/dict";
import { cart, saveLastOrder, setBranch, useBranch, useCart, useHydrated } from "@/lib/store";
import { cartLines, cartMessage, waLink } from "@/lib/whatsapp";

type Method = "pickup" | "delivery";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart();
  const savedBranch = useBranch();
  const { total } = cartLines(items);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<Method>("pickup");
  const [branchId, setBranchId] = useState("");
  const [address, setAddress] = useState("");
  const [paying, setPaying] = useState(false);
  const [tried, setTried] = useState(false);
  const hydrated = useHydrated();

  // Filiallar səhifəsində seçilən filial burada avtomatik yazılır
  useEffect(() => {
    if (savedBranch && !branchId) setBranchId(savedBranch);
  }, [savedBranch, branchId]);

  if (!hydrated) return <div className="min-h-[60vh]" />;
  if (!items.length && !paying) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-5xl font-semibold">{t.checkout.title}</h1>
        <p className="mt-4 text-lg">{t.cart.empty}</p>
        <Link href="/axtar" className="btn btn-primary mt-6">{t.cart.emptyCta}</Link>
      </div>
    );
  }

  const errors = {
    name: !name.trim(),
    phone: phone.replace(/\D/g, "").length < 9,
    branch: method === "pickup" && !branchId,
    address: method === "delivery" && !address.trim(),
  };
  const valid = !Object.values(errors).some(Boolean);

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!valid || paying) return;
    setPaying(true);
    // Demo ödəniş: 1.5 saniyə gözləmə, pul çıxılmır.
    // Real versiyada burada epoint ödəniş şlüzü çağırılacaq (epoint.az).
    await new Promise((r) => setTimeout(r, 1500));
    const number = `NS-${Date.now().toString().slice(-6)}`;
    saveLastOrder({
      number,
      items,
      total,
      method,
      branchId: method === "pickup" ? branchId : undefined,
      address: method === "delivery" ? address.trim() : undefined,
      name: name.trim(),
    });
    if (method === "pickup") setBranch(branchId);
    cart.clear();
    router.push("/ugurlu");
  };

  const err = (k: keyof typeof errors) => tried && errors[k];

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8">
      <h1 className="font-display text-4xl font-semibold md:text-6xl">{t.checkout.title}</h1>
      <form onSubmit={pay} noValidate className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <fieldset className="tile p-5">
            <legend className="sr-only">{t.checkout.contacts}</legend>
            <h2 className="font-display text-2xl font-semibold">{t.checkout.contacts}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[14px] font-medium">{t.checkout.name}</span>
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="field" aria-invalid={!!err("name")} />
                {err("name") && <span className="mt-1 block text-[13px] font-medium text-raspberry">{t.checkout.required}</span>}
              </label>
              <label className="block">
                <span className="mb-1 block text-[14px] font-medium">{t.checkout.phone}</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder={t.checkout.phonePh} className="field" aria-invalid={!!err("phone")} />
                {err("phone") && <span className="mt-1 block text-[13px] font-medium text-raspberry">{t.checkout.required}</span>}
              </label>
            </div>
          </fieldset>

          <fieldset className="tile p-5">
            <legend className="sr-only">{t.checkout.method}</legend>
            <h2 className="font-display text-2xl font-semibold">{t.checkout.method}</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(["pickup", "delivery"] as Method[]).map((m) => (
                <label
                  key={m}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-[12px] border-[1.5px] px-3 py-3 text-[15px] font-bold ${method === m ? "border-raspberry bg-blush" : "border-plum/15"}`}
                >
                  <input type="radio" name="method" checked={method === m} onChange={() => setMethod(m)} className="size-4 accent-[#B5236B]" />
                  {m === "pickup" ? t.checkout.pickup : t.checkout.delivery}
                </label>
              ))}
            </div>

            {method === "pickup" ? (
              <label className="mt-4 block">
                <span className="mb-1 block text-[14px] font-medium">{t.checkout.branch}</span>
                <select value={branchId} onChange={(e) => setBranchId(e.target.value)} required className="field" aria-invalid={!!err("branch")}>
                  <option value="">{t.checkout.branchPh}</option>
                  {BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} · {b.phone}
                    </option>
                  ))}
                </select>
                {err("branch") && <span className="mt-1 block text-[13px] font-medium text-raspberry">{t.checkout.branchRequired}</span>}
              </label>
            ) : (
              <label className="mt-4 block">
                <span className="mb-1 block text-[14px] font-medium">{t.checkout.address}</span>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} placeholder={t.checkout.addressPh} className="field" aria-invalid={!!err("address")} />
                {err("address") && <span className="mt-1 block text-[13px] font-medium text-raspberry">{t.checkout.required}</span>}
                <span className="mt-2 block text-[14px] text-plum-soft">{t.checkout.deliveryNote}</span>
              </label>
            )}
          </fieldset>
        </div>

        <aside className="tile h-fit p-5 lg:sticky lg:top-36">
          <h2 className="font-display text-2xl font-semibold">{t.checkout.summary}</h2>
          <ul className="mt-3 space-y-2 border-b border-brass pb-3 text-[14px]">
            {items.map((it) => {
              const p = byId(it.id);
              if (!p) return null;
              return (
                <li key={it.id} className="flex justify-between gap-3">
                  <span className="line-clamp-2 min-w-0">
                    {p.name} <span className="font-bold">× {it.qty}</span>
                  </span>
                  <span className="shrink-0 font-bold tabular-nums">{formatPrice(p.price * it.qty)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-medium">{t.cart.total}</span>
            <span className="price-tag text-[24px]">{formatPrice(total)}</span>
          </div>
          <button type="submit" disabled={paying} className="btn btn-primary mt-5 w-full !py-4 text-[17px] disabled:opacity-70">
            {paying ? t.checkout.paying : `${t.checkout.pay} ${formatPrice(total)}`}
          </button>
          <p className="mt-2 text-center text-[13px] text-plum-soft">{t.checkout.demoNote}</p>
          <div className="my-3 text-center text-[13px] text-plum-soft">{t.checkout.orWhatsapp}</div>
          <a href={waLink(cartMessage(items))} target="_blank" rel="noopener noreferrer" className="btn btn-wa w-full !py-3.5 text-[15px]">
            <WhatsAppIcon />
            {t.cart.whatsapp}
          </a>
        </aside>
      </form>
    </div>
  );
}
