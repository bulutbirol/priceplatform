const reviewedAt = "2026-07-11";

export const expansionCategories = [
  ["fridge", "buzdolaplari", "Buzdolabı", "Soğuk zincirin evdeki merkezi", "Kompresör, yalıtım, hacim ve soğutma kontrolünün fiyata etkisini öğren.", "Buzdolabında kompresör kadar yalıtım kalınlığı, hava dolaşımı, sensörler, raf malzemesi ve servis edilebilirlik de uzun vadeli değeri belirler.", "snowflake", "teal"],
  ["washer", "camasir-makineleri", "Çamaşır Makinesi", "Suyu ve hareketi yöneten makine", "Motor, tambur, pompa ve titreşim kontrolünün maliyetini parçalarına ayır.", "Çamaşır makinesinde kapasite etiketi tek başına yeterli değildir. Motor, rulman, amortisör, pompa, ısıtıcı ve kontrol elektroniği fiyat ile ömrü birlikte etkiler.", "washing-machine", "blue"],
  ["dishwasher", "bulasik-makineleri", "Bulaşık Makinesi", "Basınçlı su ve ısının dengesi", "Pompa, püskürtme, kurutma ve sepet sistemleri için ne ödediğini gör.", "Bulaşık makinesinin gerçek farkı suyu ne kadar iyi dolaştırdığı, filtrelediği, ısıttığı ve sesi nasıl yalıttığıyla ortaya çıkar.", "dishwasher", "lime"],
  ["dryer", "kurutma-makineleri", "Kurutma Makinesi", "Nemi kumaştan güvenle ayırmak", "Isı pompası, nem sensörü, hava kanalı ve tamburun maliyetini anla.", "Kurutma makinesinde ilk fiyat ile enerji tüketimi arasında güçlü bir denge vardır. Isı pompası, filtre, sensör ve hava akışı tasarımı sonucu belirler.", "wind", "coral"],
  ["oven", "firinlar", "Fırın", "Isıyı eşit ve kontrollü dağıtmak", "Rezistans, fan, yalıtım ve cam katmanlarının fiyatını çöz.", "Fırında güçlü ısıtıcıdan daha önemlisi sıcaklığı kararlı ve eşit tutmaktır. Yalıtım, fan, sensör, kapı camı ve kontrol kartı bu işi birlikte yapar.", "oven", "amber"],
  ["aircon", "klimalar", "Klima", "Isıyı içeriden dışarı taşımak", "Kompresör, inverter kartı, eşanjör ve filtre maliyetlerini öğren.", "Klimanın fiyatını kapasite kadar verimlilik, düşük ses, eşanjör alanı, inverter kontrolü, montaj kalitesi ve servis ağı belirler.", "air-vent", "pink"],
].map(([key, slug, title, eyebrow, shortDescription, body, icon, color]) => ({
  id: `category-${key}`, slug, locale: "tr", title, eyebrow, shortDescription, body, icon, color, image: null,
}));

function slugify(value) {
  return value.toLocaleLowerCase("tr-TR")
    .replaceAll("ç", "c").replaceAll("ğ", "g").replaceAll("ı", "i").replaceAll("ö", "o").replaceAll("ş", "s").replaceAll("ü", "u")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const termTitles = {
  telefonlar: ["Ekran camı kaplaması", "Dokunmatik katman", "Buhar odası soğutma", "Titreşim motoru", "Kasa çerçevesi"],
  kameralar: ["Mekanik obtüratör", "Görüntü işlemcisi", "Hava sızdırmaz gövde", "Kart yazma hızı", "Lens kaplaması"],
  televizyonlar: ["Arka aydınlatma sürücüsü", "Panel homojenliği", "Yansıma önleyici kaplama", "Hoparlör kabini", "Bağlantı kartı"],
  buzdolaplari: ["Kompresör", "İnverter kompresör", "Evaporatör", "Kondenser", "Soğutucu akışkan", "Vakum yalıtım paneli", "Poliüretan yalıtım", "Kapı contası", "Sirkülasyon fanı", "Çift soğutma devresi", "No Frost sistemi", "Sıcaklık sensörü", "Nem kontrollü çekmece", "Cam raf", "Buz yapıcı", "Su sebili", "Kontrol kartı", "Değişken hızlı fan", "Kapı menteşesi", "Antibakteriyel filtre"],
  "camasir-makineleri": ["Direct drive motor", "Kayışlı motor", "Paslanmaz çelik tambur", "Tambur rulmanı", "Amortisör", "Denge ağırlığı", "Tahliye pompası", "Su giriş valfi", "Rezistans", "Su seviye sensörü", "Köpük sensörü", "Yük sensörü", "Kontrol kartı", "Kapak kilidi", "Kazan malzemesi", "Otomatik deterjan dozajı", "Buhar üretimi", "Kaçak koruması", "Hız kontrollü sıkma", "Ses yalıtımı"],
  "bulasik-makineleri": ["Sirkülasyon pompası", "Tahliye pompası", "Püskürtme kolu", "İnce filtre", "Paslanmaz çelik kazan", "Rezistans", "Isı pompalı kurutma", "Zeolit kurutma", "Su sertliği ayarı", "Bulanıklık sensörü", "Su seviye sensörü", "Sepet rayı", "Katlanır tel sistemi", "Otomatik kapı açma", "Deterjan gözü", "Kaçak koruma tabanı", "Kontrol kartı", "Ses yalıtım keçesi", "İç aydınlatma", "Ayarlanabilir üst sepet"],
  "kurutma-makineleri": ["Isı pompası", "Kompresör", "Evaporatör", "Kondenser", "Tambur motoru", "Paslanmaz tambur", "Nem sensörü", "Sıcaklık sensörü", "Tiftik filtresi", "Kondenser filtresi", "Hava kanalı", "Çift yönlü tambur", "Kırışıklık önleme", "Su haznesi", "Tahliye bağlantısı", "Kontrol kartı", "Soğutucu akışkan", "Kapı contası", "Ses yalıtımı", "Tambur aydınlatması"],
  firinlar: ["Alt rezistans", "Üst rezistans", "Izgara rezistansı", "Turbo fan", "Halka rezistans", "Sıcaklık sensörü", "Termostat", "Üç katmanlı kapı camı", "Dört katmanlı kapı camı", "Isı yalıtımı", "Emaye pişirme haznesi", "Katalitik panel", "Pirolitik temizlik", "Buharlı pişirme", "Teleskopik ray", "Kapı menteşesi", "Kontrol kartı", "Dokunmatik panel", "Et probu", "Soğutma fanı"],
  klimalar: ["Rotary kompresör", "Twin rotary kompresör", "Inverter sürücü", "İç ünite eşanjörü", "Dış ünite eşanjörü", "Bakır boru", "Soğutucu akışkan", "Genleşme valfi", "İç ünite fanı", "Dış ünite fanı", "Fan motoru", "Sıcaklık sensörü", "Basınç sensörü", "Partikül filtresi", "Aktif karbon filtre", "Drenaj pompası", "Dış ünite kasası", "Titreşim takozu", "Wi-Fi modülü", "Defrost kontrolü"],
};

const contexts = {
  telefonlar: ["telefonun günlük hızını, dayanıklılığını veya kullanım hissini doğrudan etkileyen bir bileşendir", "Daha iyi tepki, dayanıklılık veya kullanım konforu sağlayabilir", "Kaliteli sürümü daha fazla alan, enerji veya üretim maliyeti gerektirebilir"],
  kameralar: ["görüntünün yakalanması, işlenmesi veya gövdenin güvenilir çalışması için kullanılan bir parçadır", "Çekim güvenilirliğini ve görüntü kalitesini artırabilir", "Hassas üretim, kalibrasyon ve dayanıklı malzeme maliyeti yükseltir"],
  televizyonlar: ["görüntü, ses veya bağlantı performansını belirleyen televizyon bileşenlerinden biridir", "Görüntü ve kullanım deneyimini daha tutarlı hale getirebilir", "Büyük yüzeylerde kalite kontrolü ve güçlü elektronik daha pahalıdır"],
  buzdolaplari: ["soğuğun üretilmesi, korunması veya dolap içinde dengeli dağıtılması için çalışır", "Gıdaların daha kararlı sıcaklıkta saklanmasına yardımcı olur", "Daha verimli ve dayanıklı çözüm ilk satın alma maliyetini artırabilir"],
  "camasir-makineleri": ["su, ısı ve tambur hareketinin güvenli biçimde yönetilmesine katkı sağlar", "Temizleme kalitesini, sessizliği veya makine ömrünü iyileştirebilir", "Dayanıklı mekanik parçalar ve sensörler üretim maliyetini yükseltir"],
  "bulasik-makineleri": ["suyun dolaştırılması, filtrelenmesi, ısıtılması veya bulaşığa yöneltilmesi için kullanılır", "Yıkama ve kurutma sonucunu daha tutarlı hale getirebilir", "Karmaşık su kanalları ve kaliteli parçalar bakım ile üretim maliyetini artırır"],
  "kurutma-makineleri": ["ısı ve hava akışını yöneterek kumaştaki nemin uzaklaştırılmasına yardım eder", "Enerji tüketimini veya kumaş bakımını iyileştirebilir", "Verimli ısı devresi ve hassas sensörler cihazı pahalılaştırabilir"],
  firinlar: ["pişirme haznesindeki ısının üretilmesi, ölçülmesi veya eşit dağıtılması için çalışır", "Daha dengeli pişirme ve güvenli yüzey sıcaklığı sağlayabilir", "Yüksek sıcaklığa dayanıklı malzeme ve kontrol elektroniği maliyetlidir"],
  klimalar: ["ısıyı iç ve dış ortam arasında güvenli ve verimli biçimde taşımaya katkı sağlar", "Daha sessiz, verimli ve kararlı iklimlendirme sağlayabilir", "Basınca dayanıklı devreler ve hassas inverter elektroniği maliyeti artırır"],
};

export const expansionTermGroups = Object.fromEntries(Object.entries(termTitles).map(([categorySlug, titles]) => {
  const [summary, advantage, disadvantage] = contexts[categorySlug];
  return [categorySlug, titles.map((title) => [
    `${categorySlug}-${slugify(title)}`, title,
    `${title}, ${summary}.`,
    `${title}, bir sistemde küçük görünen ama sonuç üzerinde belirgin etkisi olabilen görevli bir parça gibidir.`,
    advantage, disadvantage,
  ])];
}));

const guideTitles = {
  buzdolaplari: [["buzdolabi-fiyati", "Buzdolabı fiyatı nasıl okunur?"], ["hacim-ve-verim", "Hacim ve enerji verimliliği dengesi"], ["sogutma-sistemi-secimi", "Soğutma sistemi seçimi"]],
  "camasir-makineleri": [["camasir-makinesi-fiyati", "Çamaşır makinesi fiyatı nasıl okunur?"], ["kapasite-ve-motor", "Kapasite ve motor seçimi"], ["sessiz-camasir-makinesi", "Sessiz ve dayanıklı makine seçimi"]],
  "bulasik-makineleri": [["bulasik-makinesi-fiyati", "Bulaşık makinesi fiyatı nasıl okunur?"], ["kurutma-sistemleri", "Kurutma sistemlerini karşılaştırma"], ["sepet-ve-pompa", "Sepet, pompa ve püskürtme rehberi"]],
  "kurutma-makineleri": [["kurutma-makinesi-fiyati", "Kurutma makinesi fiyatı nasıl okunur?"], ["isi-pompasi-secimi", "Isı pompalı kurutucu seçimi"], ["kumas-bakimi", "Kumaş bakımı ve sensörler"]],
  firinlar: [["firin-fiyati", "Fırın fiyatı nasıl okunur?"], ["pisirme-sistemleri", "Pişirme sistemleri rehberi"], ["temizlik-ve-yalitim", "Temizlik ve yalıtım seçimi"]],
  klimalar: [["klima-fiyati", "Klima fiyatı nasıl okunur?"], ["kapasite-ve-verim", "Kapasite ve verimlilik seçimi"], ["sessiz-klima", "Sessiz klima ve doğru montaj"]],
};

export const expansionGuideSpecs = Object.fromEntries(Object.entries(guideTitles).map(([slug, items]) => [slug, items.map(([guideSlug, title]) => [guideSlug, title, `${title} konusunda parçaları, enerji giderini, kullanım ihtiyacını ve uzun vadeli servis maliyetini birlikte değerlendir.`])]));

const factorTitles = {
  telefonlar: ["İşlemci ve SoC", "Kamera modülü", "Ekran camı", "Batarya hücresi", "Kasa malzemesi", "RAM yongaları", "Depolama yongası", "Soğutma sistemi", "Anten ve modem", "Titreşim motoru"],
  kameralar: ["Görüntü sensörü", "Lens elemanları", "Mekanik obtüratör", "Gövde sızdırmazlığı", "Görüntü işlemcisi"],
  televizyonlar: ["Panel üretimi", "Arka aydınlatma", "Görüntü işlemcisi", "Hoparlör sistemi", "Bağlantı kartı"],
  buzdolaplari: ["Kompresör", "Yalıtım malzemesi", "Soğutma devresi", "Raf ve çekmeceler", "Sensör ve kontrol kartı"],
  "camasir-makineleri": ["Motor", "Tambur ve kazan", "Rulman ve amortisör", "Pompa ve valfler", "Kontrol elektroniği"],
  "bulasik-makineleri": ["Sirkülasyon pompası", "Püskürtme sistemi", "Kazan ve sepetler", "Kurutma sistemi", "Filtre ve sensörler"],
  "kurutma-makineleri": ["Isı pompası devresi", "Tambur ve motor", "Nem sensörleri", "Filtre ve hava kanalı", "Kompresör"],
  firinlar: ["Rezistans grubu", "Yalıtım", "Kapı camı", "Fan sistemi", "Kontrol elektroniği"],
  klimalar: ["Kompresör", "İnverter kartı", "Eşanjör", "Bakır boru ve akışkan", "Fan ve filtre sistemi"],
};

export const expansionFactorSpecs = Object.entries(factorTitles).flatMap(([categorySlug, titles]) => titles.map((title) => ({
  slug: `${categorySlug.replace(/lar$|leri$/g, "")}-${slugify(title)}-maliyeti`,
  title: `${title} maliyeti`,
  shortDescription: `${title}, ürünün performansını ve dayanıklılığını doğrudan etkileyen somut maliyet kalemlerinden biridir. Kalite, kapasite ve üretim hassasiyeti arttıkça fiyat yükselir.`,
  impact: "orta",
  categorySlugs: [categorySlug],
})));

const requiredPhoneSlugs = {
  "İşlemci ve SoC": "telefon-islemci-maliyeti",
  "Kamera modülü": "telefon-kamera-modulu",
  "Ekran camı": "telefon-ekran-cami",
  "Batarya hücresi": "telefon-batarya-hucresi",
  "Kasa malzemesi": "telefon-kasa-malzemesi",
};
for (const factor of expansionFactorSpecs) {
  if (factor.categorySlugs[0] === "telefonlar" && requiredPhoneSlugs[factor.title.replace(" maliyeti", "")]) {
    factor.slug = requiredPhoneSlugs[factor.title.replace(" maliyeti", "")];
  }
}

export const expansionReviewedAt = reviewedAt;
