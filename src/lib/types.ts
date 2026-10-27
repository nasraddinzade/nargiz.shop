export type CategorySlug = "etirler" | "uz-qullugu" | "gunesden-qorunma" | "sac" | "makiyaj" | "beden";
export type MakeupSub = "uz" | "goz" | "dodaq";

export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  volume: string | null;
  price: number;
  oldPrice: number | null;
  category: CategorySlug;
  sub: MakeupSub | null;
  image?: string;
  /** Şəkil tapılmayıb və ya rədd edilib. Kataloqda göstərilmir, datadan silinmir. */
  noImage?: boolean;
};

export type Branch = {
  id: string;
  name: string;
  district: string | null;
  address: string | null;
  addressConfirmed: boolean;
  phone: string;
};

export type CartItem = { id: string; qty: number };
