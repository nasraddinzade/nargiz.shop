import type { Metadata, Viewport } from "next";
import { Fraunces, Onest } from "next/font/google";
import { Footer } from "@/components/Footer";
import { DemoBanner, Header } from "@/components/Header";
import { SHOW_DEMO_BANNER } from "@/lib/constants";
import "./globals.css";

// latin-ext olmadan ə və ₼ çəkilmir
const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], weight: ["500", "600"], variable: "--font-fraunces", display: "swap" });
const onest = Onest({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "700"], variable: "--font-onest", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Nargiz Shop — Neçiyədi? Hamısı yazılıb.", template: "%s · Nargiz Shop" },
  description: "Kosmetika və parfümeriya. Qiymət hər məhsulun üstündə, 7 filialdan götür, faizsiz taksit.",
};

export const viewport: Viewport = { themeColor: "#EE93BC", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={`${fraunces.variable} ${onest.variable}`}>
      <body className="min-h-dvh">
        {SHOW_DEMO_BANNER && <DemoBanner />}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
