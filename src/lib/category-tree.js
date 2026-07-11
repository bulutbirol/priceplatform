import { categoryGroups } from "./whole-home-taxonomy.js";

const familySpecs = {
  "kisisel-teknoloji": [
    ["mobil-giyilebilir", "Mobil ve Giyilebilir", "telefonlar|tabletler|akilli-saatler"],
    ["bilgisayar-sistemleri", "Bilgisayar Sistemleri", "dizustu-bilgisayarlar|masaustu-bilgisayarlar|mini-pcler|hepsi-bir-arada-bilgisayarlar"],
    ["bilgisayar-donanimi", "Bilgisayar Donanımı", "islemciler|ekran-kartlari|anakartlar|ram-bellekler|ssdler|guc-kaynaklari|bilgisayar-kasalari|islemci-sogutuculari"],
    ["cevre-birimleri", "Çevre Birimleri", "monitorler|klavyeler|fareler|web-kameralari|yazicilar"],
    ["depolama-baglanti", "Depolama ve Bağlantı", "harici-depolama|dock-istasyonlari"],
    ["fotograf-ses-oyun", "Fotoğraf, Ses ve Oyun", "kameralar|kulakliklar|oyun-konsollari"],
  ],
  "goruntu-eglence": [
    ["goruntu-sistemleri", "Görüntü Sistemleri", "televizyonlar|projeksiyonlar|medya-oynaticilar"],
    ["ev-ses-sistemleri", "Ev Ses Sistemleri", "soundbarlar|hoparlorler"],
  ],
  "buyuk-ev-aletleri": [
    ["sogutma", "Soğutma", "buzdolaplari|dondurucular"],
    ["camasir-bakimi", "Çamaşır Bakımı", "camasir-makineleri|kurutma-makineleri"],
    ["bulasik-yikama", "Bulaşık Yıkama", "bulasik-makineleri"],
    ["pisirme", "Pişirme", "firinlar|ocaklar|davlumbazlar"],
    ["iklimlendirme", "İklimlendirme", "klimalar"],
  ],
  "kucuk-mutfak-aletleri": [
    ["tezgah-ustu-pisirme", "Tezgâh Üstü Pişirme", "airfryerlar|mikrodalgalar|tost-makineleri|ekmek-yapma-makineleri"],
    ["icecek-su", "İçecek ve Su", "kahve-makineleri|kettlelar|su-aritma-cihazlari"],
    ["hazirlama", "Hazırlama", "blenderlar|mikserler|mutfak-robotlari"],
  ],
  "temizlik-hava": [
    ["zemin-temizligi", "Zemin Temizliği", "elektrikli-supurgeler|robot-supurgeler|dikey-supurgeler|buharli-temizleyiciler"],
    ["giysi-bakimi", "Giysi Bakımı", "utuler"],
    ["hava-nem", "Hava ve Nem", "hava-temizleyiciler|nemlendiriciler|nem-alicilar|vantilatorler"],
  ],
  "akilli-ev-guvenlik": [
    ["ev-agi", "Ev Ağı", "modemler|mesh-wifi-sistemleri"],
    ["otomasyon", "Otomasyon ve Kontrol", "akilli-prizler|akilli-ampuller|termostatlar"],
    ["guvenlik", "Güvenlik", "guvenlik-kameralari|alarm-sistemleri|goruntulu-ziller|akilli-kilitler|ev-sensorleri"],
  ],
  "enerji-sistemleri": [
    ["uretim-donusum", "Üretim ve Dönüşüm", "gunes-panelleri|inverterler"],
    ["depolama-yedekleme", "Depolama ve Yedekleme", "ev-bataryalari|ups-cihazlari"],
    ["sarj-olcum", "Şarj ve Ölçüm", "elektrikli-arac-sarj-cihazlari|enerji-olcerler"],
  ],
  "kisisel-bakim": [
    ["sac-bakimi", "Saç Bakımı", "sac-kurutma-makineleri|sac-sekillendiriciler"],
    ["tiras-epilasyon", "Tıraş ve Epilasyon", "tiras-makineleri|epilatorler"],
    ["agiz-saglik-konfor", "Ağız Bakımı, Sağlık ve Konfor", "elektrikli-dis-fircalari|akilli-baskuller|masaj-cihazlari"],
  ],
  "ev-atolye-bahce": [
    ["ev-atolyesi", "Ev Atölyesi", "dikis-makineleri|matkaplar|vidalamalar"],
    ["dis-alan-temizligi", "Dış Alan Temizliği", "basincli-yikama-makineleri"],
    ["bahce-sulama", "Bahçe ve Sulama", "cim-bicme-makineleri|su-pompalari|otomatik-sulama-sistemleri"],
  ],
};

export const categoryTree = categoryGroups.map((group) => {
  const productsBySlug = new Map(group.products.map((product) => [product.slug, product]));
  return {
    slug: group.slug,
    title: group.title,
    description: group.description,
    families: familySpecs[group.slug].map(([slug, title, productSlugs]) => ({
      slug,
      title,
      products: productSlugs.split("|").map((productSlug) => productsBySlug.get(productSlug)),
    })),
  };
});
