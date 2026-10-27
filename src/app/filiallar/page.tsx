import type { Metadata } from "next";
import { BranchCards } from "@/components/Branches";
import { CounterEdge } from "@/components/Sections";
import { t } from "@/lib/dict";

export const metadata: Metadata = { title: t.branches.pageTitle };

export default function BranchesPage() {
  return (
    <>
      <section className="bg-pink">
        <div className="mx-auto max-w-[1400px] px-4 py-10 md:py-14">
          <h1 className="font-display text-5xl font-semibold leading-none md:text-7xl">{t.branches.pageTitle}</h1>
          <p className="mt-4 max-w-xl text-[16px] leading-snug md:text-[17px]">{t.branches.pageLead}</p>
        </div>
      </section>
      <CounterEdge />
      <div className="mx-auto max-w-[1400px] px-4 py-8">
        <BranchCards />
      </div>
    </>
  );
}
