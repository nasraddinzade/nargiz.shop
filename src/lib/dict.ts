// Bütün interfeys sətirləri. Ton qısa, danışıq dili.
export const t = {
  demo: "Demo versiya, sifarişlər qəbul edilmir, ödəniş çıxılmır",
  brand: "NARGIZ SHOP",

  nav: {
    search: "Məhsul və ya brend axtar",
    cart: "Səbət",
    whatsapp: "WhatsApp",
    branches: "Filiallar",
    taksit: "Taksit",
    catalog: "Kataloq",
  },

  hero: {
    title1: "Neçiyədi?",
    title2: "Hamısı yazılıb.",
    sub: "Hər məhsulun qiyməti gözünün qabağında. Bəyən, səbətə at, yaxın filialdan götür.",
  },

  budget: {
    lt10: "10 ₼-dək",
    "10to30": "10 ₼ - 30 ₼",
    gt30: "30 ₼-dən yuxarı",
    sale: "Endirimli",
    title: "Büdcənə görə",
    lead: "Əvvəl qiymət, sonra seçim.",
    all: "Hamısına bax",
  },

  taksit: {
    badge: "Faizsiz taksit",
    strip1: "Faizsiz, komissiyasız, ilkin ödənişsiz",
    strip2: "Ərizə 10 dəqiqəyə",
    stripCta: "Taksit haqqında",
    productLine: "Faizsiz taksit var. Şərtlər filialda dəqiqləşir",
    more: "Ətraflı",
    cartTitle: "Taksitlə almaq istəyirsiniz?",
    cartText: "Yazın, şərtləri WhatsApp-da deyək.",
    cartCta: "WhatsApp-da yaz",
    cartMsg: "Taksitlə almaq istəyirəm",
    pageTitle: "Faizsiz taksit",
    pageLead: "Faizsiz, komissiyasız, ilkin ödənişsiz. Ərizəyə cavab 10 dəqiqəyə.",
    facts: ["0% faiz", "Komissiya yoxdur", "İlkin ödəniş yoxdur", "Cavab 10 dəqiqəyə"],
    calcTitle: "Ayda nə qədər olur?",
    amount: "Məbləğ",
    months: "Müddət",
    monthShort: "ay",
    perMonth: "ayda",
    disclaimer: "Şərtlər filialda dəqiqləşir. Müddət və minimum məbləğ məhsuldan asılı ola bilər",
    onlineCta: "Onlayn kredit üçün yaz",
    onlineNote: "Ayrıca nömrə, yalnız kredit müraciətləri üçün.",
  },

  categories: {
    title: "Kateqoriyalar",
  },

  sale: {
    title: "Endirimlər",
    all: "Bütün endirimlər",
  },

  branches: {
    title: "7 filial",
    lead: "Bakının yeddi nöqtəsində. Filialı sifarişi rəsmiləşdirəndə seçirsən, buradan da əvvəlcədən yadda saxlaya bilərsən.",
    pick: "Filialdan götür",
    pickThis: "Bu filialdan götür",
    picked: "Seçildi",
    map: "Xəritədə aç",
    addressUnknown: "Ünvan dəqiqləşdirilir, zəng edin",
    pageTitle: "Filiallar",
    pageLead: "Sifarişi istədiyin filialdan götür. Seçdiyin filial rəsmiləşdirmə zamanı avtomatik yazılacaq.",
    call: "Zəng et",
    yourBranch: "Sənin filialın",
  },

  how: {
    title: "Necə sifariş verilir",
    steps: [
      { t: "Səbətə at", d: "Qiymət kartın üstündədir. Bəyəndiyini səbətə at, sayını dəyiş." },
      { t: "Filial və ya ünvan", d: "Yaxın filialdan götür və ya çatdırılma ünvanını yaz." },
      { t: "WhatsApp və ya ödəniş", d: "Səbəti bir düymə ilə WhatsApp-a göndər və ya onlayn ödə." },
    ],
  },

  product: {
    addToCart: "Səbətə at",
    added: "Səbətdədir",
    ask: "Bu məhsul barədə soruş",
    askMsg: "Salam! Bu məhsul barədə soruşmaq istəyirəm:",
    save: "Qənaət",
    volume: "Həcm",
    pickupTitle: "Filialdan götür",
    pickupText: "Filialı sifarişi rəsmiləşdirəndə seçirsən. Yeddi filialın hamısı siyahıdadır.",
    pickupLink: "Filiallara bax",
    similar: "Bu kateqoriyadan",
    back: "Kataloqa qayıt",
  },

  catalog: {
    filters: "Filtrlər",
    brand: "Brend",
    brandSearch: "Brend axtar",
    price: "Qiymət",
    from: "min",
    to: "maks",
    onlySale: "Endirimli",
    sort: "Sırala",
    sortAsc: "Əvvəl ucuz",
    sortDesc: "Əvvəl bahalı",
    sortDiscount: "Endirim çox olan",
    sortDefault: "Standart",
    clear: "Təmizlə",
    show: "Göstər",
    empty: "Bu filtrlərlə heç nə tapılmadı. Filtrləri yüngülləşdir.",
    searchTitle: "Axtarış",
    searchFor: "Axtarış:",
    allProducts: "Bütün məhsullar",
    tabsAll: "Hamısı",
    close: "Bağla",
  },

  cart: {
    title: "Səbət",
    empty: "Səbət hələ boşdur.",
    emptyCta: "Kataloqa keç",
    total: "Cəmi",
    checkout: "Sifarişi rəsmiləşdir",
    whatsapp: "WhatsApp ilə sifariş",
    remove: "Sil",
    msgIntro: "Salam! Sifariş vermək istəyirəm:",
    msgTotal: "Cəmi",
  },

  checkout: {
    title: "Rəsmiləşdirmə",
    contacts: "Əlaqə",
    name: "Ad",
    phone: "Telefon",
    phonePh: "050 000 00 00",
    method: "Necə götürəcəksən?",
    pickup: "Filialdan götür",
    delivery: "Çatdırılma",
    branch: "Filial",
    branchPh: "Filial seç",
    address: "Ünvan",
    addressPh: "Küçə, ev, mənzil",
    deliveryNote: "Çatdırılma şərtləri WhatsApp-da razılaşdırılır",
    summary: "Sifarişin",
    pay: "Ödə",
    paying: "Ödəniş yoxlanılır…",
    demoNote: "Demo: pul çıxılmır.",
    required: "Bu xananı doldur",
    branchRequired: "Filial seç",
    orWhatsapp: "və ya",
  },

  success: {
    title: "Sifariş qəbul olundu",
    demo: "Bu demo sifarişdir, heç bir məbləğ çıxılmayıb.",
    number: "Sifariş nömrəsi",
    branch: "Götürmə filialı",
    delivery: "Çatdırılma ünvanı",
    items: "Tərkib",
    home: "Ana səhifəyə",
    none: "Son sifariş tapılmadı.",
  },

  footer: {
    instagram: "Instagram",
  },
} as const;

export const CATEGORY_NAMES = {
  etirler: "Ətirlər",
  "uz-qullugu": "Üz qulluğu",
  "gunesden-qorunma": "Günəşdən qorunma",
  sac: "Saç",
  makiyaj: "Makiyaj",
  beden: "Bədən",
} as const;

export const SUB_NAMES = { uz: "Üz", goz: "Göz", dodaq: "Dodaq" } as const;
