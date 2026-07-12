const reviewedAt = "2026-07-12";

const featureGroups = {
  telefonlar: [
    ["islemci", "İşlemci", "Telefonun genel hızını, kamera işlemesini ve enerji verimliliğini etkiler.", ["Snapdragon", "Dimensity", "Apple A serisi", "Exynos"], "yüksek", "yüksek", "Uzun süre kullanmak veya oyun oynamak isteyenler işlemci nesline bakmalı.", ["soc", "çip", "chipset", "telefon işlemcisi"]],
    ["ram", "RAM", "Aynı anda açık tutulan uygulamalar için kullanılan kısa süreli bellektir.", ["6 GB", "8 GB", "12 GB", "16 GB"], "orta", "orta", "8 GB çoğu kullanıcı için yeterlidir; yüksek değer tek başına hız garantisi değildir.", ["bellek", "hafıza", "8 gb ram", "12 gb ram"]],
    ["depolama", "Depolama", "Uygulama, fotoğraf ve videoların saklandığı kalıcı alandır.", ["128 GB", "256 GB", "512 GB", "1 TB"], "orta", "yüksek", "Çok video çekenler için 256 GB ve üzeri daha rahat olabilir.", ["kapasite", "telefon hafızası", "storage", "256 gb"]],
    ["ekran-turu", "Ekran türü", "Panel teknolojisi kontrastı, parlaklığı ve güç tüketimini değiştirir.", ["LCD", "OLED", "AMOLED", "LTPO OLED"], "yüksek", "yüksek", "OLED görüntü kalitesini artırır; LTPO daha çok üst sınıf cihazlarda anlamlıdır.", ["oled", "amoled", "lcd", "panel"]],
    ["yenileme-hizi", "Ekran yenileme hızı", "Ekranın görüntüyü saniyede kaç kez yenilediğini belirtir.", ["60 Hz", "90 Hz", "120 Hz", "144 Hz"], "orta", "orta", "120 Hz akıcılığı artırır; temel kullanımda 60 veya 90 Hz yeterli olabilir.", ["hz", "120hz", "120 hz", "refresh rate"]],
    ["kamera", "Kamera", "Sensör, lens ve görüntü işleme birlikte fotoğraf kalitesini belirler.", ["12 MP", "48 MP", "50 MP", "200 MP"], "yüksek", "orta", "Megapiksel sayısı tek başına kalite ölçüsü değildir; sensör ve lens de önemlidir.", ["megapiksel", "mp", "50 mp", "telefon kamerası"]],
    ["batarya", "Batarya", "Kapasite ve işlemci verimliliği günlük kullanım süresini birlikte belirler.", ["4000 mAh", "5000 mAh", "6000 mAh"], "orta", "yüksek", "mAh değerini ekran ve işlemci verimliliğiyle birlikte değerlendirin.", ["pil", "mah", "5000 mah", "battery"]],
  ],
  "dizustu-bilgisayarlar": [
    ["islemci", "İşlemci", "Programların çalışma hızını ve pil tüketimini belirleyen ana bileşendir.", ["Intel Core", "AMD Ryzen", "Apple M", "Snapdragon X"], "yüksek", "yüksek", "İşlemci serisinden önce nesline ve güç sınıfına bakın.", ["cpu", "ryzen", "intel core", "apple m"]],
    ["ram", "RAM", "Açık programların ve tarayıcı sekmelerinin kullandığı bellektir.", ["8 GB", "16 GB", "32 GB", "64 GB"], "orta", "yüksek", "16 GB genel kullanım için güvenli başlangıçtır; yükseltilebilir olup olmadığını kontrol edin.", ["bellek", "16 gb ram", "memory"]],
    ["ssd", "SSD kapasitesi", "İşletim sistemi, programlar ve dosyalar bu hızlı depolamada tutulur.", ["256 GB", "512 GB", "1 TB", "2 TB"], "orta", "yüksek", "512 GB çoğu kullanıcı için dengelidir; ikinci yuva fiyat farkından daha değerli olabilir.", ["depolama", "nvme", "512 gb ssd", "disk"]],
    ["ekran-karti", "Ekran kartı", "Oyun, üç boyutlu işler ve bazı üretim yazılımlarını hızlandırır.", ["Tümleşik", "GeForce RTX", "Radeon RX"], "yüksek", "orta", "Oyun veya profesyonel grafik işi yoksa güçlü harici ekran kartına para vermeyin.", ["gpu", "grafik kartı", "rtx", "harici ekran kartı"]],
    ["ekran", "Ekran", "Panel türü, çözünürlük, parlaklık ve renk doğruluğu birlikte değerlendirilir.", ["IPS", "OLED", "Full HD", "2.8K", "4K"], "yüksek", "yüksek", "Yüksek çözünürlükten önce yeterli parlaklık ve iyi panel arayın.", ["laptop ekranı", "ips", "oled", "çözünürlük"]],
    ["pil", "Pil kapasitesi", "Kapasite ve donanım verimliliği prizden uzak çalışma süresini belirler.", ["45 Wh", "60 Wh", "80 Wh", "99 Wh"], "orta", "yüksek", "Wh değerini bağımsız pil testleriyle birlikte değerlendirin.", ["batarya", "wh", "pil ömrü"]],
    ["agirlik", "Ağırlık ve kasa", "Malzeme, dayanıklılık ve taşınabilirlik fiyatı etkileyebilir.", ["Plastik", "Alüminyum", "Magnezyum alaşım"], "orta", "orta", "Her gün taşıyacaksanız ağırlık ve adaptörü birlikte hesaba katın.", ["kasa", "alüminyum", "kilogram", "hafif laptop"]],
  ],
  monitorler: [
    ["ekran-boyutu", "Ekran boyutu", "Köşeden köşeye inç cinsinden ölçülen görüntü alanıdır.", ["24 inç", "27 inç", "32 inç", "34 inç"], "orta", "yüksek", "Masa mesafesi ve çözünürlükle uyumlu boyut seçin.", ["inç", "27 inch", "27 inç", "boyut"]],
    ["cozunurluk", "Çözünürlük", "Ekrandaki toplam piksel sayısını ve görüntü keskinliğini belirler.", ["Full HD", "QHD", "4K UHD"], "yüksek", "yüksek", "27 inçte QHD çoğu kullanım için dengeli bir seçimdir.", ["1080p", "1440p", "qhd", "4k"]],
    ["panel", "Panel türü", "Renk, kontrast, görüş açısı ve tepki karakterini etkiler.", ["IPS", "VA", "TN", "OLED"], "yüksek", "yüksek", "Genel kullanımda IPS; derin siyah için VA veya OLED değerlendirilebilir.", ["ips panel", "va panel", "tn", "oled monitor"]],
    ["yenileme-hizi", "Yenileme hızı", "Monitörün saniyede gösterebildiği kare sayısını belirtir.", ["60 Hz", "75 Hz", "144 Hz", "240 Hz"], "orta", "orta", "Oyun oynamıyorsanız çok yüksek Hz için fazla ödeme yapmanız gerekmez.", ["hz", "144hz", "144 hz", "refresh rate"]],
    ["tepki-suresi", "Tepki süresi", "Piksellerin renk değiştirme hızını anlatan üretici ölçümüdür.", ["1 ms", "4 ms", "5 ms"], "düşük", "düşük", "Tek başına kutudaki 1 ms değerine göre karar vermeyin.", ["ms", "response time", "1 ms"]],
    ["parlaklik-hdr", "Parlaklık ve HDR", "Parlaklık kapasitesi aydınlık ortamı ve HDR etkisini belirler.", ["250 nit", "400 nit", "600 nit", "1000 nit"], "orta", "orta", "HDR etiketi yerine tepe parlaklığı ve yerel karartmaya bakın.", ["nit", "hdr", "displayhdr", "parlaklık"]],
    ["baglantilar", "Bağlantılar", "Görüntü girişleri ve USB özellikleri kullanım esnekliğini değiştirir.", ["HDMI", "DisplayPort", "USB-C", "Thunderbolt"], "orta", "orta", "Dizüstü kullanıyorsanız görüntü ve şarj taşıyan USB-C değerli olabilir.", ["hdmi", "displayport", "usb c", "type c"]],
  ],
  kameralar: [
    ["sensor", "Sensör boyutu", "Işığı toplayan yüzeyin boyutu görüntü karakterini ve gövde fiyatını etkiler.", ["Micro Four Thirds", "APS-C", "Full Frame", "Orta format"], "yüksek", "yüksek", "Full Frame her kullanıcı için gerekli değildir; lens maliyetini de hesaba katın.", ["aps-c", "full frame", "tam kare", "m43"]],
    ["megapiksel", "Megapiksel", "Fotoğrafın piksel sayısını ve kırpma payını etkiler.", ["20 MP", "24 MP", "33 MP", "45 MP", "60 MP"], "orta", "orta", "Büyük baskı veya yoğun kırpma yapmıyorsanız çok yüksek çözünürlük şart değildir.", ["mp", "çözünürlük", "24 mp", "45 mp"]],
    ["lens-sistemi", "Lens sistemi", "Uyumlu lenslerin çeşitliliği ve fiyatı uzun dönem maliyetini belirler.", ["Sabit lens", "Değiştirilebilir lens", "Kit lens"], "yüksek", "yüksek", "Gövde fiyatından önce ihtiyaç duyacağınız lenslerin toplamına bakın.", ["objektif", "lens mount", "bayonet", "kit lens"]],
    ["otomatik-netleme", "Otomatik netleme", "Hareketli konuları takip etme ve gözü bulma başarısını etkiler.", ["Kontrast AF", "Faz algılama", "Göz takibi"], "orta", "yüksek", "Spor, çocuk veya hayvan çekiyorsanız takip başarısı önemlidir.", ["autofocus", "af", "göz af", "faz algılama"]],
    ["stabilizasyon", "Görüntü sabitleme", "Elde çekimde titreşimin etkisini azaltır.", ["Lens içi", "Gövde içi IBIS", "Dijital"], "orta", "orta", "Düşük ışıkta ve videoda gövde içi sabitleme faydalıdır.", ["ibis", "ois", "titreşim engelleme"]],
    ["video", "Video özellikleri", "Çözünürlük, kare hızı, kayıt süresi ve kodek seçeneklerini kapsar.", ["4K 30p", "4K 60p", "4K 120p", "8K"], "yüksek", "orta", "Yalnızca 8K etiketine değil kırpma, ısınma ve kayıt sınırına bakın.", ["4k", "60 fps", "8k", "video kayıt"]],
    ["vizor-ekran", "Vizör ve ekran", "Kadraj kurma rahatlığını ve dış mekân kullanımını etkiler.", ["Elektronik vizör", "Optik vizör", "Hareketli ekran"], "orta", "orta", "Video ve farklı açılar için tam hareketli ekran kullanışlıdır.", ["evf", "vizör", "hareketli ekran", "lcd"]],
  ],
  televizyonlar: [
    ["ekran-boyutu", "Ekran boyutu", "İzleme mesafesine uygun görüntü alanını belirler.", ["43 inç", "55 inç", "65 inç", "75 inç", "85 inç"], "yüksek", "yüksek", "Bütçeyi görüntü kalitesiyle boyut arasında dengeleyin.", ["inç", "55 inch", "65 inç", "tv boyutu"]],
    ["panel", "Panel ve aydınlatma", "Siyah seviyesi, parlaklık ve görüş açısını belirleyen ana görüntü sistemidir.", ["LED", "Mini LED", "OLED", "QD-OLED"], "yüksek", "yüksek", "Aydınlık oda için parlaklık, karanlık oda için siyah seviyesi önemlidir.", ["oled", "mini led", "qled", "panel türü"]],
    ["cozunurluk", "Çözünürlük", "Ekranın piksel sayısını belirtir.", ["Full HD", "4K UHD", "8K"], "orta", "orta", "Güncel içerik için 4K yeterlidir; 8K çoğu kullanıcı için gerekli değildir.", ["4k", "uhd", "8k", "2160p"]],
    ["yenileme-hizi", "Yenileme hızı", "Spor ve oyun görüntülerinin akıcılığını etkiler.", ["50/60 Hz", "100/120 Hz", "144 Hz"], "orta", "orta", "Oyun ve spor için gerçek 100/120 Hz panel tercih edilebilir.", ["120 hz", "100 hz", "motion rate", "yenileme"]],
    ["hdr", "HDR desteği", "Parlak sahneler ile koyu ayrıntılar arasındaki aralığı genişletmeyi amaçlar.", ["HDR10", "HDR10+", "Dolby Vision", "HLG"], "orta", "orta", "Format etiketinden önce televizyonun gerçek parlaklığına bakın.", ["dolby vision", "hdr10", "hdr", "hlg"]],
    ["hdmi", "HDMI özellikleri", "Konsol, ses sistemi ve diğer cihazların bağlantı yeteneklerini belirler.", ["HDMI 2.0", "HDMI 2.1", "eARC", "VRR"], "orta", "orta", "Yeni konsol kullanıyorsanız 4K 120 Hz ve VRR destekli giriş sayısını kontrol edin.", ["hdmi 2.1", "earc", "vrr", "allm"]],
    ["isletim-sistemi", "Akıllı TV sistemi", "Uygulama desteğini, kullanım hızını ve güncelleme süresini etkiler.", ["Google TV", "webOS", "Tizen", "Fire TV"], "düşük", "orta", "Kullandığınız yayın uygulamalarının mevcut olduğundan emin olun.", ["smart tv", "google tv", "webos", "tizen"]],
  ],
  buzdolaplari: [
    ["hacim", "Net hacim", "Kullanılabilir soğutucu ve dondurucu alanını litre cinsinden gösterir.", ["300 L", "400 L", "500 L", "600 L"], "yüksek", "yüksek", "Kişi sayısına uygun hacim seçin; gereğinden büyük dolap daha fazla yer ve enerji kullanır.", ["litre", "lt", "kapasite", "net hacim"]],
    ["enerji-sinifi", "Enerji sınıfı", "Standart test koşullarındaki enerji verimliliği grubunu gösterir.", ["A", "B", "C", "D", "E", "F"], "orta", "yüksek", "Sınıfla birlikte yıllık kWh tüketimini karşılaştırın.", ["enerji etiketi", "kwh", "elektrik tüketimi", "a sınıfı"]],
    ["no-frost", "No Frost", "Dondurucu bölümünde buzlanmayı azaltan hava dolaşım sistemidir.", ["Statik", "Low Frost", "No Frost"], "orta", "yüksek", "Bakım kolaylığı sağlar ancak iç hava dolaşımı ambalaj düzenini önemli kılar.", ["nofrost", "no frost", "buzlanma", "low frost"]],
    ["kompresor", "Kompresör türü", "Soğutucu akışkanı dolaştıran ana mekanik sistemdir.", ["Sabit hızlı", "Değişken hızlı", "İnverter"], "orta", "orta", "İnverter etiketi kadar garanti süresi ve gürültü değeri de önemlidir.", ["inverter", "motor", "kompresör"]],
    ["ses", "Ses seviyesi", "Çalışma gürültüsünün desibel cinsinden beyanıdır.", ["32 dB", "35 dB", "38 dB", "42 dB"], "düşük", "orta", "Açık mutfakta düşük dB değeri daha anlamlıdır.", ["db", "desibel", "sessiz", "gürültü"]],
    ["bolmeler", "Bölme düzeni", "Raf, çekmece ve sıcaklık bölgelerinin kullanım biçimini belirler.", ["Tek kapı", "Kombi", "Gardırop tipi", "French door"], "orta", "orta", "Kapı tipinden önce günlük kullandığınız bölmelere erişimi düşünün.", ["raf", "çekmece", "gardırop tipi", "french door"]],
  ],
  "camasir-makineleri": [
    ["kapasite", "Yıkama kapasitesi", "Tek programda yıkanabilen kuru çamaşır miktarını belirtir.", ["7 kg", "8 kg", "9 kg", "10 kg", "12 kg"], "orta", "yüksek", "Hane büyüklüğüne uygun kapasite seçin; büyük tambur her zaman daha ekonomik değildir.", ["kg", "kilo", "tambur kapasitesi", "9 kg"]],
    ["sikma", "Sıkma devri", "Tamburun sıkma sırasında dakikadaki dönüş sayısını belirtir.", ["1000 rpm", "1200 rpm", "1400 rpm", "1600 rpm"], "düşük", "orta", "1400 devir kurutma süresini azaltabilir; her kumaşta kullanılmaz.", ["devir", "rpm", "1400 devir", "sıkma hızı"]],
    ["enerji-sinifi", "Enerji sınıfı", "Standart eko programdaki verimlilik grubunu gösterir.", ["A", "B", "C", "D", "E"], "orta", "yüksek", "Etiket sınıfıyla birlikte 100 çevrim tüketimini ve program süresini okuyun.", ["enerji etiketi", "kwh", "100 çevrim", "a sınıfı"]],
    ["motor", "Motor türü", "Tamburun hareketini sağlayan tahrik sistemidir.", ["Kayışlı", "İnverter", "Doğrudan tahrik"], "orta", "orta", "Motor adından önce makinenin toplam garantisini, sesi ve servisini değerlendirin.", ["inverter motor", "direct drive", "doğrudan tahrik"]],
    ["buhar", "Buhar ve özel programlar", "Kırışıklık azaltma veya hijyen amacıyla ek işlevler sunar.", ["Buhar", "Hızlı yıkama", "Leke programı", "Otomatik dozaj"], "orta", "düşük", "Gerçekten kullanacağınız programlara para verin; program sayısı tek başına kalite değildir.", ["steam", "buharlı", "hızlı program", "otomatik dozaj"]],
    ["ses", "Ses seviyesi", "Özellikle sıkma aşamasındaki beyan edilen gürültüyü gösterir.", ["68 dB", "72 dB", "76 dB"], "düşük", "orta", "Gece kullanımında sıkma sesi ve titreşim kontrolü önemlidir.", ["db", "desibel", "sessiz çamaşır makinesi", "gürültü"]],
  ],
  "robot-supurgeler": [
    ["emis", "Emiş gücü", "Motor ve hava yolunun oluşturduğu emiş için kullanılan pazarlama ölçüsüdür.", ["4000 Pa", "6000 Pa", "10000 Pa", "18000 Pa"], "orta", "orta", "Pa değerini fırça tasarımı ve gerçek temizlik testiyle birlikte değerlendirin.", ["pa", "pascal", "çekiş gücü", "vakum gücü"]],
    ["navigasyon", "Navigasyon", "Robotun evi haritalama ve rotasını planlama yöntemidir.", ["Jiroskop", "Kamera", "LiDAR", "dToF"], "yüksek", "yüksek", "Birden fazla oda ve düzenli temizlik için LiDAR veya benzer haritalama faydalıdır.", ["lidar", "haritalama", "lazer", "navigasyon"]],
    ["engel-algilama", "Engel algılama", "Kablo, oyuncak ve mobilya gibi nesneleri fark etme yeteneğidir.", ["Tampon", "Kızılötesi", "3D sensör", "Kamera"], "orta", "orta", "Dağınık evlerde nesne algılama emiş gücünden daha değerli olabilir.", ["engel tanıma", "obstacle avoidance", "kamera", "3d sensör"]],
    ["batarya", "Batarya ve alan", "Tek şarjla çalışma süresini ve tamamlanabilecek alanı etkiler.", ["3200 mAh", "5200 mAh", "6400 mAh"], "orta", "orta", "Büyük evlerde otomatik şarj olup kaldığı yerden devam etme özelliğini arayın.", ["pil", "mah", "çalışma süresi", "metrekare"]],
    ["paspas", "Paspas sistemi", "Suyu zemine verme ve bezi hareket ettirme biçimini belirtir.", ["Sabit bez", "Titreşimli", "Döner mop", "Mop kaldırma"], "orta", "orta", "Halı bulunan evlerde mop kaldırma günlük kullanımı kolaylaştırır.", ["mop", "silme", "döner paspas", "mop kaldırma"]],
    ["istasyon", "İstasyon", "Şarjın yanında toz boşaltma, su doldurma ve mop temizleme işlerini üstlenebilir.", ["Şarj", "Toz boşaltma", "Mop yıkama", "Kurutma"], "yüksek", "orta", "Tam istasyon konfor sağlar ancak sarf, yer ve bakım maliyetini artırır.", ["dock", "otomatik boşaltma", "istasyon", "mop yıkama"]],
    ["yukseklik", "Gövde yüksekliği", "Robotun hangi mobilyaların altına girebileceğini belirler.", ["8 cm", "9.5 cm", "10.5 cm"], "düşük", "orta", "Satın almadan önce en alçak mobilya boşluğunu ölçün.", ["cm", "robot yüksekliği", "mobilya altı"]],
  ],
};

export const retailFeatures = Object.entries(featureGroups).flatMap(([categorySlug, rows]) => rows.map(([
  slug, title, shortDescription, commonValues, priceImpact, importance, decision, aliases,
], position) => ({
  id: `retail-${categorySlug}-${slug}`,
  contentType: "retail-feature",
  slug,
  locale: "tr",
  categorySlug,
  position,
  title,
  shortDescription,
  commonValues,
  priceImpact,
  importance,
  decision,
  aliases,
  sourceStatus: "editorial",
  sourceLabel: "Editoryal değerlendirme",
  sourceUrl: null,
  reviewedAt,
})));

const englishTitles = {
  islemci: "Processor", ram: "RAM", depolama: "Storage", "ekran-turu": "Display type",
  "yenileme-hizi": "Refresh rate", kamera: "Camera", batarya: "Battery", ssd: "SSD capacity",
  "ekran-karti": "Graphics card", ekran: "Display", pil: "Battery capacity", agirlik: "Weight and chassis",
  "ekran-boyutu": "Screen size", cozunurluk: "Resolution", panel: "Panel type", "tepki-suresi": "Response time",
  "parlaklik-hdr": "Brightness and HDR", baglantilar: "Connectivity", sensor: "Sensor size", megapiksel: "Megapixels",
  "lens-sistemi": "Lens system", "otomatik-netleme": "Autofocus", stabilizasyon: "Image stabilization",
  video: "Video features", "vizor-ekran": "Viewfinder and display", hdr: "HDR support", hdmi: "HDMI features",
  "isletim-sistemi": "Smart TV system", hacim: "Net capacity", "enerji-sinifi": "Energy rating",
  "no-frost": "No Frost", kompresor: "Compressor type", ses: "Noise level", bolmeler: "Interior layout",
  kapasite: "Capacity", sikma: "Spin speed", motor: "Motor type", buhar: "Steam and special programs",
  emis: "Suction power", navigasyon: "Navigation", "engel-algilama": "Obstacle detection",
  paspas: "Mopping system", istasyon: "Docking station", yukseklik: "Body height",
};

const englishValues = new Map([
  ["TÃ¼mleÅŸik", "Integrated"], ["Plastik", "Plastic"], ["AlÃ¼minyum", "Aluminium"],
  ["Magnezyum alaÅŸÄ±m", "Magnesium alloy"], ["Orta format", "Medium format"],
  ["Sabit lens", "Fixed lens"], ["DeÄŸiÅŸtirilebilir lens", "Interchangeable lens"], ["Kit lens", "Kit lens"],
  ["Kontrast AF", "Contrast AF"], ["Faz algÄ±lama", "Phase detection"], ["GÃ¶z takibi", "Eye tracking"],
  ["Lens iÃ§i", "In-lens"], ["GÃ¶vde iÃ§i IBIS", "In-body IBIS"], ["Dijital", "Digital"],
  ["Elektronik vizÃ¶r", "Electronic viewfinder"], ["Optik vizÃ¶r", "Optical viewfinder"], ["Hareketli ekran", "Articulating display"],
  ["Statik", "Static"], ["Sabit hÄ±zlÄ±", "Fixed speed"], ["DeÄŸiÅŸken hÄ±zlÄ±", "Variable speed"],
  ["Tek kapÄ±", "Single door"], ["Kombi", "Bottom freezer"], ["GardÄ±rop tipi", "Side-by-side"],
  ["KayÄ±ÅŸlÄ±", "Belt drive"], ["Ä°nverter", "Inverter"], ["DoÄŸrudan tahrik", "Direct drive"],
  ["Buhar", "Steam"], ["HÄ±zlÄ± yÄ±kama", "Quick wash"], ["Leke programÄ±", "Stain programme"], ["Otomatik dozaj", "Automatic dosing"],
  ["Jiroskop", "Gyroscope"], ["Kamera", "Camera"], ["Tampon", "Bumper"], ["KÄ±zÄ±lÃ¶tesi", "Infrared"],
  ["Sabit bez", "Fixed pad"], ["TitreÅŸimli", "Vibrating"], ["DÃ¶ner mop", "Rotating mop"], ["Mop kaldÄ±rma", "Mop lift"],
  ["Åarj", "Charging"], ["Toz boÅŸaltma", "Dust emptying"], ["Mop yÄ±kama", "Mop washing"], ["Kurutma", "Drying"],
]);

function toEnglishFeature(feature) {
  const title = englishTitles[feature.slug] || feature.aliases.find((alias) => /^[a-z0-9 -]+$/i.test(alias)) || feature.slug;
  return {
    ...feature,
    locale: "en",
    title,
    shortDescription: `${title} is a store-listed specification that can affect performance, convenience, and price. Compare it with the rest of the product, not in isolation.`,
    commonValues: feature.commonValues.map((value) => englishValues.get(value) || value),
    decision: `Pay more for ${title.toLowerCase()} only when the difference supports your daily use and is confirmed by complete specifications or independent tests.`,
    sourceLabel: "Editorial assessment",
  };
}

export function getRetailFeatures(categorySlug, locale = "tr") {
  const features = retailFeatures.filter((feature) => feature.categorySlug === categorySlug).sort((a, b) => a.position - b.position);
  return locale === "en" ? features.map(toEnglishFeature) : features;
}
