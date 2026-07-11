const reviewedAt = "2026-07-11";

function slugify(value) {
  return value.toLocaleLowerCase("tr-TR")
    .replaceAll("ç", "c").replaceAll("ğ", "g").replaceAll("ı", "i").replaceAll("ö", "o").replaceAll("ş", "s").replaceAll("ü", "u")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const titles = {
  telefonlar: "Grafik işlemci|Yapay zekâ hızlandırıcısı|Görüntü sinyal işlemcisi|Güç yönetim çipi|Ana kart katmanları|LPDDR bellek standardı|NAND flash hücresi|USB denetleyicisi|Wi-Fi çipi|Bluetooth modülü|NFC anteni|GNSS alıcısı|Yakınlık sensörü|Ortam ışığı sensörü|Jiroskop|İvmeölçer|Barometre|Parmak izi okuyucu|Yüz tanıma sensörü|Ahize hoparlörü|Stereo hoparlör|MEMS mikrofon|Lineer titreşim motoru|Grafit ısı yayıcı|Buhar odası|Kablosuz şarj bobini|Şarj portu|Su geçirmez conta|Arka kapak malzemesi|Kamera lens kaplaması",
  kameralar: "Tam kare sensör|APS-C sensör|Micro Four Thirds|Sensör okuma hızı|Rolling shutter|Global shutter|Faz algılamalı netleme|Kontrast algılamalı netleme|Netleme motoru|Düşük geçiren filtre|Sensör temizleme sistemi|Mikrolens dizisi|Renk filtresi dizisi|ADC dönüştürücü|Tampon bellek|Çift kart yuvası|CFexpress kart|SD UHS-II|Magnezyum alaşım gövde|Polikarbon gövde|Deklanşör ömrü|Perde senkron hızı|Flaş kızağı|Mikrofon girişi|Kulaklık çıkışı|HDMI çıkışı|USB güç beslemesi|Soğutma fanı|Döner ekran menteşesi|Batarya kapasitesi",
  televizyonlar: "OLED panel|QD-OLED panel|MicroLED|Edge LED|Direct LED|FALD arka aydınlatma|Mini LED sürücü|Kuantum nokta filmi|Polarize katman|Renk filtresi|T-CON kartı|Güç kaynağı kartı|Ana işlemci kartı|MEMC hareket işleme|Ton eşleme|Parlaklık sensörü|Otomatik kalibrasyon|Filmmaker Mode|eARC|ALLM|Wi-Fi 6 bağlantısı|Bluetooth ses|Dahili tuner|Uydu alıcısı|Subwoofer|Akustik yüzey sesi|Metal arka kasa|İnce çerçeve üretimi|Duvar montaj yapısı|Uzaktan kumanda mikrofonu",
  buzdolaplari: "Lineer kompresör|Scroll kompresör|Kompresör kalkış rölesi|Termal sigorta|Kılcal boru|Elektronik genleşme valfi|Bakır kondenser borusu|Alüminyum evaporatör|Drenaj ısıtıcısı|Defrost rezistansı|Defrost sensörü|Hava damperi|Çoklu hava kanalı|Kapı açık sensörü|İç aydınlatma LED'i|Su filtresi|Buz kırma motoru|Vakum bölmesi|Sıfır derece bölmesi|Hızlı dondurma|Hızlı soğutma|Tatil modu|Enerji tüketim ölçümü|Kompresör ses yalıtımı|Arka duvar kaplaması|Paslanmaz çelik kapı|Parmak izi önleyici yüzey|Ayarlanabilir raf mekanizması|Tekerlekli gövde ayağı|Akıllı arıza teşhisi",
  "camasir-makineleri": "Asenkron motor|Universal motor|Motor sürücü kartı|Tambur paleti|Kazan contası|Körük lastiği|Rulman keçesi|Kasnak|Tahrik kayışı|Süspansiyon yayı|Beton denge taşı|Pompa filtresi|Acil tahliye hortumu|Aquastop valfi|Debimetre|Sıcaklık sensörü|Motor hız sensörü|Dengesiz yük algılama|Çocuk kilidi|Dokunmatik kontrol paneli|Program seçici|Deterjan çekmecesi|Yumuşatıcı sifonu|Leke programı|Hızlı yıkama|Ek durulama|Kazan temizleme|Sıkma verimliliği|Su sıcaklığı kontrolü|Uzaktan arıza teşhisi",
  "bulasik-makineleri": "Fırçasız pompa motoru|Pompa salyangozu|Üst püskürtme nozulu|Alt püskürtme nozulu|Tavan püskürtücüsü|Kendi kendini temizleyen filtre|Mikro filtre|Tuz haznesi|Parlatıcı haznesi|İyon değiştirici|Su giriş hortumu|Aquastop sistemi|Kapı yayı|Kapı contası|Paslanmaz çelik taban|Plastik taban|Çatal kaşık çekmecesi|Bardak tutucu|Yoğun yıkama bölgesi|Yarım yük algılama|Otomatik program|Eko program|Hijyen programı|Kalan süre göstergesi|Zemin ışığı|Kurutma fanı|Yoğuşmalı kurutma|Kapı kilidi|Taşma şamandırası|Wi-Fi bağlantısı",
  "kurutma-makineleri": "Rezistanslı kurutma|Yoğuşmalı kurutma|Isı eşanjörü|Elektronik genleşme valfi|Kompresör sürücü kartı|Hava fanı|Fan motoru|Tambur rulmanı|Tambur keçesi|Tahrik kayışı|Kayış gergisi|Kondens pompası|Su seviye şamandırası|Filtre doluluk sensörü|Kurutma seviyesi seçimi|Hassas kurutma|Yün sepeti|Hızlı kurutma|Havalandırma programı|Koku giderme|Çocuk kilidi|Program erteleme|Enerji tüketim göstergesi|Kapı yönü değiştirme|Titreşim azaltma|Kırışıklık savurma|Düşük sıcaklık kontrolü|Kondenser otomatik temizleme|Akıllı arıza teşhisi|Dış gövde yalıtımı",
  firinlar: "Konveksiyon pişirme|Statik pişirme|Alt üst ısıtma|Fan destekli ızgara|Pizza modu|Düşük sıcaklık pişirme|Hamur mayalama|Air Fry modu|Mikrodalga destekli fırın|Sıcaklık probu|Buhar jeneratörü|Su haznesi|Kireç çözme programı|Çıkarılabilir kapı camı|Yumuşak kapanan kapı|Çocuk kilidi|Kapı sıcaklığı kontrolü|Hızlı ön ısıtma|Çok seviyeli pişirme|Otomatik tarif programı|Renkli ekran|Mekanik zamanlayıcı|Elektronik zamanlayıcı|Wi-Fi uzaktan kontrol|Enerji sınıfı|Hazne hacmi|Fırın içi aydınlatma|Yan raf sistemi|Emniyet termostatı|Duman ve koku filtresi",
  klimalar: "Scroll kompresör|DC inverter motor|AC fan motoru|Elektronik genleşme valfi|Dört yollu vana|Akümülatör|Kurutucu filtre|Servis vanası|Bakır boru kalınlığı|Alüminyum kanat kaplaması|Korozyon önleyici kaplama|Karter ısıtıcısı|Dış ortam sensörü|Boru sıcaklık sensörü|Akım sensörü|Hava kalite sensörü|İyonizer|UV-C lamba|Yüksek yoğunluklu hava filtresi|Kendi kendini temizleme|İç ünite kurutma|Uyku modu|Sessiz mod|Turbo mod|Nem alma modu|Hava yönlendirme kanadı|Çift kanat kontrolü|Taze hava girişi|Dış ünite ses yalıtımı|Akıllı enerji takibi",
};

const categoryCopy = {
  telefonlar: ["telefonun elektronik ve mekanik sistemlerinde belirli bir görevi üstlenir", "günlük hız, bağlantı veya dayanıklılık deneyimini iyileştirebilir", "daha gelişmiş sürümü kart alanı, enerji ve üretim maliyeti ekler"],
  kameralar: ["ışığın görüntüye dönüşmesi veya çekimin güvenilir kaydedilmesi sürecinde görev alır", "çekim hızını, kontrolü ya da görüntü tutarlılığını artırabilir", "hassas kalibrasyon ve dayanıklı parça gereksinimi fiyatı yükseltir"],
  televizyonlar: ["görüntü, ses, bağlantı veya güç yönetimi zincirinin bir parçasıdır", "izleme deneyimini daha tutarlı ve kullanışlı hale getirebilir", "büyük panel ölçeğinde kalite kontrolü ve elektronik maliyeti artar"],
  buzdolaplari: ["soğutma çevriminin, hava yönetiminin veya saklama alanının bir parçasıdır", "sıcaklık kararlılığına, enerji verimine veya kullanım kolaylığına katkı sağlar", "dayanıklı ve verimli çözüm daha pahalı malzeme ve kontrol gerektirir"],
  "camasir-makineleri": ["yıkama sırasında suyu, ısıyı, yükü veya tambur hareketini yönetir", "temizlik, sessizlik veya makine ömrünü iyileştirebilir", "aşınmaya dayanıklı mekanik parça ve sensör maliyeti yükseltir"],
  "bulasik-makineleri": ["suyun dolaşımı, filtrelenmesi, dozajı veya kurutulmasında görev alır", "yıkama sonucunu ve kullanım kolaylığını geliştirebilir", "karmaşık su yolu ve kaliteli malzeme üretim ile bakım maliyeti ekler"],
  "kurutma-makineleri": ["ısı, hava, nem veya tambur hareketini kontrol eden kurutma sisteminin parçasıdır", "kumaş bakımını, enerji verimini veya program doğruluğunu artırabilir", "sensörlü ve verimli çözüm ilk satın alma fiyatını yükseltebilir"],
  firinlar: ["pişirme ısısını üretmek, ölçmek, dağıtmak veya güvenli tutmak için kullanılır", "pişirme eşitliğini, kontrolü veya temizlik kolaylığını geliştirebilir", "yüksek sıcaklığa dayanıklı malzeme ve güvenlik elektroniği maliyetlidir"],
  klimalar: ["soğutucu çevrim, hava akışı, filtreleme veya kontrol zincirinde görev yapar", "verimlilik, sessizlik veya iç hava konforuna katkı sağlayabilir", "basınca dayanıklı devre ve hassas elektronik fiyatı yükseltir"],
};

export const scaleTermGroups = Object.fromEntries(Object.entries(titles).map(([categorySlug, value]) => {
  const [purpose, advantage, disadvantage] = categoryCopy[categorySlug];
  return [categorySlug, value.split("|").map((title, index) => [
    `${categorySlug}-ileri-${slugify(title)}`, title,
    `${title}, ${purpose}.`,
    `${title}, büyük bir sistemde tek işi doğru yapan uzman bir görevli gibi düşünülebilir.`,
    `${title}; ${advantage}.`,
    `${title}; ${disadvantage}.`,
    index % 5 + 1,
  ])];
}));

const guideAdditions = {
  telefonlar: [["telefon-bakim-omur", "Telefonun kullanım ömrünü uzatmak"], ["telefonda-gereksiz-ozellik", "Telefonda hangi özelliklere fazla ödeme yapmamalı?"]],
  kameralar: [["kamera-bakim-omur", "Kamera ve lens bakım rehberi"], ["kamerada-gereksiz-ozellik", "Kamerada gereksiz özellik maliyetleri"]],
  televizyonlar: [["tv-bakim-omur", "Televizyonun panel ömrünü korumak"], ["tv-gereksiz-ozellik", "Televizyonda neye fazla ödeme yapmamalı?"]],
  buzdolaplari: [["buzdolabi-bakim-omur", "Buzdolabı bakım ve ömür rehberi"], ["buzdolabi-gereksiz-ozellik", "Buzdolabında gereksiz özellikler"]],
  "camasir-makineleri": [["camasir-bakim-omur", "Çamaşır makinesi bakım rehberi"], ["camasir-gereksiz-ozellik", "Çamaşır makinesinde gereksiz maliyetler"]],
  "bulasik-makineleri": [["bulasik-bakim-omur", "Bulaşık makinesi bakım rehberi"], ["bulasik-gereksiz-ozellik", "Bulaşık makinesinde gereksiz özellikler"]],
  "kurutma-makineleri": [["kurutma-bakim-omur", "Kurutma makinesi bakım rehberi"], ["kurutma-gereksiz-ozellik", "Kurutma makinesinde gereksiz maliyetler"]],
  firinlar: [["firin-bakim-omur", "Fırın bakım ve kullanım ömrü"], ["firin-gereksiz-ozellik", "Fırında gereksiz özellik maliyetleri"]],
  klimalar: [["klima-bakim-omur", "Klima bakım ve verim rehberi"], ["klima-gereksiz-ozellik", "Klimada gereksiz özellik maliyetleri"]],
};

export const scaleGuideSpecs = Object.fromEntries(Object.entries(guideAdditions).map(([slug, items]) => [slug, items.map(([guideSlug, title]) => [guideSlug, title, `${title}; parça aşınmasını, enerji tüketimini, temizliği, servis ihtiyacını ve gerçek kullanım değerini basit adımlarla açıklar.`])]));

export const scaleFactorSpecs = Object.entries(titles).flatMap(([categorySlug, value]) => {
  const required = categorySlug === "telefonlar" ? 10 : 15;
  return value.split("|").slice(0, required).map((title) => ({
    slug: `${categorySlug}-ileri-${slugify(title)}-maliyeti`,
    title: `${title} maliyeti`,
    shortDescription: `${title}; malzeme sınıfı, kapasite, üretim toleransı, test süresi ve tedarik hacmine göre ürünün parça maliyetini değiştirir.`,
    impact: "orta",
    categorySlugs: [categorySlug],
  }));
});

export const scaleReviewedAt = reviewedAt;
