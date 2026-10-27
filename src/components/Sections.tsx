import Link from "next/link";
import { t } from "@/lib/dict";

export function CounterEdge() {
  return <div className="counter-edge" aria-hidden />;
}

export function SectionHead({ title, lead, href, linkText }: { title: string; lead?: string; href?: string; linkText?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div>
        <h2 className="font-display text-3xl font-semibold leading-tight md:text-[44px]">{title}</h2>
        {lead && <p className="mt-1.5 max-w-xl text-[15px] text-plum-soft">{lead}</p>}
      </div>
      {href && (
        <Link href={href} className="text-[15px] font-bold text-raspberry underline-offset-4 hover:underline">
          {linkText} →
        </Link>
      )}
    </div>
  );
}

export function TaksitStrip({ className = "" }: { className?: string }) {
  return (
    <section className={`px-4 py-6 ${className}`}>
      <div className="mx-auto max-w-[1400px] rounded-[var(--radius-tile)] border-2 border-brass bg-raspberry p-1">
        <div className="flex flex-col gap-4 rounded-[10px] border border-brass/70 px-5 py-6 text-white md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="font-display text-2xl font-semibold leading-tight md:text-[34px]">{t.taksit.strip1}</p>
            <p className="mt-1 text-[16px] font-medium text-white/90">{t.taksit.strip2}</p>
          </div>
          <Link href="/taksit" className="btn shrink-0 self-start bg-white text-raspberry hover:bg-blush md:self-auto">
            {t.taksit.stripCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
