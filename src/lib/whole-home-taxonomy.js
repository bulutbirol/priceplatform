import { productTermTitles } from "./product-term-profiles.js";

const reviewedAt = "2026-07-11";

function parseProducts(value) {
  return value.split("|").map((item) => {
    const [slug, title] = item.split(":");
    return { slug, title };
  });
}

export const categoryGroups = [
  ["personal-tech", "kisisel-teknoloji", "Kişisel Teknoloji", "Telefonlardan oyun konsollarına kişisel elektronik ürünler.", "telefonlar:Telefon|tabletler:Tablet|dizustu-bilgisayarlar:Dizüstü Bilgisayar|masaustu-bilgisayarlar:Masaüstü Bilgisayar|monitorler:Monitör|kameralar:Kamera|kulakliklar:Kulaklık|akilli-saatler:Akıllı Saat|oyun-konsollari:Oyun Konsolu"],
  ["entertainment", "goruntu-eglence", "Görüntü ve Eğlence", "Evde görüntü, ses ve medya deneyimi sunan ürünler.", "televizyonlar:Televizyon|projeksiyonlar:Projeksiyon|soundbarlar:Soundbar|hoparlorler:Hoparlör|medya-oynaticilar:Medya Oynatıcı"],
  ["major-appliances", "buyuk-ev-aletleri", "Büyük Ev Aletleri", "Uzun ömürlü mutfak, çamaşır ve iklimlendirme cihazları.", "buzdolaplari:Buzdolabı|dondurucular:Dondurucu|camasir-makineleri:Çamaşır Makinesi|kurutma-makineleri:Kurutma Makinesi|bulasik-makineleri:Bulaşık Makinesi|firinlar:Fırın|ocaklar:Ocak|davlumbazlar:Davlumbaz|klimalar:Klima"],
  ["small-kitchen", "kucuk-mutfak-aletleri", "Küçük Mutfak Aletleri", "Hazırlama, pişirme ve içecek cihazları.", "airfryerlar:Airfryer|mikrodalgalar:Mikrodalga|kahve-makineleri:Kahve Makinesi|kettlelar:Kettle|tost-makineleri:Tost Makinesi|blenderlar:Blender|mikserler:Mikser|mutfak-robotlari:Mutfak Robotu|ekmek-yapma-makineleri:Ekmek Yapma Makinesi|su-aritma-cihazlari:Su Arıtma Cihazı"],
  ["clean-air", "temizlik-hava", "Temizlik ve Hava", "Temizlik, ütüleme ve iç hava kalitesi ürünleri.", "elektrikli-supurgeler:Elektrikli Süpürge|robot-supurgeler:Robot Süpürge|dikey-supurgeler:Dikey Süpürge|buharli-temizleyiciler:Buharlı Temizleyici|utuler:Ütü|hava-temizleyiciler:Hava Temizleyici|nemlendiriciler:Nemlendirici|nem-alicilar:Nem Alıcı|vantilatorler:Vantilatör"],
  ["smart-security", "akilli-ev-guvenlik", "Akıllı Ev ve Güvenlik", "Bağlantı, otomasyon ve ev güvenliği sistemleri.", "modemler:Modem|mesh-wifi-sistemleri:Mesh Wi-Fi|akilli-prizler:Akıllı Priz|akilli-ampuller:Akıllı Ampul|termostatlar:Termostat|guvenlik-kameralari:Güvenlik Kamerası|alarm-sistemleri:Alarm Sistemi|goruntulu-ziller:Görüntülü Zil|akilli-kilitler:Akıllı Kilit|ev-sensorleri:Ev Sensörleri"],
  ["energy", "enerji-sistemleri", "Enerji Sistemleri", "Evde elektrik üretme, depolama ve yönetme ürünleri.", "gunes-panelleri:Güneş Paneli|inverterler:İnverter|ev-bataryalari:Ev Tipi Batarya|ups-cihazlari:UPS|elektrikli-arac-sarj-cihazlari:Elektrikli Araç Şarj Cihazı|enerji-olcerler:Enerji Ölçer"],
  ["personal-care", "kisisel-bakim", "Kişisel Bakım", "Günlük bakım, sağlık takibi ve konfor cihazları.", "sac-kurutma-makineleri:Saç Kurutma Makinesi|sac-sekillendiriciler:Saç Şekillendirici|tiras-makineleri:Tıraş Makinesi|epilatorler:Epilatör|elektrikli-dis-fircalari:Elektrikli Diş Fırçası|akilli-baskuller:Akıllı Baskül|masaj-cihazlari:Masaj Cihazı"],
  ["workshop-garden", "ev-atolye-bahce", "Ev, Atölye ve Bahçe", "Onarım, üretim, temizlik ve bahçe bakım ekipmanları.", "dikis-makineleri:Dikiş Makinesi|matkaplar:Matkap|vidalamalar:Vidalama|basincli-yikama-makineleri:Basınçlı Yıkama Makinesi|cim-bicme-makineleri:Çim Biçme Makinesi|su-pompalari:Su Pompası|otomatik-sulama-sistemleri:Otomatik Sulama Sistemi"],
].map(([id, slug, title, description, products], position) => ({ id: `group-${id}`, slug, locale: "tr", title, description, position, products: parseProducts(products) }));

const establishedSlugs = new Set(["telefonlar", "kameralar", "televizyonlar", "buzdolaplari", "camasir-makineleri", "bulasik-makineleri", "kurutma-makineleri", "firinlar", "klimalar"]);

export const productCategoryGroupBySlug = Object.fromEntries(categoryGroups.flatMap((group) => group.products.map((product) => [product.slug, group.slug])));

export const wholeHomeCategories = categoryGroups.flatMap((group) => group.products
  .filter((product) => !establishedSlugs.has(product.slug))
  .map((product, index) => ({
    id: `category-home-${group.position + 1}-${index + 1}`,
    slug: product.slug,
    locale: "tr",
    title: product.title,
    eyebrow: group.title,
    shortDescription: `${product.title} fiyatını belirleyen parçaları, teknolojileri, yazılımı ve uzun vadeli maliyetleri öğren.`,
    body: `${product.title}; donanım kalitesi, kontrol elektroniği, enerji verimliliği, yazılım desteği, bakım ihtiyacı ve servis yapısıyla birlikte değerlendirilmelidir.`,
    icon: "box",
    color: ["coral", "blue", "lime", "amber", "teal", "pink"][(group.position + index) % 6],
    image: null,
    groupSlug: group.slug,
  })));

function slugify(value) {
  return value.toLocaleLowerCase("tr-TR").replaceAll("ç", "c").replaceAll("ğ", "g").replaceAll("ı", "i").replaceAll("ö", "o").replaceAll("ş", "s").replaceAll("ü", "u").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const wholeHomeTermGroups = {};
export const wholeHomeFactorSpecs = [];
export const wholeHomeGuideSpecs = {};

for (const group of categoryGroups) {
  const newProducts = group.products.filter((product) => !establishedSlugs.has(product.slug));
  if (!newProducts.length) continue;
  for (const product of newProducts) {
    const titles = productTermTitles(product.slug);
    wholeHomeTermGroups[product.slug] = titles.map((title) => [
      `${product.slug}-${slugify(title)}`, title,
      `${title}, ${product.title.toLocaleLowerCase("tr-TR")} ürününün çalışma biçimi, güvenliği, performansı veya kullanım ömrü üzerinde etkili olan bir teknoloji başlığıdır.`,
      `${title}, ürünün içinde belirli bir işi üstlenen uzman bir parça veya sistem gibi düşünülebilir.`,
      `${title} doğru tasarlandığında daha tutarlı performans, güvenlik veya kullanım kolaylığı sağlayabilir.`,
      `${title} için daha iyi malzeme, hassas üretim, ek elektronik veya bakım gereksinimi maliyeti artırabilir.`,
    ]);
    titles.forEach((title) => wholeHomeFactorSpecs.push({
      slug: `${product.slug}-${slugify(title)}-maliyeti`,
      title: `${title} maliyeti`,
      shortDescription: `${title}; parça sınıfı, kapasite, malzeme, üretim toleransı ve test gereksinimine göre ${product.title.toLocaleLowerCase("tr-TR")} fiyatını değiştirir.`,
      impact: "orta",
      categorySlugs: [product.slug],
    }));
  }

  for (const product of newProducts) wholeHomeGuideSpecs[product.slug] = [
    [`${product.slug}-fiyat-rehberi`, `${product.title} fiyatı nasıl okunur?`, `${product.title} fiyatını belirleyen donanım, yazılım, enerji ve servis kalemlerini birlikte değerlendir.`],
    [`${product.slug}-secim-rehberi`, `Doğru ${product.title.toLocaleLowerCase("tr-TR")} nasıl seçilir?`, `Kullanım ihtiyacını teknik özelliklerle eşleştir ve gereksiz özelliklere fazla ödeme yapma.`],
    [`${product.slug}-bakim-rehberi`, `${product.title} bakım ve kullanım ömrü`, `Temizlik, sarf malzemesi, yazılım, enerji ve servis adımlarıyla ürünün ömrünü uzat.`],
  ];
}

export const wholeHomeReviewedAt = reviewedAt;
