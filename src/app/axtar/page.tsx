import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalog } from "@/components/Catalog";
import { t } from "@/lib/dict";

export const metadata: Metadata = { title: t.catalog.searchTitle };

export default function SearchPage() {
  return (
    <Suspense>
      <Catalog />
    </Suspense>
  );
}
