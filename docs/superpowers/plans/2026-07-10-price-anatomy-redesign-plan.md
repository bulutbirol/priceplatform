# Fiyatın Anatomisi Uygulama Planı

## Hedef

Mevcut Next.js 16 projesini JavaScript/JSX kullanan, Prisma tabanlı Türkçe teknoloji fiyatları bilgi platformuna dönüştürmek; koyu temayı düzeltmek ve telefon, kamera, televizyon ile beyaz eşya içeriklerini modern bir arayüzde sunmak.

## Uygulama İlkeleri

- Davranış değişikliklerinde önce başarısız test yazılır ve beklenen nedenle başarısız olduğu görülür.
- Sayfalar ve veri erişimi varsayılan olarak Server Component kalır; yalnızca tarayıcı API'si veya etkileşim gereken küçük bileşenler Client Component olur.
- `params` ve `searchParams` Next.js 16 kuralına uygun olarak Promise kabul edilir ve `await` edilir.
- Global CSS yalnızca kök locale layout tarafından yüklenir; Tailwind 4 `@import "tailwindcss"` ile kullanılır.
- Yeni raster kategori kapakları built-in image generation ile üretilip `public` altına alınır. Teknik diyagramlar deterministik React/SVG bileşenleridir.

## Aşamalar

### 1. Baseline ve JavaScript dönüşümü

- Mevcut test, lint ve build durumunu kaydet.
- Test dosyaları dahil `.ts/.tsx` kaynaklarını `.js/.jsx` biçimine dönüştür.
- TypeScript türlerini kaldır; çalışma davranışını değiştirme.
- `tsconfig.json` yerine `jsconfig.json` oluştur.
- TypeScript ve `@types/*` geliştirme bağımlılıklarını kaldır.
- Prisma ve Next yapılandırma dosyalarını JavaScript uyumlu hale getir.
- Mevcut test, lint ve build komutlarını yeniden çalıştır.

### 2. İçerik sözleşmesi ve seed verisi

- Önce seed doğrulayıcı testleri yaz: benzersiz slug, dört kategori, yaklaşık içerik hacmi, terim artı/eksi alanları, kategori ilişkileri ve fiyat faktörlerinde marka/PR kapsamı.
- Kategori, terim, faktör, rehber, marka, karşılaştırma, kaynak ve ilişkiler için Prisma modellerini ekle.
- Türkçe seed veri modüllerini kategori bazında oluştur.
- Toplam yaklaşık 60–80 benzersiz terim ve 12 rehber ekle.
- Prisma seed komutunu ve idempotent yükleme akışını ekle.
- Merkezi sorgu katmanını ve testlerini oluştur.

### 3. Tema sistemi

- Önce kayıtlı tercih, sistem tercihi, `system` canlı değişimi ve depolama davranışını test et.
- İlk çizimden önce çalışan küçük tema başlangıç betiği ekle.
- Açık, koyu ve sistem seçenekli erişilebilir tema kontrolünü oluştur.
- Renkleri semantik CSS değişkenlerine taşı.

### 4. Tasarım sistemi ve ortak bileşenler

- Global tipografi, yüzey, sınır, vurgu, odak ve hareket tokenlarını oluştur.
- Logo/wordmark, header, mobil navigasyon ve footer bileşenlerini yenile.
- Tekrarlanan editorial card, section heading, impact meter, pros/cons ve source list parçalarını oluştur.
- Azaltılmış hareket ve klavye odağı davranışlarını ekle.

### 5. Ana sayfa ve kategori deneyimi

- Önce ana mesaj, dört kategori, fiyat katmanları, marka/PR faktörleri ve öne çıkan içerik beklentilerini test et.
- Ana sayfayı modern editoryal düzende uygula.
- Dört kategori kapak illüstrasyonu üret, doğrula ve `public/images/categories` altına kaydet.
- Kategori liste ve detay sayfalarını veri sorgularına bağla.
- Kategoriye özel terim, faktör ve rehber alanlarını ekle.

### 6. Terim deneyimi ve teknik görseller

- Önce tanım, benzetme, fiyat etkisi, artı/eksi, kim önemsemeli, alternatif ve kaynak alanlarını test et.
- Terim detay sayfasını uygula.
- Terim türlerine göre yeniden kullanılabilir SVG diyagram bileşenleri oluştur.
- İlgili terimler ve kategoriler bağlantılarını ekle.

### 7. Arama, rehber, faktör ve karşılaştırmalar

- Türkçe karakterleri dikkate alan arama ve boş sonuç davranışını test et.
- Arama sayfasını veri sorgusuna bağla.
- Rehber, fiyat faktörü, marka ve karşılaştırma liste/detay sayfalarını tasarım sistemine taşı.
- Karşılaştırmayı navigasyonda ikincil konumda tut.

### 8. Hata durumları ve erişilebilirlik

- Locale düzeyinde not-found ve error arayüzleri ekle.
- Eksik görsel ve isteğe bağlı alanlar için yedek sunum oluştur.
- Mobil menü, tema kontrolü, arama ve ana sayfa için Playwright akışlarını güncelle.
- Başlık hiyerarşisi, alternatif metin, odak görünürlüğü ve dokunma alanlarını doğrula.

### 9. Son doğrulama

- Seed doğrulama ve içerik sayımlarını çalıştır.
- Tüm birim/bileşen testlerini çalıştır.
- ESLint çalıştır.
- Production build çalıştır.
- Koyu/açık tema ve mobil sayfaları tarayıcıda kontrol et.
- Kalan TypeScript kaynaklarını ve bozuk importları tara.

## Teslimat Kriterleri

- Uygulama kaynakları JavaScript/JSX'tir.
- Dört kategori, yaklaşık 60–80 benzersiz Türkçe terim ve 12 rehber veri katmanından okunur.
- Marka ve PR/pazarlama fiyat faktörleri görünürdür.
- Terimlerde artılar, eksiler ve açıklayıcı görseller bulunur.
- Tema açık, koyu ve sistem modlarında ilk çizimden itibaren doğru çalışır.
- Ana sayfa, kategori ve terim sayfaları mobil ve masaüstünde tutarlı modern tasarıma sahiptir.
- Test, lint ve production build temiz tamamlanır.
