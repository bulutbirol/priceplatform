# Sade ve Kategorili Giriş Tasarımı

## Amaç

Ana sayfanın ilk görevi platformu anlatmak değil, kullanıcının aradığı ürün kategorisini mümkün olan en kısa sürede bulmasını sağlamaktır. Dokuz ana ürün ilk ekranda görünür olacak; teknik ayrıntılar, fiyat faktörleri, rehberler ve karşılaştırmalar kategoriye tıklandıktan sonra açılacaktır.

## Seçilen Yaklaşım

Sekmeli görünüm bazı ürünleri gizlediği, tek alfabetik liste ise ürün ilişkilerini zayıflattığı için gruplandırılmış açık katalog seçildi. Tüm ürünler sayfa yüklendiğinde görünür ve bağlantı olarak kullanılabilir olur.

## Giriş Hiyerarşisi

1. “Hangi ürünün fiyatını anlamak istiyorsun?” başlığı.
2. Büyük ve sade arama alanı.
3. Beş ürün grubu ve dokuz kategori bağlantısı.
4. Kısa platform açıklaması ve içerik sayıları.
5. İkincil bilgi alanları.

Mevcut büyük fiyat anatomisi görseli ilk ekrandan kaldırılır. Öne çıkan terimler, fiyat faktörleri, rehberler ve karşılaştırmalar ana keşif görevini engellemeyecek biçimde aşağı taşınır ve görsel ağırlıkları azaltılır.

## Kategori Grupları

- Kişisel teknoloji: Telefon, Kamera.
- Ev ve eğlence: Televizyon.
- Mutfak ve beyaz eşya: Buzdolabı, Bulaşık Makinesi, Fırın.
- Çamaşır bakımı: Çamaşır Makinesi, Kurutma Makinesi.
- İklimlendirme: Klima.

Her kategori bağlantısında küçük açıklayıcı ikon, ürün adı ve tek cümlelik açıklama bulunur. Büyük illüstrasyon, sıra numarası, dekoratif rozet ve uzun metin kullanılmaz.

## Arama

Arama alanı kategori, teknik terim, parça, fiyat faktörü ve rehber adlarını arar. Mevcut arama rotası korunur. Örnek metin, kullanıcının ürün adıyla da arayabileceğini anlatır: “Telefon, buzdolabı, işlemci veya kompresör ara”.

## İlerleyen Açılım

Kategori bağlantısına tıklanınca mevcut kategori detay sayfası açılır. Kullanıcı burada 50 terimi gruplar halinde, 30 fiyat faktörünü ve 5 rehberi görür. Terime tıklanınca ansiklopedik detay sayfası açılır. Böylece bilgi katmanları `ana sayfa → kategori → terim/rehber` sırasıyla derinleşir.

## Responsive ve Erişilebilirlik

Masaüstünde grup başına uygun sayıda sütun, mobilde tek sütun kullanılır. Grup başlıkları anlamsal başlık hiyerarşisine sahiptir. Kategori bağlantılarının tamamı klavye ile erişilebilir, odak durumu görünür ve dokunma alanı en az 44 pikseldir. Bilgi yalnızca ikon veya renkle aktarılmaz.

## Test Stratejisi

- Ana sayfanın dokuz kategori bağlantısını beş grup altında göstermesi.
- Arama alanının ilk ana içerik öğeleri arasında bulunması.
- Büyük fiyat anatomisi görselinin ilk giriş bölümünde bulunmaması.
- Kategori bağlantılarının doğru rotalara gitmesi.
- Mobilde katalog bağlantılarının görünür kalması.
- Mevcut dark mode, arama, kategori ve rehber testlerinin korunması.

## Kabul Ölçütleri

- Kullanıcı dokuz kategorinin tamamını girişte görebilir.
- Ürünler beş anlaşılır grupta sunulur.
- Arama alanı ürün ve teknik terim aramayı açıkça destekler.
- İlk ekran uzun tanıtım metni veya büyük dekoratif diyagram içermez.
- Ayrıntılar kategori ve terim tıklamalarından sonra açılır.
