# Tüm Ev Ürünleri Hiyerarşik Katalog Tasarımı

## Amaç

Platform; evde kullanılan, fiyatı donanım, teknoloji, yazılım, enerji verimliliği veya servis yapısından etkilenen ürünlerin tamamını kapsayacak şekilde genişletilecektir. İçerik düz ve kalabalık bir kategori listesi yerine `üst grup → ürün türü → teknoloji/faktör/rehber` hiyerarşisiyle sunulur.

## Üst Gruplar ve Ürün Türleri

### Kişisel Teknoloji

Telefon, tablet, dizüstü bilgisayar, masaüstü bilgisayar, monitör, kamera, kulaklık, akıllı saat ve oyun konsolu.

### Görüntü ve Eğlence

Televizyon, projeksiyon, soundbar, hoparlör ve medya oynatıcı.

### Büyük Ev Aletleri

Buzdolabı, dondurucu, çamaşır makinesi, kurutma makinesi, bulaşık makinesi, fırın, ocak, davlumbaz ve klima.

### Küçük Mutfak Aletleri

Airfryer, mikrodalga, kahve makinesi, kettle, tost makinesi, blender, mikser, mutfak robotu, ekmek yapma makinesi ve su arıtma cihazı.

### Temizlik ve Hava

Elektrikli süpürge, robot süpürge, dikey süpürge, buharlı temizleyici, ütü, hava temizleyici, nemlendirici, nem alıcı ve vantilatör.

### Akıllı Ev ve Güvenlik

Modem, mesh Wi-Fi, akıllı priz, akıllı ampul, termostat, güvenlik kamerası, alarm, görüntülü zil, akıllı kilit ve ev sensörleri.

### Enerji Sistemleri

Güneş paneli, inverter, ev tipi batarya, UPS, elektrikli araç şarj cihazı ve enerji ölçer.

### Kişisel Bakım

Saç kurutma makinesi, saç şekillendirici, tıraş makinesi, epilatör, elektrikli diş fırçası, baskül ve masaj cihazı.

### Ev, Atölye ve Bahçe

Dikiş makinesi, matkap, vidalama, basınçlı yıkama makinesi, çim biçme makinesi, su pompası ve otomatik sulama.

İlk katalog yaklaşık 72 ürün türü içerir. Liste, içerik doğrulamasında sabit bir sözleşme olarak tutulur.

## Veri Modeli

Yeni `CategoryGroup` varlığı üst grubu temsil eder. Mevcut `Category` kayıtları ürün türü olarak korunur ve isteğe bağlı `groupId` ile üst gruba bağlanır. Böylece mevcut kategori slug'ları ve detay bağlantıları değişmez.

İlişkiler:

- `CategoryGroup 1 → N Category`
- `Category N ↔ N TechnologyTerm`
- `Category N ↔ N PriceFactor`
- `Category 1 → N Guide`

Ortak teknolojiler tek kayıtta tutulur. Örneğin lityum iyon pil; telefon, dizüstü bilgisayar, akıllı saat, matkap ve ev bataryasıyla ilişkilendirilebilir. Wi-Fi, inverter sürücü, fırçasız motor, sensör ve uygulama desteği de aynı ilkeyi izler.

## İçerik Hedefi

Yeni ürün türlerinin her biri başlangıçta:

- en az 20 teknik terim,
- en az 15 fiyat faktörü,
- 3 rehber içerir.

Mevcut dokuz ayrıntılı kategori 50 terim, 30 faktör ve 5 rehber seviyesini korur. Yeni ürünlerin içeriği parça, çalışma prensibi, yazılım/bağlantı, enerji, bakım/ömür ve ürün dışı maliyetleri kapsar.

Her terim özgün tanım, benzetme, çalışma açıklaması, fiyat etkisi, artı, eksi ve hedef kullanıcı alanlarını taşır. Kesin maliyet yüzdesi doğrulanmadığında yüzde gösterilmez.

## Sayfa Mimarisi

Ana sayfa dokuz üst grubu gösterir. Üst grup bağlantısı, ilgili ürün türlerinin sade ve aranabilir listesini açar. Ürün türü bağlantısı mevcut kategori detay sayfasına gider. Terim ve rehberler ansiklopedik detay düzenini korur.

Akış:

`Ana sayfa → Üst grup → Ürün türü → Terim veya rehber`

Ana arama; üst grup, ürün türü, terim, fiyat faktörü, rehber ve marka kayıtlarını aynı sonuç listesinde bulur. “Robot süpürge”, “LiDAR”, “kahve makinesi pompası” ve “akıllı kilit” gibi sorgular doğrudan ilgili içeriğe ulaşır.

## Geçiş ve Geriye Uyumluluk

- Mevcut dokuz kategori slug'ı korunur.
- `beyaz-esya` indeksi büyük ev aletleri grubuna yönlendiren uyumlu sayfa olarak çalışmaya devam eder.
- Mevcut kategori, terim ve rehber URL'leri değişmez.
- Seed yalnızca yönetilen kayıtları upsert eder; kullanıcı veya harici kayıtları topluca silmez.
- Yeni ilişki migration'ı mevcut kategori kayıtlarına uygun üst grup kimliklerini bağlar.

## Uygulama Aşamaları

Bu kapsam tek veri yığını halinde uygulanmaz:

1. Üst grup veri modeli, dokuz grup sayfası ve yaklaşık 72 ürün türü kabuğu.
2. Kişisel teknoloji ile görüntü/eğlence içerikleri.
3. Büyük ve küçük ev aletleri içerikleri.
4. Temizlik, hava, akıllı ev ve güvenlik içerikleri.
5. Enerji, kişisel bakım, atölye ve bahçe içerikleri.

Her aşama kendi içerik sözleşmesi, seed doğrulaması ve sayfa testleriyle tamamlanır. İlk aşamada boş ürün kartı gösterilmez; ürün türü ancak minimum içerik sözleşmesini sağladığında yayımlanır.

## Test Stratejisi

- Dokuz üst grup ve beklenen ürün türü slug'ları.
- Her yayımlanmış yeni üründe en az 20 terim, 15 faktör ve 3 rehber.
- Mevcut ayrıntılı kategorilerde 50/30/5 kapsamının korunması.
- Üst grup–ürün ilişkilerinin geçerliliği.
- Ortak terimlerin tekrar kayıt yerine ilişki kullanması.
- Eski URL'lerin çalışması.
- Aramanın üst grup ve yeni ürün türlerini bulması.
- Seed'in iki kez güvenle çalışması.
- Tam test, lint, production build ve temiz migration/seed kontrolü.

## Kapsam Dışı

Canlı mağaza fiyatları, otomatik web içeriği kopyalama, kesin maliyet yüzdeleri, kullanıcı hesabı ve yönetim paneli bu katalog genişlemesine dahil değildir.

## Kabul Ölçütleri

- Kullanıcı dokuz üst gruptan yaklaşık 72 ev ürün türüne ulaşabilir.
- Hiçbir sayfa yüzlerce ürünü düz ve gruplandırılmamış biçimde göstermez.
- Yayımlanmış her yeni ürün minimum 20/15/3 içerik kapsamına sahiptir.
- Donanım, yazılım, enerji, bakım, servis ve marka/PR etkileri birlikte açıklanır.
- Mevcut dark mode, arama, ansiklopedik okuma ve eski bağlantılar korunur.
