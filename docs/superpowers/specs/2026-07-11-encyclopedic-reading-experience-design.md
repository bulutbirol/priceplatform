# Ansiklopedik Okuma Deneyimi Tasarımı

## Amaç

Platformun ana sayfasındaki modern kimlik korunurken uzun içerik sayfaları, kullanıcının dikkatini metne veren sade bir dijital ansiklopedi deneyimine dönüştürülecek. Başarı ölçütü daha fazla dekorasyon değil; bir terimin tanımını, fiyat etkisini, artılarını ve eksilerini mümkün olan en az görsel yükle okuyabilmektir.

## Seçilen Yaklaşım

Üç yaklaşım değerlendirildi:

1. Tüm siteyi Wikipedia'ya yakın tek tip bir görünüme dönüştürmek.
2. Mevcut modern kart tabanlı görünümü yalnızca biraz hafifletmek.
3. Ana sayfayı modern tutup terim ve rehber sayfalarını ansiklopedik hale getirmek.

Üçüncü yaklaşım seçildi. Böylece ana sayfa keşif ve marka kimliği görevini sürdürürken içerik sayfaları azami okunabilirliğe odaklanır. Ürün karşılaştırması ikincil işlev olarak görsel hiyerarşide geri planda kalır.

## Sayfa Düzeni

Masaüstünde içerik sayfaları üç sütunlu bir okuma kabuğu kullanır:

- Solda sabit bir “İçindekiler” alanı bulunur. Yalnızca sayfada gerçekten bulunan başlıkları gösterir ve etkin bölümü belirtir.
- Ortada yaklaşık 720–760 piksel genişliğinde ana okuma sütunu yer alır.
- Sağda terimin kısa tanımı, kategori, fiyat etkisi, kullanıcı faydası ve son güncelleme tarihi gibi bilgileri taşıyan kısa bir bilgi kutusu bulunur.

Yan sütunlar ana metinle yarışmaz. Sol sütun navigasyon, sağ sütun hızlı özet içindir. Orta sütun görsel olarak birincil kalır.

Tablet görünümünde sağ bilgi kutusu ana metnin başına taşınır ve içindekiler alanı daraltılır. Mobil görünümde iki yan sütun da kapanır; bilgi özeti başlığın altında, içindekiler ise açılır-kapanır bir bölüm olarak gösterilir. Okuma akışı tek sütundur.

## Görsel Dil ve Tipografi

Tasarım yönü “modern dijital ansiklopedi”dir. Wikipedia'nın bilgi yoğunluğu ve sakinliği örnek alınır; arayüz birebir kopyalanmaz.

- Gövde metni rahat okunan, ekranda net bir serif yazı karakteri kullanır.
- Arayüz kontrolleri ve küçük veri etiketleri sade bir sans-serif karakter kullanır.
- Gövde metni masaüstünde yaklaşık 18 piksel, satır yüksekliği 1.7 civarında olur.
- Paragraflar kısa tutulur; başlıklar net bir hiyerarşi ve yeterli üst boşluk kullanır.
- Arka plan, metin ve çizgiler ana paleti oluşturur. Vurgu rengi yalnızca bağlantı, etkin içindekiler öğesi ve önemli veri için kullanılır.
- Büyük gölgeler, renkli gradyanlar, dekoratif rozetler ve iç içe kart yığınları içerik sayfalarından kaldırılır.
- Bölümler kutularla çevrilmek yerine boşluk ve ince ayraçlarla ayrılır.

Koyu tema aynı yapıyı korur. Saf siyah yerine yumuşak koyu yüzey, saf beyaz yerine düşük parlamalı açık metin kullanılır. Bağlantıların, odak halkalarının ve artı/eksi göstergelerinin kontrastı iki temada da erişilebilir olur.

## İçerik Sunumu

Terim sayfasının sırası şöyledir:

1. Başlık, diğer adlar ve tek cümlelik tanım.
2. Kısa bilgi kutusu.
3. “Kısaca” özeti.
4. Nasıl çalıştığı.
5. Fiyatı neden etkilediği.
6. Artıları ve eksileri.
7. Kim önemsemeli, kim fazladan ödeme yapmamalı.
8. Alternatifler ve ilgili terimler.
9. Kaynaklar ve güncelleme bilgisi.

Artılar ve eksiler renkli kartlar yerine açık başlıklar ve kısa maddelerle sunulur. Renk yalnızca küçük bir anlamsal işaret olarak kullanılır; anlam renk olmadan da anlaşılır. Teknik diyagramlar metnin yanında yalnızca açıklayıcı değer taşıyorsa gösterilir. Büyük kahraman görseli zorunlu değildir.

Rehber sayfaları aynı okuma kabuğunu kullanır. Kategori sayfaları daha hafif bir keşif düzeni taşır ancak kart sayısı azaltılır, filtreler sadeleştirilir ve terim listeleri alfabetik/taranabilir bir görünüme yaklaştırılır. Ana sayfa modern kalır; daha az gölge, daha az vurgu rengi ve daha sıkı içerik önceliğiyle genel sistemle uyumlu hale gelir.

## Bileşen Sınırları

- `ReadingLayout`: üç sütunlu masaüstü ve tek sütunlu mobil okuma kabuğu.
- `TableOfContents`: verilen başlıklardan bağlantı üretir; etkin başlığı erişilebilir biçimde belirtir.
- `ArticleInfobox`: kısa özet verilerini tutarlı bir tanım listesi olarak sunar.
- `ArticleSection`: başlık, kalıcı bağlantı ve standart dikey ritmi yönetir.
- `ProsCons`: kısa, anlamsal ve renk bağımsız artı/eksi listeleri sunar.

Bu bileşenler veri sorgulamaz. Sayfalar mevcut sorgu katmanından gelen veriyi bileşenlere aktarır. Böylece sadeleştirme veri tabanı şemasını veya içerik modelini değiştirmez.

## Etkileşim ve Erişilebilirlik

- İçindekiler bağlantıları gerçek başlık kimliklerine gider ve klavyeyle kullanılabilir.
- Sabit başlık nedeniyle bölüm başlıklarının gizlenmemesi için kaydırma payı uygulanır.
- Odak durumu yalnızca renge dayanmaz ve tüm temalarda görünürdür.
- Mobil içindekiler kontrolü `aria-expanded` durumunu bildirir.
- Hareket zorunlu değildir; etkin bölüm değişimi animasyonsuz da anlaşılır.
- Görsellerin açıklayıcı alternatif metni korunur, dekoratif çizimler ekran okuyucudan gizlenir.

## Hata ve Eksik Veri Davranışı

Bilgi kutusundaki isteğe bağlı bir alan eksikse boş satır gösterilmez. İçindekiler yalnızca mevcut bölümleri listeler. Diyagram bulunmadığında yer tutucu kullanılmaz; metin doğal biçimde tam genişlikte devam eder. Bu kurallar eksik editoryal verinin sayfa düzenini bozmasını engeller.

## Test Stratejisi

Uygulama test güdümlü ilerler:

- Önce içerik sayfasında ana okuma alanı, içindekiler ve bilgi kutusunun anlamsal bölgelerini bekleyen test yazılır ve başarısızlığı doğrulanır.
- Mobil içindekiler açma/kapama ve erişilebilir durum testi eklenir.
- Eksik isteğe bağlı verilerin boş satır veya yer tutucu üretmediği test edilir.
- Terim ve rehber sayfaları için Playwright kontrolleri; masaüstü üç sütun ve mobil tek sütun davranışını doğrular.
- Açık/koyu tema, klavye odağı, başlık bağlantıları, lint ve production build yeniden doğrulanır.

## Kapsam Dışı

Bu çalışma içerik metinlerini, Prisma şemasını, seed kapsamını, arama algoritmasını veya karşılaştırma veri modelini değiştirmez. Wikipedia'nın birebir görsel kopyası yapılmaz. Yeni animasyon sistemi, yönetim paneli veya kişiselleştirilmiş okuma ayarları eklenmez.

## Kabul Ölçütleri

- Ana sayfa modern keşif görünümünü korur.
- Terim ve rehber sayfaları masaüstünde solda içindekiler, ortada dar okuma sütunu ve sağda kısa bilgi kutusu kullanır.
- Mobilde içerik tek sütunda ve yatay kaydırma olmadan okunur.
- Artılar, eksiler ve fiyat etkisi ilk bakışta bulunabilir; gereksiz kart ve dekorasyon bulunmaz.
- Açık ve koyu temada metin kontrastı ve uzun okuma rahatlığı korunur.
- Mevcut içerik ve veri tabanı davranışları geriye dönük olarak çalışmaya devam eder.
