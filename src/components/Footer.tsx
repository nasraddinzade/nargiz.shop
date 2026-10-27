import Link from "next/link";
import { INSTAGRAM, WHATSAPP_PHONE_DISPLAY } from "@/lib/constants";
import { t } from "@/lib/dict";
import { waLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-16">
      <div className="counter-edge" />
      <div className="bg-pink">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-10 md:flex-row md:items-end md:justify-between">
          <div className="font-display text-4xl font-semibold tracking-[0.05em] md:text-6xl">{t.brand}</div>
          <ul className="flex flex-col gap-2 text-[15px] font-medium md:items-end">
            <li>
              <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                {t.footer.instagram} @{INSTAGRAM}
              </a>
            </li>
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                WhatsApp {WHATSAPP_PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex gap-4">
              <Link href="/filiallar" className="underline-offset-4 hover:underline">{t.nav.branches}</Link>
              <Link href="/taksit" className="underline-offset-4 hover:underline">{t.nav.taksit}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
