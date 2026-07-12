const englishGroups = {
  "kisisel-teknoloji": ["Personal Technology", "Personal electronics, from phones and computers to hardware and peripherals."],
  "goruntu-eglence": ["Entertainment and Display", "Products for home video, audio, and media experiences."],
  "buyuk-ev-aletleri": ["Major Appliances", "Long-life kitchen, laundry, and climate appliances."],
  "kucuk-mutfak-aletleri": ["Small Kitchen Appliances", "Food preparation, cooking, and beverage appliances."],
  "temizlik-hava": ["Cleaning and Air", "Cleaning, garment care, and indoor air products."],
  "akilli-ev-guvenlik": ["Smart Home and Security", "Connectivity, automation, and home security systems."],
  "enerji-sistemleri": ["Home Energy", "Products that generate, store, and manage electricity at home."],
  "kisisel-bakim": ["Personal Care", "Daily care, health tracking, and comfort devices."],
  "ev-atolye-bahce": ["Home, Workshop and Garden", "Equipment for repair, making, outdoor cleaning, and garden care."],
};

export const homeCopy = {
  tr: {
    eyebrow: "Fiyatı basitçe anla", title: "Hangi ürünün fiyatını anlamak istiyorsun?", lead: "Ürünü seç veya adını ara. Parçaları, teknik özellikleri ve fiyatı yükselten nedenleri adım adım gösterelim.",
    searchLabel: "Teknoloji ara", placeholder: "Telefon, buzdolabı, işlemci veya kompresör ara", search: "Ara", catalog: "Ürün kataloğu",
    stats: ["ürün grubu", "ürün türü", "teknik terim"], translationNotice: null,
    deeper: "Daha derine inmek istersen", nextTitle: "Bilgi, ihtiyaç duyduğunda açılır.",
    links: [["Fiyat faktörleri", "Marka primi, PR ve pazarlama, vergi, kur ve servis"], ["Satın alma rehberleri", "Gereksiz özelliklere para vermeden doğru ürünü seç"], ["Karşılaştırmalar", "İki teknoloji arasında kaldığında farkı gör"]],
  },
  en: {
    eyebrow: "Understand the price, simply", title: "Which product price do you want to understand?", lead: "Choose a product or search by name. We explain its parts, specifications, and price drivers step by step.",
    searchLabel: "Search technology", placeholder: "Search phones, refrigerators, processors, or compressors", search: "Search", catalog: "Product catalog",
    stats: ["product groups", "product types", "price factors"], translationNotice: null,
    deeper: "When you want to go deeper", nextTitle: "More detail appears when you need it.",
    links: [["Price factors", "Brand premium, marketing, tax, exchange rates, and service"], ["Buying guides", "Choose the right product without paying for features you do not need"], ["Comparisons", "See the practical difference between two technologies"]],
  },
};

export function localizeGroups(groups, locale) {
  if (locale !== "en") return groups;
  return groups.map((group) => {
    const [title, description] = englishGroups[group.slug] || [group.title, group.description];
    return {
      ...group,
      title,
      description,
      families: group.families?.map((family) => ({
        ...family,
        title: englishFamilyNames[family.slug] || family.title,
        products: family.products.map((product) => ({
          ...product,
          title: englishProductNames[product.slug] || product.title,
        })),
      })),
    };
  });
}
import { englishFamilyNames, englishProductNames } from "./english-catalog";
