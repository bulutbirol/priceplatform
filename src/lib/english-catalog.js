export const englishProductNames = {
  telefonlar: "Phones", tabletler: "Tablets", "akilli-saatler": "Smartwatches",
  "dizustu-bilgisayarlar": "Laptops", "masaustu-bilgisayarlar": "Desktop computers", "mini-pcler": "Mini PCs",
  "hepsi-bir-arada-bilgisayarlar": "All-in-one computers", islemciler: "Processors", "ekran-kartlari": "Graphics cards",
  anakartlar: "Motherboards", "ram-bellekler": "RAM", ssdler: "SSDs", "guc-kaynaklari": "Power supplies",
  "bilgisayar-kasalari": "PC cases", "islemci-sogutuculari": "CPU coolers", monitorler: "Monitors",
  klavyeler: "Keyboards", fareler: "Mice", "web-kameralari": "Webcams", yazicilar: "Printers",
  "harici-depolama": "External storage", "dock-istasyonlari": "Docking stations", kameralar: "Cameras",
  kulakliklar: "Headphones", "oyun-konsollari": "Game consoles", televizyonlar: "Televisions",
  projeksiyonlar: "Projectors", soundbarlar: "Soundbars", hoparlorler: "Speakers", "medya-oynaticilar": "Media players",
  buzdolaplari: "Refrigerators", dondurucular: "Freezers", "camasir-makineleri": "Washing machines",
  "kurutma-makineleri": "Tumble dryers", "bulasik-makineleri": "Dishwashers", firinlar: "Ovens",
  ocaklar: "Cooktops", davlumbazlar: "Range hoods", klimalar: "Air conditioners", airfryerlar: "Air fryers",
  mikrodalgalar: "Microwave ovens", "kahve-makineleri": "Coffee machines", kettlelar: "Kettles",
  "tost-makineleri": "Sandwich presses", blenderlar: "Blenders", mikserler: "Mixers", "mutfak-robotlari": "Food processors",
  "ekmek-yapma-makineleri": "Bread makers", "su-aritma-cihazlari": "Water purifiers", "elektrikli-supurgeler": "Vacuum cleaners",
  "robot-supurgeler": "Robot vacuums", "dikey-supurgeler": "Stick vacuums", "buharli-temizleyiciler": "Steam cleaners",
  utuler: "Irons", "hava-temizleyiciler": "Air purifiers", nemlendiriciler: "Humidifiers", "nem-alicilar": "Dehumidifiers",
  vantilatorler: "Fans", modemler: "Modems", "mesh-wifi-sistemleri": "Mesh Wi-Fi systems", "akilli-prizler": "Smart plugs",
  "akilli-ampuller": "Smart bulbs", termostatlar: "Thermostats", "guvenlik-kameralari": "Security cameras",
  "alarm-sistemleri": "Alarm systems", "goruntulu-ziller": "Video doorbells", "akilli-kilitler": "Smart locks",
  "ev-sensorleri": "Home sensors", "gunes-panelleri": "Solar panels", inverterler: "Inverters",
  "ev-bataryalari": "Home batteries", "ups-cihazlari": "UPS systems", "elektrikli-arac-sarj-cihazlari": "EV chargers",
  "enerji-olcerler": "Energy meters", "sac-kurutma-makineleri": "Hair dryers", "sac-sekillendiriciler": "Hair stylers",
  "tiras-makineleri": "Electric shavers", epilatorler: "Epilators", "elektrikli-dis-fircalari": "Electric toothbrushes",
  "akilli-baskuller": "Smart scales", "masaj-cihazlari": "Massage devices", "dikis-makineleri": "Sewing machines",
  matkaplar: "Drills", vidalamalar: "Electric screwdrivers", "basincli-yikama-makineleri": "Pressure washers",
  "cim-bicme-makineleri": "Lawn mowers", "su-pompalari": "Water pumps", "otomatik-sulama-sistemleri": "Automatic irrigation systems",
  "beyaz-esya": "Major appliances",
};

export const englishFamilyNames = {
  "mobil-giyilebilir": "Mobile and wearable", "bilgisayar-sistemleri": "Computer systems", "bilgisayar-donanimi": "Computer hardware",
  "cevre-birimleri": "Peripherals", "depolama-baglanti": "Storage and connectivity", "fotograf-ses-oyun": "Photography, audio and gaming",
  "goruntu-sistemleri": "Display systems", "ev-ses-sistemleri": "Home audio", sogutma: "Cooling",
  "camasir-bakimi": "Laundry care", "bulasik-yikama": "Dishwashing", pisirme: "Cooking", iklimlendirme: "Climate control",
  "tezgah-ustu-pisirme": "Countertop cooking", "icecek-su": "Drinks and water", hazirlama: "Food preparation",
  "zemin-temizligi": "Floor cleaning", "giysi-bakimi": "Garment care", "hava-nem": "Air and humidity",
  "ev-agi": "Home networking", otomasyon: "Automation and control", guvenlik: "Security",
  "uretim-donusum": "Generation and conversion", "depolama-yedekleme": "Storage and backup", "sarj-olcum": "Charging and metering",
  "sac-bakimi": "Hair care", "tiras-epilasyon": "Shaving and epilation", "agiz-saglik-konfor": "Oral care, health and comfort",
  "ev-atolyesi": "Home workshop", "dis-alan-temizligi": "Outdoor cleaning", "bahce-sulama": "Garden and irrigation",
};

export function toEnglishCategory(category) {
  const title = englishProductNames[category.slug];
  if (!title) return null;
  return {
    ...category,
    locale: "en",
    title,
    eyebrow: "Product type",
    shortDescription: `Understand the specifications, components, and price drivers of ${title.toLowerCase()}.`,
    body: `Start with the specifications shown in stores. Then examine the components, software, running costs, service, and other details that can change the price of ${title.toLowerCase()}.`,
  };
}

export const englishPriceFactors = [
  ["component-quality", "Component quality", "Higher-grade parts, materials, capacity, and tighter tolerances can raise the direct cost.", "high"],
  ["manufacturing", "Manufacturing and testing", "Complex assembly, quality control, safety testing, and lower production volume can increase cost.", "high"],
  ["research-development", "Research and development", "Design, prototypes, software, certification, and engineering costs are spread across the products sold.", "medium"],
  ["brand-premium", "Brand premium", "Reputation, ecosystem, design, support, and market positioning can add to the hardware price.", "medium"],
  ["marketing-pr", "Marketing and PR", "Launches, advertising, retail visibility, sponsorships, and distribution indirectly affect the shelf price.", "medium"],
  ["tax", "Taxes", "VAT, customs duties, and category-specific taxes are included in the final price.", "high"],
  ["exchange-rate", "Exchange rate", "Currency movements can quickly change the local price of imported products and components.", "high"],
  ["service-warranty", "Service and warranty", "Spare parts, technician networks, warranty length, and after-sales support add cost.", "medium"],
].map(([slug, title, shortDescription, impact], index) => ({
  id: `factor-en-${index + 1}`, slug, locale: "en", title, shortDescription, body: shortDescription,
  impact, editorialEstimate: true, categorySlugs: Object.keys(englishProductNames),
  updatedAt: "2026-07-13", reviewedAt: "2026-07-13",
}));
