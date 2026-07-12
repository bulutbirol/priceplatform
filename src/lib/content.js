import { expansionCategories, expansionFactorSpecs, expansionGuideSpecs, expansionReviewedAt, expansionTermGroups } from "./content-expansion.js";
import { scaleFactorSpecs, scaleGuideSpecs, scaleReviewedAt, scaleTermGroups } from "./content-scale.js";
import { calculateReadingTime } from "./reading-time.js";
import { categoryGroups, productCategoryGroupBySlug, wholeHomeCategories, wholeHomeFactorSpecs, wholeHomeGuideSpecs, wholeHomeReviewedAt, wholeHomeTermGroups } from "./whole-home-taxonomy.js";
export { retailFeatures } from "./retail-features.js";

export { categoryGroups };

export const locales = ["tr", "en", "de", "es", "fr"];

const reviewedAt = "2026-07-10";

const baseCategories = [
  {
    id: "category-phone",
    slug: "telefonlar",
    locale: "tr",
    title: "Telefon",
    eyebrow: "Cebindeki küçük bilgisayar",
    shortDescription: "Ekran, kamera, işlemci ve pil teknolojilerinin telefon fiyatını nasıl değiştirdiğini öğren.",
    body: "Bir telefonun fiyatı yalnızca hızından oluşmaz. Kamera donanımı, ekran üretimi, yazılım desteği, malzeme kalitesi ve marka konumlandırması da etikete eklenir.",
    icon: "smartphone",
    color: "coral",
    image: null,
  },
  {
    id: "category-camera",
    slug: "kameralar",
    locale: "tr",
    title: "Kamera",
    eyebrow: "Işığı görüntüye dönüştüren sistem",
    shortDescription: "Sensör, lens, netleme ve gövde özelliklerinin maliyetini anlaşılır biçimde çöz.",
    body: "Kamerada büyük sayılar her zaman daha iyi görüntü demek değildir. Sensör alanı, lens kalitesi, otomatik netleme ve mekanik dayanıklılık fiyatı birlikte belirler.",
    icon: "camera",
    color: "blue",
    image: null,
  },
  {
    id: "category-tv",
    slug: "televizyonlar",
    locale: "tr",
    title: "Televizyon",
    eyebrow: "Panelden görüntü işlemeye",
    shortDescription: "Panel türü, parlaklık, oyun özellikleri ve görüntü işlemcisi için ne ödediğini gör.",
    body: "Televizyon fiyatının büyük kısmı panelden gelir; ancak arka aydınlatma, görüntü işleme, bağlantılar ve yazılım ömrü de deneyimi değiştirir.",
    icon: "tv",
    color: "lime",
    image: null,
  },
  {
    id: "category-appliance",
    slug: "beyaz-esya",
    locale: "tr",
    title: "Beyaz Eşya",
    eyebrow: "Uzun ömürlü ev makineleri",
    shortDescription: "Motor, kompresör, yalıtım ve enerji verimliliğinin uzun vadeli değerini anla.",
    body: "Beyaz eşyada satın alma fiyatı kadar enerji tüketimi, ses, kapasite, onarılabilirlik ve servis ağı da toplam maliyeti belirler.",
    icon: "washing-machine",
    color: "amber",
    image: null,
  },
].map((category) => ({
  ...category,
  contentType: "category",
  status: "PUBLISHED",
  guideCount: 3,
  updatedAt: reviewedAt,
  reviewedAt,
}));

export const categories = [
  ...baseCategories,
  ...expansionCategories.map((category) => ({
    ...category,
    contentType: "category",
    status: "PUBLISHED",
    guideCount: 3,
    updatedAt: expansionReviewedAt,
    reviewedAt: expansionReviewedAt,
  })),
  ...wholeHomeCategories.map((category) => ({
    ...category,
    contentType: "category",
    status: "PUBLISHED",
    guideCount: 3,
    updatedAt: wholeHomeReviewedAt,
    reviewedAt: wholeHomeReviewedAt,
  })),
].map((category) => ({ ...category, groupSlug: category.groupSlug || productCategoryGroupBySlug[category.slug] || null }));

const baseTermGroups = {
  telefonlar: [
    ["oled-ekran", "OLED ekran", "Her pikselin kendi ışığını ürettiği ekran teknolojisi.", "Siyah görüntüde lambayı kısmak yerine o pikselin ışığını tamamen kapatmak gibidir.", "Çok güçlü kontrast ve ince panel sağlar.", "Üretimi pahalıdır; uzun süre sabit görüntüde iz riski olabilir."],
    ["ltpo", "LTPO", "Ekran yenileme hızını ihtiyaca göre geniş aralıkta değiştiren panel altyapısı.", "Trafik yokken yavaşlayıp gerektiğinde hızlanan akıllı bir yürüyen bant gibi çalışır.", "Akıcı görüntüyü daha düşük pil tüketimiyle sunabilir.", "Panel ve kontrol devresi maliyetini yükseltir."],
    ["yenileme-hizi", "Yenileme hızı", "Ekranın görüntüyü bir saniyede kaç kez yenilediğini anlatır.", "Aynı hareketin daha fazla kareyle çizilen animasyonu gibi görünür.", "Kaydırma ve oyun hareketleri daha akıcı hissedilir.", "Yüksek değer pil tüketebilir; video izlerken fark sınırlı kalabilir."],
    ["soc", "SoC", "İşlemci, grafik birimi ve pek çok kontrolcüyü tek pakette birleştiren ana çip.", "Telefonun beyniyle yardımcı ofislerinin aynı binada olması gibidir.", "Hız, kamera işleme ve enerji verimliliğini birlikte etkiler.", "En yeni üst seviye çipler cihaz maliyetini belirgin artırır."],
    ["ram", "RAM", "Açık uygulamaların hızlı erişilen geçici çalışma alanı.", "Mutfakta çalışırken malzemeleri tuttuğun tezgâh alanına benzer.", "Daha çok uygulamanın yeniden yüklenmeden açık kalmasını sağlar.", "İhtiyacın üzerindeki kapasite günlük kullanımda hissedilmeyebilir."],
    ["ufs-depolama", "UFS depolama", "Telefonun kalıcı verileri okuma ve yazma hızını belirleyen depolama standardı.", "Aynı dolabın daha geniş kapılı ve daha düzenli raflı olması gibidir.", "Uygulama açılışlarını ve dosya kopyalamayı hızlandırır.", "Hızlı ve yüksek kapasiteli yongalar daha pahalıdır."],
    ["piksel-birlestirme", "Piksel birleştirme", "Kamera sensöründeki komşu piksellerin düşük ışıkta birlikte çalışması.", "Dört küçük kovadaki yağmur suyunu tek büyük kovada toplamak gibidir.", "Gece çekiminde daha temiz ve aydınlık görüntü sağlayabilir.", "Çıktı çözünürlüğü düşer ve kötü yazılım ayrıntıyı silebilir."],
    ["ois", "OIS", "Kamera lensi veya sensörünü fiziksel olarak hareket ettirerek titreşimi azaltan sistem.", "Sarsılan tepsiyi elinle dengede tutmaya benzer.", "Gece fotoğrafı ve videoda netliği artırır.", "Mekanik parça, hacim ve üretim hassasiyeti maliyeti yükseltir."],
    ["periskop-lens", "Periskop lens", "Işığı gövde içinde yana çevirerek daha uzun optik yakınlaştırma sağlayan kamera yapısı.", "Denizaltı periskobunun ışığı aynayla yönlendirmesi gibidir.", "İnce telefonda güçlü optik yakınlaştırma sunar.", "Fazla alan kaplar ve karmaşık hizalama gerektirir."],
    ["hizli-sarj", "Hızlı şarj", "Pili kısa sürede doldurmak için daha yüksek ve kontrollü güç kullanan sistem.", "Dar musluk yerine sıcaklığı izlenen geniş bir muslukla kovayı doldurmak gibidir.", "Kısa molalarda anlamlı kullanım süresi kazandırır.", "Isı yönetimi ve özel adaptör maliyeti getirir; pil yaşlanmasını etkileyebilir."],
    ["kablosuz-sarj", "Kablosuz şarj", "Enerjiyi iki bobin arasında manyetik alanla aktaran şarj yöntemi.", "Birbirine değmeyen iki dişlinin manyetik olarak dönmesi gibidir.", "Kablo takmadan kolay şarj sağlar.", "Kablolu şarja göre daha fazla enerji kaybı ve ısı oluşturur."],
    ["ip-sertifikasi", "IP sertifikası", "Cihazın toz ve su girişine karşı test edilmiş dayanım seviyesidir.", "Kapı ve pencerelerin yağmur testinden geçirilmiş olması gibidir.", "Kazalara karşı güven verir ve dayanıklılığı artırır.", "Tam su geçirmezlik garantisi değildir; conta ve test maliyeti ekler."],
    ["koruyucu-cam", "Koruyucu cam", "Ekranı çizilme ve darbeye karşı koruyan güçlendirilmiş cam katmanı.", "İnce ama sert bir kalkan gibi ekranın önünde durur.", "Günlük çizilme ve bazı düşmelere karşı direnci artırır.", "Kırılmaz değildir; özel cam ve kaplama fiyatı artırır."],
    ["5g-modem", "5G modem", "Telefonun yeni nesil mobil ağlarla haberleşmesini sağlayan radyo sistemi.", "Daha geniş ve hızlı şeritleri kullanabilen bir araç gibidir.", "Uygun kapsamada daha yüksek hız ve düşük gecikme sağlar.", "Ek anten, lisans ve enerji maliyeti vardır; kapsama her yerde eşit değildir."],
    ["esim", "eSIM", "Fiziksel kart yerine cihaz içindeki programlanabilir SIM bileşeni.", "Anahtar değiştirmek yerine kilidin kodunu uzaktan değiştirmek gibidir.", "Hat değiştirmeyi ve çift hat kullanımını kolaylaştırır.", "Operatör desteğine bağlıdır ve cihaz aktarımı bazen daha zahmetlidir."],
  ],
  kameralar: [
    ["sensor-boyutu", "Sensör boyutu", "Işığı yakalayan görüntü sensörünün fiziksel alanı.", "Büyük bir pencerenin küçük pencereden daha çok ışık alması gibidir.", "Düşük ışık ve alan derinliği üzerinde güçlü kontrol sağlar.", "Büyük sensör, büyük lens ve gövde gerektirerek maliyeti artırır."],
    ["megapiksel", "Megapiksel", "Fotoğrafı oluşturan toplam piksel sayısını yaklaşık olarak anlatır.", "Bir mozaiğin kaç küçük taştan oluştuğunu saymak gibidir.", "İyi ışık ve lensle kırpma payı ve ayrıntı sağlar.", "Tek başına kalite ölçüsü değildir; dosya boyutunu ve gürültüyü artırabilir."],
    ["diyafram", "Diyafram", "Lensten geçen ışık miktarını ayarlayan değişken açıklık.", "Göz bebeğinin karanlıkta büyüyüp aydınlıkta küçülmesi gibidir.", "Işık ve arka plan bulanıklığı üzerinde yaratıcı kontrol verir.", "Geniş diyaframlı kaliteli lensler büyük, ağır ve pahalıdır."],
    ["odak-uzakligi", "Odak uzaklığı", "Lensin görüş açısını ve konuyu ne kadar yakın gösterdiğini belirleyen değerdir.", "Bir sahneye geniş pencereden veya dürbünden bakmak arasındaki fark gibidir.", "Kadraj ve perspektif seçimini belirler.", "Her aralığı iyi kapsayan lensler karmaşık ve pahalı olabilir."],
    ["optik-zoom", "Optik zoom", "Lens elemanlarını hareket ettirerek ayrıntı kaybetmeden görüş açısını değiştirme.", "Resmi büyütmek yerine konuya dürbünle yaklaşmak gibidir.", "Dijital yakınlaştırmadan daha fazla gerçek ayrıntı korur.", "Hareketli lens grupları boyut, ağırlık ve maliyet ekler."],
    ["ibis", "Gövde içi sabitleme", "Sensörü hareket ettirerek el titreşimini dengeleyen gövde sistemi.", "Sarsılan zeminde kamerayı küçük bir platformun dengede tutması gibidir.", "Birçok lensle düşük enstantanede daha net çekim sağlar.", "Hassas mekanizma gövdeyi pahalı ve bazen daha büyük yapar."],
    ["otomatik-netleme", "Otomatik netleme", "Kameranın konunun uzaklığını ölçüp lensi doğru noktaya ayarlaması.", "Gözünün yakından uzağa bakarken kendiliğinden odaklanması gibidir.", "Hareketli konularda net kare yakalama oranını artırır.", "Gelişmiş sensörler ve işlem algoritmaları fiyatı yükseltir."],
    ["dinamik-aralik", "Dinamik aralık", "Aynı karedeki en koyu ve en parlak ayrıntıları birlikte koruma kapasitesi.", "Hem güneşli pencereyi hem gölgeli odayı aynı anda görebilmek gibidir.", "Zorlu ışıkta daha esnek ve doğal görüntü verir.", "Yüksek performanslı sensör ve işleme gücü gerektirir."],
    ["iso", "ISO", "Sensörden gelen sinyalin ne kadar güçlendirildiğini belirleyen ayar.", "Kısık bir sesi yükseltirken dip gürültüsünün de artması gibidir.", "Karanlıkta daha hızlı çekim yapmayı sağlar.", "Yükseldikçe kumlanma ve ayrıntı kaybı oluşabilir."],
    ["enstantane", "Enstantane", "Sensörün ne kadar süre ışık topladığını belirleyen çekim süresi.", "Musluğu ne kadar süre açık tuttuğun gibi ışık miktarını değiştirir.", "Hareketi dondurmayı veya akış hissi vermeyi sağlar.", "Uzun sürede titreşim, kısa sürede daha fazla ışık ihtiyacı doğar."],
    ["raw", "RAW", "Sensör verisini az işlenmiş ve geniş düzenleme payıyla saklayan dosya biçimi.", "Hazır yemek yerine tüm malzemeleri ayrı almak gibidir.", "Renk ve parlaklık düzenlemesinde geniş esneklik verir.", "Dosyalar büyüktür ve işlemek için zaman ile yazılım gerekir."],
    ["lens-sabitleme", "Lens sabitleme", "Lens içindeki optik grubu hareket ettirerek titreşimi azaltan sistem.", "Dürbünü küçük bir denge mekanizmasının sabit tutması gibidir.", "Özellikle telefoto çekimlerde sarsıntıyı azaltır.", "Lensi daha karmaşık, ağır ve pahalı yapar."],
    ["stacked-sensor", "Yığılmış sensör", "Işık alan katman ile hızlı okuma devrelerini üst üste yerleştiren sensör yapısı.", "Üretim bandının katlarını üst üste kurup yolu kısaltmak gibidir.", "Hızlı seri çekim ve düşük görüntü eğilmesi sağlar.", "Üretimi karmaşık olduğu için üst seviye fiyat taşır."],
    ["bsi-cmos", "BSI CMOS", "Işığa engel olan devreleri pikselin arkasına taşıyan sensör tasarımı.", "Pencerenin önündeki kabloları arkaya alıp ışık yolunu açmak gibidir.", "Özellikle küçük piksellerde ışık verimini artırır.", "Gelişmiş üretim süreci klasik tasarımdan daha maliyetlidir."],
    ["elektronik-vizor", "Elektronik vizör", "Sensör görüntüsünü göz hizasındaki küçük ekranda canlı gösteren vizör.", "Çekilecek fotoğrafın küçük bir önizleme ekranına bakmak gibidir.", "Pozlama ve renk sonucunu çekmeden önce gösterir.", "Kaliteli panel, optik ve işlem gücü pil ile maliyet ekler."],
  ],
  televizyonlar: [
    ["mini-led", "Mini LED", "LCD panelin arkasında çok sayıda küçük LED kullanan aydınlatma sistemi.", "Tek oda lambası yerine yüzlerce küçük lambayı ayrı ayrı kısmak gibidir.", "Yüksek parlaklık ve daha kontrollü siyahlar sunar.", "LED sayısı ve kontrol devreleri maliyeti artırır; hale etkisi tamamen bitmez."],
    ["qled", "QLED", "Renk üretimini iyileştirmek için kuantum nokta katmanı kullanan LCD ekran.", "Beyaz ışığı daha saf renk boyalarından geçirmek gibidir.", "Yüksek parlaklıkta canlı renkler sağlar.", "Siyah seviyesi hâlâ arka aydınlatmaya bağlıdır."],
    ["local-dimming", "Bölgesel karartma", "Arka aydınlatmanın ekranın farklı bölgelerinde ayrı kontrol edilmesi.", "Sahnede yalnızca oyuncunun olduğu spotları açmak gibidir.", "Kontrastı artırır ve karanlık sahneleri iyileştirir.", "Az bölge kullanılırsa parlak nesnelerin çevresinde hale görülebilir."],
    ["hdr", "HDR", "Daha geniş parlaklık ve renk aralığı taşıyan görüntü yaklaşımı.", "Resimde yalnızca gri tonları değil, parlak ışıkla derin gölgeyi birlikte göstermek gibidir.", "Uyumlu içerikte daha canlı ve gerçekçi ışık sunar.", "HDR etiketi tek başına kalite garantisi değildir; parlak panel gerekir."],
    ["dolby-vision", "Dolby Vision", "Sahne sahne görüntü ayarı taşıyabilen lisanslı HDR biçimi.", "Her sahneye ayrı ışık talimatı veren bir görüntü yönetmeni gibidir.", "Uyumlu içerikte ton eşlemeyi iyileştirebilir.", "Lisans ve cihaz desteği gerekir; her içerikte bulunmaz."],
    ["tepe-parlaklik", "Tepe parlaklığı", "Ekranın kısa süreli parlak vurgularda ulaşabildiği ışık seviyesi.", "Fotoğraftaki güneş yansımasının gerçekten parlayabilmesi gibidir.", "HDR vurgularını ve aydınlık odada görünürlüğü güçlendirir.", "Yüksek parlaklık enerji, ısı ve panel maliyetini artırır."],
    ["hdmi-2-1", "HDMI 2.1 özellikleri", "Yüksek çözünürlük, kare hızı ve oyun özelliklerini taşıyan bağlantı yetenekleri ailesi.", "Daha geniş veri şeritleri olan bir köprü gibidir.", "Yeni konsol ve bilgisayarlarda 4K yüksek kare hızını destekler.", "Tüm HDMI 2.1 etiketli girişler aynı özellikleri sunmayabilir."],
    ["vrr", "VRR", "Ekran yenileme hızını oyun cihazının ürettiği karelerle eşleştiren özellik.", "İki dansçının adımlarını aynı ritme getirmesi gibidir.", "Oyunlarda yırtılma ve takılma hissini azaltır.", "Film izleyen kullanıcı için faydası yoktur; uyumlu cihaz gerekir."],
    ["input-lag", "Giriş gecikmesi", "Kumanda komutu ile ekrandaki tepki arasındaki süredir.", "Düğmeye basınca ışığın ne kadar geç yandığını ölçmek gibidir.", "Düşük değer oyun kontrolünü daha doğrudan hissettirir.", "Görüntü iyileştirme işlemleri gecikmeyi artırabilir."],
    ["upscaling", "Çözünürlük yükseltme", "Düşük çözünürlüklü görüntüyü yüksek çözünürlüklü panele uyarlama işlemi.", "Küçük bir resmi büyütürken eksik çizgileri akıllıca tamamlamak gibidir.", "Eski yayınların daha temiz görünmesini sağlayabilir.", "Gerçek ayrıntı yaratmaz; sonuç işlemci ve algoritmaya bağlıdır."],
    ["va-panel", "VA panel", "Yüksek doğal kontrasta odaklanan yaygın LCD panel yapısı.", "Perdeleri daha iyi kapatan ama yandan bakınca rengi değişen bir pencere gibidir.", "Karanlık odada daha derin siyahlar sunabilir.", "Yandan izleme açısı ve hareket performansı modele göre sınırlı olabilir."],
    ["ips-panel", "IPS panel", "Geniş izleme açısına öncelik veren LCD panel yapısı.", "Odanın farklı köşelerinden benzer görünen bir afiş gibidir.", "Kalabalık oturma düzeninde renkleri daha iyi korur.", "Doğal kontrastı VA panele göre daha düşük olabilir."],
    ["yanma-izi", "Kalıcı görüntü izi", "Uzun süre aynı öğenin gösterilmesiyle bazı piksellerin eşit yaşlanmaması.", "Halı üstünde uzun süre duran mobilyanın iz bırakması gibidir.", "Risk doğru kullanım ve koruma sistemleriyle azaltılabilir.", "Sabit logolu yoğun kullanımda OLED sahipleri için dikkat gerektirir."],
    ["renk-gamutu", "Renk gamutu", "Ekranın üretebildiği renk alanının genişliği.", "Boyacının elindeki boya kutularının çeşitliliği gibidir.", "Uyumlu içerikte daha zengin renkler sağlar.", "Geniş gamut doğru kalibrasyon olmadan yapay görünebilir."],
    ["goruntu-islemcisi", "Görüntü işlemcisi", "Gürültü azaltma, hareket ve ölçekleme işlemlerini yöneten çip.", "Ham görüntüyü yayına hazırlayan küçük bir kurgu masası gibidir.", "Zayıf yayınları temizleyip hareketi iyileştirebilir.", "Güçlü işlemci maliyetlidir; agresif ayarlar doğal görüntüyü bozabilir."],
  ],
  "beyaz-esya": [
    ["inverter-motor", "Inverter motor", "Motor hızını ihtiyaca göre kademesiz ayarlayan sürüş sistemi.", "Sürekli tam gaz gitmek yerine hızını yola göre ayarlayan araç gibidir.", "Daha sessiz ve verimli çalışabilir.", "Elektronik kartı karmaşıktır ve onarımı klasik sisteme göre pahalı olabilir."],
    ["isi-pompasi", "Isı pompası", "Isıyı sürekli üretmek yerine ortamdan taşıyarak kullanan verimli sistem.", "Suyu her seferinde ısıtmak yerine sıcaklığı bir kaptan diğerine taşımak gibidir.", "Kurutmada ciddi enerji tasarrufu ve düşük sıcaklık sağlar.", "İlk satın alma fiyatı yüksektir ve programlar daha uzun sürebilir."],
    ["enerji-sinifi", "Enerji sınıfı", "Standart testteki enerji tüketimini karşılaştıran etiket ölçeği.", "Araçların yakıt tüketim etiketine benzer bir karşılaştırma kısayoludur.", "Benzer ürünler arasında işletme maliyetini kıyaslamayı kolaylaştırır.", "Gerçek tüketim kullanım alışkanlığına göre değişir."],
    ["yuk-sensoru", "Yük sensörü", "Makinenin yük miktarını ölçüp suyu veya süreyi ayarlaması.", "Tencerenin büyüklüğüne göre yalnızca gereken kadar su koymak gibidir.", "Az yükte kaynak israfını azaltabilir.", "Sensör ve kontrol kartı maliyet ekler; yanlış yerleşim ölçümü etkileyebilir."],
    ["induksiyon", "İndüksiyon", "Manyetik alanla tencerenin kendisini doğrudan ısıtan pişirme teknolojisi.", "Ocağı ısıtıp tencereye aktarmak yerine ısıyı tencerenin içinde oluşturmak gibidir.", "Hızlı, kontrollü ve verimli ısıtır.", "Uyumlu tencere ve güçlü elektrik altyapısı gerektirebilir."],
    ["no-frost", "No Frost", "Soğuk havayı dolaştırıp nemi yöneterek buzlanmayı azaltan sistem.", "Tek köşeyi dondurmak yerine serin havayı odada gezdirmek gibidir.", "Manuel buz çözme ihtiyacını büyük ölçüde kaldırır.", "Fan sesi, daha kuru ortam ve ek enerji tüketimi olabilir."],
    ["degisken-hizli-kompresor", "Değişken hızlı kompresör", "Soğutma gücünü ihtiyaca göre ayarlayan kompresör.", "Oda sıcaklığına göre kısılıp açılan klima gibi çalışır.", "Sıcaklığı daha dengeli ve sessiz koruyabilir.", "Kontrol elektroniği ilk maliyeti ve olası onarım giderini artırır."],
    ["buhar-programi", "Buhar programı", "Kırışıklık, koku veya hijyen için sıcak buhar kullanan program.", "Kumaş liflerini küçük bir sıcak sisle gevşetmek gibidir.", "Ütü ihtiyacını azaltabilir ve bazı döngüleri destekler.", "Her lekeyi çıkarmaz; süre, su ve donanım maliyeti ekler."],
    ["fircasiz-motor", "Fırçasız motor", "Elektrik temas fırçaları olmadan elektronik olarak döndürülen motor.", "Sürtünen kalemler yerine mıknatıslarla çevrilen bir tekerlek gibidir.", "Daha az aşınma, düşük ses ve iyi hız kontrolü sağlar.", "Sürücü elektroniği klasik motordan daha karmaşıktır."],
    ["su-tuketimi", "Su tüketimi", "Bir standart programın kullandığı su miktarı.", "Her yıkamada kaç kova su harcandığını gösteren sayaç gibidir.", "Uzun vadeli fatura ve çevresel etkiyi anlamaya yardım eder.", "Çok düşük su kullanımı kötü program seçimiyle temizliği etkileyebilir."],
    ["akilli-baglanti", "Akıllı bağlantı", "Cihazı uygulama veya ev ağı üzerinden izleme ve kontrol etme özelliği.", "Makinenin durumunu uzaktan bildiren bir mesaj hattı gibidir.", "Bildirim, uzaktan tanılama ve enerji takibi sağlayabilir.", "Gizlilik, yazılım ömrü ve bağlantı sorunları eklenir."],
    ["yalitim", "Isı ve ses yalıtımı", "Sıcaklık ile gürültünün dışarı kaçmasını azaltan malzeme ve gövde tasarımı.", "Kalın montun ısıyı, kapalı kapının sesi içeride tutması gibidir.", "Enerji tüketimini ve çalışma sesini düşürebilir.", "Kaliteli malzeme ağırlık, hacim ve üretim maliyeti ekler."],
    ["tambur-hacmi", "Tambur hacmi", "Çamaşırın hareket edebildiği iç kazan kapasitesi.", "Kalabalık insanların dar oda yerine geniş odada rahat hareket etmesi gibidir.", "Büyük yükleri ve hacimli tekstili kolaylaştırır.", "Büyük makine daha fazla yer kaplar; küçük evlerde gereksiz olabilir."],
    ["desibel", "Desibel", "Cihazın oluşturduğu ses düzeyini logaritmik ölçekte anlatan birim.", "Sayıdaki küçük artışın kulakta beklenenden büyük fark yaratması gibidir.", "Açık mutfak ve gece kullanımında doğru ürün seçmeye yardım eder.", "Etiket değeri sesin karakterini ve titreşimi tek başına anlatmaz."],
    ["onarilabilirlik", "Onarılabilirlik", "Parça, belge ve tasarımın cihazı tamir etmeyi ne kadar kolaylaştırdığı.", "Tek parça yapıştırılmış kutu yerine vidalı ve parçaları bulunan bir makine gibidir.", "Ürünün ömrünü uzatıp toplam maliyeti düşürebilir.", "Modüler tasarım ve yedek parça stoğu ilk fiyatı artırabilir."],
  ],
};

const termGroups = Object.fromEntries(
  [...new Set([...Object.keys(baseTermGroups), ...Object.keys(expansionTermGroups), ...Object.keys(scaleTermGroups), ...Object.keys(wholeHomeTermGroups)])]
    .map((slug) => [slug, [...(baseTermGroups[slug] || []), ...(expansionTermGroups[slug] || []), ...(scaleTermGroups[slug] || []), ...(wholeHomeTermGroups[slug] || [])]]),
);

const categoryAudience = {
  telefonlar: ["Yoğun telefon kullananlar ve mobil fotoğraf çekenler", "Temel mesajlaşma ve arama yapanlar"],
  kameralar: ["Fotoğraf ve video üretiminde kontrol isteyenler", "Yalnızca gündelik anı fotoğrafı çekenler"],
  televizyonlar: ["Film, spor veya oyun deneyimine önem verenler", "Çoğunlukla haber ve gündüz yayını izleyenler"],
  "beyaz-esya": ["Cihazı uzun yıllar ve sık kullanacak evler", "Seyrek kullanan veya kısa süreli çözüm arayanlar"],
  buzdolaplari: ["Gıdayı uzun süre saklayan ve enerji giderini önemseyen evler", "Geçici veya çok düşük hacimli çözüm arayanlar"],
  "camasir-makineleri": ["Sık yıkama yapan ve sessizlik ile dayanıklılık arayan evler", "Çok seyrek ve düşük yükte yıkama yapanlar"],
  "bulasik-makineleri": ["Her gün bulaşık yıkayan ve su tasarrufu isteyen evler", "Çok az bulaşığı elde yıkayanlar"],
  "kurutma-makineleri": ["Sık çamaşır yıkayan ve kapalı alanda hızlı kurutma isteyenler", "Çamaşırını doğal yolla rahatça kurutabilenler"],
  firinlar: ["Düzenli yemek ve hamur işi pişiren kullanıcılar", "Yalnızca temel ve seyrek ısıtma yapanlar"],
  klimalar: ["Uzun süre iklimlendirme kullanan ve verimlilik isteyenler", "Yılda birkaç gün kısa süreli serinleme isteyenler"],
};

export const terms = Object.entries(termGroups).flatMap(([categorySlug, specs], categoryIndex) =>
  specs.map(([slug, title, summary, analogy, advantage, disadvantage], index) => ({
    id: `term-${slug}`,
    slug,
    locale: "tr",
    contentType: "term",
    status: "PUBLISHED",
    title,
    shortDescription: summary,
    summary,
    body: summary,
    analogy,
    howItWorks: `${title}, ürün içinde belirli bir görevi üstlenir ve çevresindeki parçaların tasarımıyla birlikte sonuç verir. Çalışma biçimi ürün sınıfına ve üreticinin uygulamasına göre değişebilir.`,
    whyPriceMatters: `${title} için kullanılan malzeme, kapasite, üretim hassasiyeti, güvenlik testi ve montaj yöntemi maliyeti değiştirebilir.`,
    advantages: [advantage],
    disadvantages: [disadvantage],
    whoShouldCare: (categoryAudience[categorySlug] || ["Bu ürün türünü düzenli kullanan ve performans farkını önemseyenler", "Ürünü seyrek ve yalnızca temel işlevlerle kullananlar"])[0],
    whoCanSkip: (categoryAudience[categorySlug] || ["Bu ürün türünü düzenli kullanan ve performans farkını önemseyenler", "Ürünü seyrek ve yalnızca temel işlevlerle kullananlar"])[1],
    alternatives: [],
    commonMisunderstandings: [`${title} tek başına ürünün genel kalitesini belirlemez.`],
    priceImpact: ((index + categoryIndex) % 5) + 1,
    userBenefit: ((index + 2) % 5) + 1,
    importanceForAverageUsers: ((index + 1) % 5) + 1,
    categorySlugs: [categorySlug],
    sources: ["source-editorial"],
    updatedAt: reviewedAt,
    reviewedAt,
  })),
);

const baseGuideSpecs = {
  telefonlar: [
    ["telefon-fiyati-nasil-okunur", "Telefon fiyatı nasıl okunur?", "Ekran, kamera, işlemci ve yazılım desteği arasında bütçe payını anlamanın kısa yolu."],
    ["telefon-kamerasi-secme", "Telefon kamerasında neye bakmalı?", "Megapiksel yarışının ötesinde sensör, lens ve sabitlemeyi karşılaştır."],
    ["pil-ve-sarj-rehberi", "Pil ve şarj rehberi", "Kapasite, verimlilik ve şarj hızı arasındaki gerçek dengeyi öğren."],
  ],
  kameralar: [
    ["ilk-kamera-secimi", "İlk kamera nasıl seçilir?", "Gövde kadar lens sistemini ve kullanım amacını hesaba kat."],
    ["sensor-ve-lens-dengesi", "Sensör ve lens dengesi", "Bütçeyi gövde ile optik arasında daha akıllı paylaştır."],
    ["video-icin-kamera", "Video için kamera seçimi", "Netleme, sabitleme, ısınma ve bağlantı özelliklerini birlikte değerlendir."],
  ],
  televizyonlar: [
    ["tv-panel-secimi", "Doğru TV panelini seçmek", "Odanın ışığına ve izleme alışkanlığına göre panel teknolojisini belirle."],
    ["oyun-televizyonu", "Oyun televizyonunda önemli özellikler", "Yüksek Hz etiketinden önce gecikme, VRR ve bağlantıları kontrol et."],
    ["hdr-gercekte-ne", "HDR gerçekte ne kazandırır?", "Parlaklık, kontrast ve içerik desteğinin birlikte neden önemli olduğunu gör."],
  ],
  "beyaz-esya": [
    ["toplam-sahip-olma-maliyeti", "Etiket fiyatından fazlası", "Enerji, su, bakım ve ömürle gerçek sahip olma maliyetini hesapla."],
    ["sessiz-beyaz-esya", "Sessiz beyaz eşya seçimi", "Desibel etiketini, titreşimi ve yerleşimi doğru yorumla."],
    ["verimli-cihaz-secimi", "Enerji verimli cihaz seçmek", "Enerji sınıfını kapasite ve kullanım sıklığıyla birlikte değerlendir."],
  ],
};

const guideSpecs = Object.fromEntries(
  [...new Set([...Object.keys(baseGuideSpecs), ...Object.keys(expansionGuideSpecs), ...Object.keys(scaleGuideSpecs), ...Object.keys(wholeHomeGuideSpecs)])]
    .map((slug) => [slug, [...(baseGuideSpecs[slug] || []), ...(expansionGuideSpecs[slug] || []), ...(scaleGuideSpecs[slug] || []), ...(wholeHomeGuideSpecs[slug] || [])]]),
);

export const guides = Object.entries(guideSpecs).flatMap(([categorySlug, specs]) =>
  specs.map(([slug, title, shortDescription]) => ({
    id: `guide-${slug}`,
    slug,
    locale: "tr",
    contentType: "guide",
    status: "PUBLISHED",
    title,
    shortDescription,
    body: shortDescription,
    categorySlug,
    readingTime: calculateReadingTime([
      "En pahalı özellik yerine her gün fark edeceğin özelliğe bütçe ayır.",
      "Teknik özellikleri birbirleriyle ve gerçek kullanım koşullarıyla birlikte değerlendir.",
      "Yazılım, enerji, bakım, servis ve ikinci el değerini satın alma fiyatına ekle.",
    ]),
    sections: [
      { title: "Önce kullanımını tanımla", body: "En pahalı özellik yerine her gün fark edeceğin özelliğe bütçe ayır." },
      { title: "Tek bir sayıya güvenme", body: "Teknik özellikleri birbirleriyle ve gerçek kullanım koşullarıyla birlikte değerlendir." },
      { title: "Uzun vadeyi düşün", body: "Yazılım, enerji, bakım, servis ve ikinci el değerini satın alma fiyatına ekle." },
    ],
    sources: ["source-editorial"],
    updatedAt: reviewedAt,
    reviewedAt,
  })),
);

const basePricingFactors = [
  ["bilesen-kalitesi", "Bileşen kalitesi", "Daha dayanıklı, hızlı veya hassas parçalar ürünün doğrudan maliyetini artırır.", "yüksek"],
  ["uretim-karmasikligi", "Üretim karmaşıklığı", "Hassas montaj, düşük hata payı ve kalite kontrol daha fazla zaman ve yatırım gerektirir.", "yüksek"],
  ["arge", "Araştırma ve geliştirme", "Yeni teknoloji, prototip, test ve yazılım geliştirme giderleri ürün ailesine dağıtılır.", "orta"],
  ["marka-primi", "Marka primi", "Güven, tasarım dili, ekosistem ve konumlandırma için donanım maliyetinin üzerinde fiyat oluşabilir.", "orta"],
  ["pr-pazarlama", "PR ve pazarlama", "Lansman, reklam, sponsorluk, mağaza görünürlüğü ve iletişim bütçeleri nihai fiyata dolaylı yansır.", "orta"],
  ["kur", "Döviz kuru", "İthal bileşen ve ürünlerde kur hareketi yerel satış fiyatını hızlı biçimde değiştirebilir.", "yüksek"],
  ["vergi", "Vergiler", "KDV ve kategoriye göre değişen diğer vergiler ürünün raf fiyatına eklenir.", "yüksek"],
  ["lojistik", "Lojistik ve stok", "Taşıma, depolama, sigorta ve stok riski özellikle büyük ürünlerde fiyatı etkiler.", "orta"],
  ["servis-agi", "Servis ve garanti", "Yedek parça, teknisyen ağı ve uzun garanti maliyeti satın alma fiyatına dahil olabilir.", "orta"],
  ["urun-yasam-dongusu", "Ürün yaşam döngüsü", "Yeni çıkan ürünler erken kullanıcı primi taşırken dönem sonunda kampanyalar görülebilir.", "orta"],
].map(([slug, title, shortDescription, impact]) => ({
  id: `factor-${slug}`,
  slug,
  locale: "tr",
  contentType: "pricing-factor",
  status: "PUBLISHED",
  title,
  shortDescription,
  body: shortDescription,
  impact,
  editorialEstimate: true,
  categorySlugs: categories.map((category) => category.slug),
  updatedAt: reviewedAt,
  reviewedAt,
}));

export const pricingFactors = [
  ...basePricingFactors,
  ...expansionFactorSpecs.map((factor) => ({
    id: `factor-${factor.slug}`,
    ...factor,
    locale: "tr",
    contentType: "pricing-factor",
    status: "PUBLISHED",
    body: factor.shortDescription,
    editorialEstimate: true,
    updatedAt: expansionReviewedAt,
    reviewedAt: expansionReviewedAt,
  })),
  ...scaleFactorSpecs.map((factor) => ({
    id: `factor-${factor.slug}`,
    ...factor,
    locale: "tr",
    contentType: "pricing-factor",
    status: "PUBLISHED",
    body: factor.shortDescription,
    editorialEstimate: true,
    updatedAt: scaleReviewedAt,
    reviewedAt: scaleReviewedAt,
  })),
  ...wholeHomeFactorSpecs.map((factor) => ({
    id: `factor-${factor.slug}`,
    ...factor,
    locale: "tr",
    contentType: "pricing-factor",
    status: "PUBLISHED",
    body: factor.shortDescription,
    editorialEstimate: true,
    updatedAt: wholeHomeReviewedAt,
    reviewedAt: wholeHomeReviewedAt,
  })),
];

export const brands = [
  ["apple", "Apple", "premium"], ["samsung", "Samsung", "geniş ürün ailesi"], ["xiaomi", "Xiaomi", "değer odaklı"],
  ["sony", "Sony", "görüntü ve eğlence"], ["canon", "Canon", "fotoğraf sistemi"], ["nikon", "Nikon", "fotoğraf sistemi"],
  ["fujifilm", "Fujifilm", "fotoğraf deneyimi"], ["lg", "LG", "ekran ve ev elektroniği"], ["bosch", "Bosch", "ev teknolojileri"],
  ["arcelik", "Arçelik", "yerel servis ağı"], ["beko", "Beko", "erişilebilir ev teknolojileri"], ["miele", "Miele", "üst segment dayanıklılık"],
].map(([slug, name, positioning], index) => ({ id: `brand-${index + 1}`, slug, name, positioning, locale: "tr" }));

export const comparisons = [
  ["oled-vs-mini-led", "OLED mi Mini LED mi?", "Karanlık oda kontrastı ile yüksek parlaklık arasındaki tercih."],
  ["buyuk-sensor-vs-yuksek-megapiksel", "Büyük sensör mü, yüksek megapiksel mi?", "Işık toplama ile çözünürlük arasındaki denge."],
  ["hizli-sarj-vs-pil-omru", "Hızlı şarj mı, pil ömrü mü?", "Günlük kolaylık ile uzun vadeli kullanım dengesini kur."],
  ["isi-pompali-vs-klasik-kurutma", "Isı pompalı mı klasik kurutma mı?", "İlk fiyat ile uzun vadeli enerji giderini karşılaştır."],
].map(([slug, title, shortDescription], index) => ({
  id: `comparison-${index + 1}`,
  slug,
  locale: "tr",
  contentType: "comparison",
  status: "PUBLISHED",
  title,
  shortDescription,
  body: shortDescription,
  quickResult: shortDescription,
  comparisonTable: ({
    "oled-vs-mini-led": [
      { feature: "Siyah seviyesi", optionA: "OLED: piksel tamamen kapanır", optionB: "Mini LED: bölgesel karartma kullanır" },
      { feature: "Parlak oda", optionA: "OLED: modele göre iyi", optionB: "Mini LED: genellikle daha parlak" },
      { feature: "Sabit görüntü", optionA: "OLED: iz riski yönetilmelidir", optionB: "Mini LED: kalıcı iz riski düşüktür" },
    ],
    "buyuk-sensor-vs-yuksek-megapiksel": [
      { feature: "Düşük ışık", optionA: "Büyük sensör: daha çok ışık", optionB: "Yüksek MP: sonuca göre değişir" },
      { feature: "Kırpma payı", optionA: "Büyük sensör: çözünürlüğe bağlı", optionB: "Yüksek MP: iyi ışıkta avantajlı" },
      { feature: "Sistem boyutu", optionA: "Büyük sensör: lensler büyür", optionB: "Yüksek MP: küçük sensörde mümkün" },
    ],
    "hizli-sarj-vs-pil-omru": [
      { feature: "Günlük kolaylık", optionA: "Hızlı şarj: kısa molada yüksek", optionB: "Pil ömrü: gün boyu güven" },
      { feature: "Isı", optionA: "Hızlı şarj: daha sıkı yönetim gerekir", optionB: "Yavaş şarj: genellikle daha serin" },
      { feature: "Kime uygun?", optionA: "Priz yanında kısa kalanlara", optionB: "Şarjdan uzak uzun günlere" },
    ],
    "isi-pompali-vs-klasik-kurutma": [
      { feature: "Satın alma", optionA: "Isı pompası: daha yüksek", optionB: "Klasik: daha erişilebilir" },
      { feature: "Enerji", optionA: "Isı pompası: daha verimli", optionB: "Klasik: daha yüksek tüketim" },
      { feature: "Program süresi", optionA: "Isı pompası: daha uzun olabilir", optionB: "Klasik: genellikle daha kısa" },
    ],
  })[slug],
  updatedAt: reviewedAt,
  reviewedAt,
}));

export const sourceData = [
  {
    id: "source-editorial",
    title: "Teknik kaynak eşleştirmesi bekleyen editoryal taslak",
    publisher: "Price Explained",
    url: "/tr/editorial-policy",
    accessDate: reviewedAt,
    sourceType: "Kaynak doğrulaması bekliyor",
    language: "tr",
  },
];

export const faqs = [];

export function getLocalizedContent(items, locale) {
  return items.filter((item) => item.locale === locale || item.locale === "tr");
}

export function getCategory(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryTerms(slug) {
  return terms.filter((term) => term.categorySlugs.includes(slug));
}

export function getCategoryGuides(slug) {
  return guides.filter((guide) => guide.categorySlug === slug);
}

export function getTerm(slug) {
  return terms.find((term) => term.slug === slug);
}

export function normalizeSearch(value) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
}

export function searchContent(query) {
  const normalizedQuery = normalizeSearch(query.trim());
  if (!normalizedQuery) return [];

  return [...categories, ...terms, ...guides, ...comparisons, ...pricingFactors, ...brands]
    .filter((item) => normalizeSearch([item.title || item.name, item.shortDescription, item.body, item.positioning].filter(Boolean).join(" ")).includes(normalizedQuery))
    .slice(0, 20);
}
