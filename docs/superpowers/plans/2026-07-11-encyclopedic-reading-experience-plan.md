# Ansiklopedik Okuma Deneyimi Uygulama Planı

## Hedef

Terim ve rehber detaylarını masaüstünde solda içindekiler, ortada 720–760 px okuma sütunu ve sağda kısa bilgi kutusu bulunan; mobilde tek sütuna inen sade bir okuma deneyimine dönüştürmek. Ana sayfanın modern keşif rolünü korurken genel görsel yoğunluğu azaltmak.

## Uygulama Sırası

### 1. Okuma bileşenleri — TDD

- `ReadingLayout`, `TableOfContents`, `ArticleInfobox`, `ArticleSection` ve `ProsCons` için önce davranış testleri yaz.
- Testlerin bileşenler bulunmadığı için beklenen biçimde başarısız olduğunu doğrula.
- Bileşenleri anlamsal HTML, gerçek başlık bağlantıları ve eksik veri filtreleme davranışıyla uygula.
- Mobil içindekiler kontrolünü erişilebilir bir `details/summary` yapısıyla JavaScript zorunluluğu olmadan sun.

### 2. Terim sayfası — TDD

- Mevcut sayfa testini yeni okuma bölgeleri, bilgi kutusu, bölüm bağlantıları ve sade artı/eksi sunumunu bekleyecek biçimde güncelle.
- Testin eski sayfa yapısında beklenen nedenle başarısız olduğunu doğrula.
- Terim sayfasını yeni okuma bileşenlerine taşı; büyük dekoratif kahraman alanını kaldır, diyagramı yalnızca açıklayıcı bölümde tut.

### 3. Rehber sayfası — TDD

- Rehber detayının aynı okuma kabuğunu ve bölüm navigasyonunu kullandığını doğrulayan test ekle.
- Başarısızlığı doğruladıktan sonra rehber sayfasını yeni bileşenlere taşı.
- Eksik bölüm ve meta verinin boş UI üretmediğini doğrula.

### 4. Görsel sistem ve responsive CSS

- Next.js 16 yerel CSS ve bileşen kurallarını doğrula.
- Okuma yüzeyi, serif gövde yazısı, ince ayraçlar, bağlantılar, odak durumları ve koyu tema tokenlarını sadeleştir.
- Masaüstü üç sütun, tablet iki/tek sütun geçişi ve mobil tek sütun kurallarını ekle.
- Kategori ve ana sayfadaki ağır gölge, gradyan ve kart yoğunluğunu azalt; içerik hiyerarşisini değiştirme.

### 5. Uçtan uca ve son doğrulama

- Terim ve rehber detaylarında masaüstü/mobil okuma bölgelerini kontrol eden Playwright senaryolarını ekle veya güncelle.
- Birim testleri, lint ve production build çalıştır.
- TypeScript kaynağı bulunmadığını, koyu temanın korunduğunu ve `git diff --check` sonucunu doğrula.

## Kabul Kriterleri

- Terim ve rehber detaylarında anlamsal içindekiler, ana makale ve bilgi kutusu bulunur.
- Ana okuma sütunu geniş ekranlarda 720–760 px aralığındadır.
- Mobilde yatay taşma olmadan tek sütun okunur; içindekiler açılır-kapanırdır.
- Eksik isteğe bağlı alanlar boş satır veya yer tutucu üretmez.
- Artı/eksi anlamı yalnızca renge dayanmaz.
- Açık ve koyu tema okunabilirliği, mevcut veri davranışı ve tüm doğrulama komutları korunur.
