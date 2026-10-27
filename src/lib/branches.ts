import type { Branch } from "./types";
import { SHOW_UNCONFIRMED } from "./constants";

// Ünvanlar 2GIS-dən, rus yazılışından azərbaycancaya çevrilib. Küçə adlarının yazılışı sahibkarla dəqiqləşdirilməlidir.
export const BRANCHES: Branch[] = [
  {
    id: "ecemi",
    name: "Əcəmi",
    district: "Nəsimi rayonu",
    address: "Hüseynbala Əliyev küçəsi 11-17, mərtəbə -1, 3-cü km dairəsi yanında",
    addressConfirmed: true,
    phone: "099 994 20 02",
  },
  {
    id: "28-may",
    name: "28 May",
    district: "Nəsimi rayonu",
    address: "Rəşid Behbudov küçəsi 54a, Aloe aptekinin yanında",
    addressConfirmed: true,
    phone: "055 994 20 02",
  },
  {
    id: "nizami",
    name: "Nizami",
    district: null,
    // navigator.az: Salatın Əsgərova 79 — telefon 28 May-ınkı ilə eynidir, qarışıq qeydə oxşayır
    address: "Salatın Əsgərova 79, Yasamal rayonu",
    addressConfirmed: false,
    phone: "070 995 20 02",
  },
  {
    id: "genclik",
    name: "Gənclik",
    district: "Nərimanov rayonu",
    address: "Atatürk prospekti 2, 1-ci mərtəbə",
    addressConfirmed: true,
    phone: "070 441 20 02",
  },
  {
    id: "azadliq",
    name: "Azadlıq",
    district: "Binəqədi rayonu",
    address: "Süleyman Sani Axundov küçəsi 2, M.Ə.Rəsulzadə qəsəbəsi, 1-ci mərtəbə, Rossmann mağazasının yanında",
    addressConfirmed: true,
    phone: "070 652 20 02",
  },
  {
    id: "ehmedli",
    name: "Əhmədli",
    district: "Xətai rayonu",
    address: "Sarayevo küçəsi 11, 1-ci mərtəbə, Boranı restoranının yanında",
    addressConfirmed: true,
    phone: "070 994 20 02",
  },
  {
    id: "elmler",
    name: "Elmlər",
    district: "Yasamal rayonu",
    address: "Bəxtiyar Vahabzadə küçəsi 38-54, 1-ci mərtəbə, İstanbul aptekinin və Padişah restoranının yanında",
    addressConfirmed: true,
    phone: "077 545 20 02",
  },
];

export function visibleAddress(b: Branch): string | null {
  return b.addressConfirmed || SHOW_UNCONFIRMED ? b.address : null;
}

export function mapUrl(b: Branch): string {
  const addr = visibleAddress(b);
  const q = addr ? `${addr}, ${b.district ?? ""}, Bakı` : `Nargiz Shop ${b.name}`;
  return `https://2gis.az/baku/search/${encodeURIComponent(q)}`;
}

export function telHref(phone: string): string {
  return `tel:+994${phone.replace(/\s/g, "").replace(/^0/, "")}`;
}

export function getBranch(id: string | null | undefined): Branch | undefined {
  return BRANCHES.find((b) => b.id === id);
}
