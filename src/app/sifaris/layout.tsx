import type { Metadata } from "next";
import { t } from "@/lib/dict";

export const metadata: Metadata = { title: t.checkout.title };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
