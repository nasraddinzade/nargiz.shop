import type { Metadata } from "next";
import { CounterEdge } from "@/components/Sections";
import { TaksitCalculator } from "@/components/TaksitCalculator";
import { t } from "@/lib/dict";

export const metadata: Metadata = { title: t.taksit.pageTitle };

export default function TaksitPage() {
  return (
    <>
      <section className="bg-raspberry text-white">
        <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
          <h1 className="font-display text-5xl font-semibold leading-none md:text-7xl">{t.taksit.pageTitle}</h1>
          <p className="mt-4 max-w-xl text-[17px] leading-snug">{t.taksit.pageLead}</p>
          <ul className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">
            {t.taksit.facts.map((f) => (
              <li key={f} className="rounded-[12px] border border-brass px-4 py-3 text-[15px] font-bold">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CounterEdge />
      <div className="mx-auto max-w-[1100px] px-4 py-10">
        <TaksitCalculator />
      </div>
    </>
  );
}
