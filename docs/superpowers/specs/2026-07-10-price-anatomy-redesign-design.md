# Fiyatın Anatomisi — Yeniden Tasarım ve İçerik Platformu Tasarımı

## Amaç

Price Explained projesi, Türkçe kullanıcıların teknolojik ürün fiyatlarının neden değiştiğini basit dille anlamasını sağlayan bir bilgi platformuna dönüştürülecek. Ana işlev; fiyatı oluşturan teknoloji, üretim, marka, PR/pazarlama, kur, vergi, lojistik ve servis etkilerini açıklamaktır. Ürün karşılaştırması ikincil bir işlevdir.

Platform başlangıçta telefon, kamera, televizyon ve beyaz eşya kategorilerini kapsar. Teknik terimler sade açıklamalar, günlük benzetmeler, artılar, eksiler ve anlaşılır görsellerle desteklenir.

## Teknik Mimari

- Next.js 16 App Router, React 19 ve Tailwind CSS 4 korunur.
- Uygulama kodu TypeScript'ten JavaScript/JSX'e çevrilir.
- `tsconfig.json` yerine mutlak import yollarını koruyan `jsconfig.json` kullanılır.
- İçerik sunucu bileşenlerinde Prisma üzerinden okunur.
- Tema, arama, filtre ve mobil menü gibi etkileşimli alanlar istemci bileşeni olarak sınırlandırılır.
- SQLite yerel geliştirmede kullanılabilir; veri modeli üretimde PostgreSQL'e taşınabilecek şekilde ilişkisel tasarlanır.
- Sabit içerik dosyaları doğrudan sayfalarda tüketilmez. JavaScript seed dosyaları veritabanını doldurur; sayfalar merkezi sorgu katmanını kullanır.

## Veri Modeli

Temel varlıklar:

- `Category`: Telefon, Kamera, Televizyon ve Beyaz Eşya.
- `TechnologyTerm`: OLED, OIS, sensör boyutu ve inverter motor gibi teknik terimler.
- `PriceFactor`: Donanım, üretim, Ar-Ge, marka primi, PR/pazarlama, kur, vergi, lojistik ve servis gibi fiyat etkenleri.
- `Guide`: Teknolojiyi anlama ve satın alma rehberleri.
- `Brand`: Tarafsız marka profili, konumlandırma ve servis ağı bilgisi.
- `Product`: Gelecekte gerçek ürün analizlerini destekleyecek ürün kaydı.
- `ProductTechnology`: Ürün ile teknik terim arasındaki çoktan çoğa ilişki.
- `PriceBreakdown`: Bir ürüne etki eden fiyat faktörlerine ilişkin açıklamalı editoryal değerlendirme.
- `Source`: Teknik iddialar ve değerlendirmeler için kaynak kaydı.
- `Visual`: Teknik diyagram veya kategori illüstrasyonu bilgisi.

Terimler birden fazla kategoriye bağlanabilir. Örneğin OLED hem telefon hem televizyon kategorisinde gösterilebilir. Kategori, terim, rehber, marka ve fiyat faktörleri kalıcı slug alanlarıyla adreslenir.

Marka ve PR etkileri kesin üretim maliyeti gibi sunulmaz. Düşük, orta veya yüksek etki seviyesi; açıklama ve gerektiğinde tahmini aralık ile gösterilir. Tahmini değerler açıkça editoryal değerlendirme olarak etiketlenir.

## İçerik Kapsamı

İlk sürümün ana dili Türkçedir. Çoklu dil altyapısı korunur ancak İngilizce, Almanca, İspanyolca ve Fransızca için eksiksiz içerik bu teslimatın kapsamında değildir.

Başlangıç paketi:

- Dört kategori.
- Kategori başına yaklaşık 20 terim; ortak terimler tekrarlanmayacağı için toplam yaklaşık 60–80 benzersiz terim.
- Kategori başına üç rehber, toplam 12 rehber.
- Ortak ve kategoriye özel fiyat faktörleri.
- Bilinen markalar için tarafsız başlangıç profilleri.
- İkincil karşılaştırma işlevini gösterecek birkaç örnek karşılaştırma.

Her teknik terim şu alanları içerir:

1. Bir cümlede tanım.
2. Günlük hayattan benzetme.
3. Nasıl çalıştığı.
4. Fiyatı neden etkilediği.
5. Artıları.
6. Eksileri.
7. Kimlerin önemsemesi gerektiği.
8. Kimlerin fazladan para vermemesi gerektiği.
9. Alternatif teknolojiler.
10. Yaygın yanlış anlamalar.
11. Fiyat etkisi, kullanıcı faydası ve ortalama kullanıcı için önem puanları.
12. Kaynaklar ve son gözden geçirilme tarihi.

İçerik kısa cümleli, teknik olmayan ve tarafsız bir dille yazılır. Teknik iddialar mümkün olduğunda üretici belgelerine veya güvenilir teknik kaynaklara bağlanır.

## Veri Akışı ve Sorgular

Veri akışı `JavaScript seed içerikleri → Prisma → merkezi içerik sorguları → sayfalar` biçimindedir.

Sorgu katmanı en az şu işlemleri sağlar:

- Ana sayfa için öne çıkan kategori, terim, faktör ve rehberleri getirme.
- Slug ile kategori, terim, rehber ve karşılaştırma getirme.
- Kategoriye bağlı terimleri, rehberleri ve fiyat faktörlerini getirme.
- Terime bağlı kategori, alternatif ve kaynakları getirme.
- Terim adı, diğer ad, kategori, marka ve açıklama içinde Türkçe arama.

Eksik slug anlamlı 404 sayfasına gider. Boş arama sonucu yakın kategoriler ve popüler terimler önerir. Eksik görsel veya isteğe bağlı içerik alanı sayfayı kırmaz; tanımlı bir yedek sunum kullanılır.

## Görsel Kimlik

Tasarım yönü “modern teknoloji dergisi + anlaşılır laboratuvar notları”dır. Jenerik kart yığınları yerine editoryal boşluk, güçlü tipografi, teknik çizimler ve fiyat katmanı diyagramları kullanılır.

Mevcut `Price Explained` adı korunur; Türkçe ana marka ifadesi olarak “Fiyatın Anatomisi” kullanılır.

Renk yaklaşımı:

- Açık tema: sıcak kırık beyaz zemin, koyu lacivert metin, mercan ve elektrik yeşili vurgu.
- Koyu tema: kömür/lacivert zemin, yumuşak beyaz metin ve göz yormayan vurgu tonları.
- Renkler ve yüzeyler CSS değişkenleriyle tanımlanır.
- Kontrastlar erişilebilirlik ölçütlerine göre doğrulanır.

Teknik terimlerde hafif, tutarlı ve erişilebilir SVG/CSS diyagramları kullanılır. Kategori kapaklarında özgün illüstrasyonlar kullanılır. Görseller açıklayıcı alternatif metin taşır; yalnızca dekoratif olanlar ekran okuyuculardan gizlenir.

Hareketler kısa ve amaçlıdır. Sayfa girişleri ve etkileşim durumları tasarımın yönünü destekler; `prefers-reduced-motion` seçeneği tüm zorunlu olmayan animasyonları kapatır.

## Sayfa Deneyimi

### Ana Sayfa

- “Bir ürünün fiyatında ne var?” mesajını taşıyan ana giriş.
- Dört illüstrasyonlu kategori.
- Marka, teknoloji, üretim, PR/pazarlama, vergi ve servis etkisini anlatan fiyat katmanları.
- Öne çıkan teknik terimler.
- “30 saniyede öğren” içerikleri.
- Rehberler.
- İkincil alanda örnek karşılaştırmalar.

### Terim Sayfası

- Terime özel büyük SVG diyagram.
- Tek cümlelik tanım ve 30 saniyelik özet.
- Nasıl çalışır ve fiyatı neden etkiler bölümleri.
- Artılar ve eksiler.
- Kim önemsemeli ve kim fazladan para vermemeli bölümleri.
- Fiyat etkisi, kullanıcı faydası ve önem göstergeleri.
- Alternatif teknolojiler, ilgili terimler ve kategoriler.
- Kaynaklar ve son gözden geçirilme tarihi.

### Kategori Sayfası

- Kategori illüstrasyonu ve kısa giriş.
- Kategoriye özel fiyat katmanları.
- Filtrelenebilir terim alanı.
- Rehberler ve öne çıkan açıklamalar.
- İkincil karşılaştırma bağlantıları.

### Diğer Sayfalar

Arama, rehber, fiyat faktörü, marka ve karşılaştırma sayfaları aynı tasarım sistemini kullanır. Mobil navigasyon sade, klavye erişimine uygun ve yeterli dokunma alanlarına sahip olur.

## Tema Davranışı

Tema seçimi açık, koyu ve sistem seçeneklerini destekler. Kayıtlı kullanıcı tercihi ilk HTML çiziminden önce uygulanır. Kayıt yoksa sistem tercihi kullanılır. Böylece mevcut `useEffect` tabanlı yaklaşımın oluşturduğu yanlış ilk tema ve renk sıçraması engellenir.

Tema tercihi yerel depolamada saklanır. Sistem seçiliyken işletim sistemi tema değişiklikleri canlı olarak izlenir. Tema kontrolü mevcut durumu hem görsel etiketle hem erişilebilir adla bildirir.

## Test ve Doğrulama

Yeni davranışlar test güdümlü geliştirme ile uygulanır: önce beklenen nedenle başarısız olan test, ardından en küçük uygulama ve son olarak düzenleme.

Test kapsamı:

- Veri sorguları için birim testleri.
- Seed verisinde zorunlu alan, benzersiz slug, kategori ilişkisi, artı/eksi ve kaynak doğrulaması.
- Tema tercihi, sistem teması, kalıcılık ve ilk çizim davranışı için testler.
- Ana sayfa, kategori, terim, arama, mobil menü ve 404 akışları için Playwright testleri.
- Klavye erişimi, odak durumları ve azaltılmış hareket davranışı.
- Koyu ve açık tema kontrastları ile temel görsel kontroller.

Teslimat öncesinde tam birim test paketi, ESLint ve production build çalıştırılır.

## Kapsam Dışı

Bu teslimata yönetim paneli, kullanıcı hesapları, canlı fiyat takibi, mağaza entegrasyonu ve otomatik fiyat çekme dahil değildir. Veri modeli bu özelliklerin daha sonra eklenmesini engellemeyecek, ancak ilk uygulamada kullanılmayan iş mantığı oluşturulmayacaktır.

## Başarı Ölçütleri

- Kullanıcı dört ana kategoriye ana sayfadan ulaşabilir.
- Kullanıcı bir terimin ne olduğunu, fiyatı neden etkilediğini, artılarını ve eksilerini tek sayfada anlayabilir.
- Marka ve PR/pazarlama etkisi şeffaf biçimde fiyat faktörü olarak görünür.
- Yaklaşık 60–80 benzersiz Türkçe terim ve 12 rehber veritabanından sunulur.
- Tema tercihi yeniden yüklemede korunur ve ilk çizimde yanlış tema gösterilmez.
- Uygulama kaynak kodu JavaScript/JSX kullanır.
- Birim testleri, lint ve production build başarıyla tamamlanır.
