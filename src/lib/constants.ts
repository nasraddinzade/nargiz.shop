/** Demo plaşkası hər səhifənin yuxarısında. false etsən, yox olur. */
export const SHOW_DEMO_BANNER = true;

/** Təsdiqlənməmiş məlumatlar (Nizami ünvanı, iş saatları) göstərilsinmi. */
export const SHOW_UNCONFIRMED = false;

export const WHATSAPP_PHONE = "994559942002"; // 055 994 20 02, 28 May filialı
export const WHATSAPP_PHONE_DISPLAY = "055 994 20 02";
export const WHATSAPP_CREDIT_PHONE = "994709952002"; // 070 995 20 02, yalnız Taksit səhifəsindəki müraciət düyməsi üçün
export const INSTAGRAM = "nargiz.shop_";

/** Yalnız Taksit səhifəsindəki kalkulyator üçün. Mənbə bir dənədir (Birbank partnyor səhifəsi). */
export const INSTALLMENT_MONTHS = [2, 3, 6] as const;

export const BUDGETS = [
  { key: "lt10", min: null, max: 10 },
  { key: "10to30", min: 10, max: 30 },
  { key: "gt30", min: 30, max: null },
] as const;
