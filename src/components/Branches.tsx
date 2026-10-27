"use client";

import { useRouter } from "next/navigation";
import { BRANCHES, mapUrl, telHref, visibleAddress } from "@/lib/branches";
import { t } from "@/lib/dict";
import { setBranch, useBranch } from "@/lib/store";
import { CheckIcon, PhoneIcon, PinIcon } from "./icons";

/** Ana səhifə: yığcam siyahı. Düymə filialı yadda saxlayır və kataloqa aparır. */
export function BranchListCompact() {
  const router = useRouter();
  const current = useBranch();
  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {BRANCHES.map((b) => {
        const active = current === b.id;
        return (
          <li key={b.id} className={`tile flex items-center justify-between gap-3 px-4 py-3 ${active ? "ring-2 ring-raspberry" : ""}`}>
            <div className="min-w-0">
              <div className="font-display text-xl font-semibold">{b.name}</div>
              <a href={telHref(b.phone)} className="text-[14px] tabular-nums text-plum-soft hover:text-raspberry">
                {b.phone}
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                setBranch(b.id);
                router.push("/axtar");
              }}
              className={`btn shrink-0 !px-3.5 !py-2 text-[13px] ${active ? "bg-pink text-plum" : "btn-primary"}`}
            >
              {active && <CheckIcon className="size-4" />}
              {t.branches.pick}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Filiallar səhifəsi: tam kartlar. */
export function BranchCards() {
  const current = useBranch();
  return (
    <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {BRANCHES.map((b) => {
        const active = current === b.id;
        const addr = visibleAddress(b);
        return (
          <li key={b.id} className={`tile flex flex-col p-5 ${active ? "ring-2 ring-raspberry" : ""}`}>
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-[28px] font-semibold leading-none">{b.name}</h2>
              {active && (
                <span className="rounded-full bg-pink px-2.5 py-1 text-[12px] font-bold">{t.branches.yourBranch}</span>
              )}
            </div>
            {b.district && <p className="mt-1.5 text-[14px] font-medium text-plum-soft">{b.district}</p>}
            <div className="my-4 h-px bg-brass" />
            <p className="flex gap-2 text-[15px] leading-snug">
              <PinIcon className="mt-0.5 size-5 shrink-0 text-raspberry" />
              <span>{addr ?? <span className="text-plum-soft">{t.branches.addressUnknown}</span>}</span>
            </p>
            <a href={telHref(b.phone)} className="mt-2.5 flex items-center gap-2 text-[16px] font-bold tabular-nums hover:text-raspberry">
              <PhoneIcon className="size-5 shrink-0 text-raspberry" />
              {b.phone}
            </a>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              <a href={mapUrl(b)} target="_blank" rel="noopener noreferrer" className="btn btn-outline !py-2.5 text-[14px]">
                {t.branches.map}
              </a>
              <button
                type="button"
                onClick={() => setBranch(b.id)}
                className={`btn !py-2.5 text-[14px] ${active ? "bg-pink text-plum" : "btn-primary"}`}
              >
                {active && <CheckIcon className="size-4" />}
                {active ? t.branches.picked : t.branches.pickThis}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
