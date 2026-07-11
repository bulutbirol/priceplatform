# Büyük İçerik ve Ayrıntılı Fiyat Faktörleri Tasarımı

## Amaç

Platform, ürün fiyatlarının yalnızca marka, vergi ve pazarlama gibi üst seviye etkenlerini değil; işlemci, kamera sensörü, ekran camı, motor, kompresör, pompa ve yalıtım gibi en küçük anlamlı bileşenlerini de basit dille açıklayacak şekilde genişletilecektir.

Karşılaştırma ikincil kalır. Ana deneyim; kullanıcının bir ürünün içinde ne bulunduğunu, parçanın fiyatı neden etkilediğini ve bu ek maliyetin günlük kullanımda gerçekten karşılığı olup olmadığını anlamasıdır.

## Kategori Yapısı

Dokuz ana ürün kategorisi bulunur:

1. Telefon
2. Kamera
3. Televizyon
4. Buzdolabı
5. Çamaşır makinesi
6. Bulaşık makinesi
7. Kurutma makinesi
8. Fırın
9. Klima

Mevcut `beyaz-esya` adresi silinmez. Altı ev teknolojisi kategorisini tanıtan bir üst/indeks sayfasına dönüşür. Eski bağlantılar böylece bozulmaz. Mevcut beyaz eşya terimleri uygun alt kategorilerle ilişkilendirilir; ortak terimler birden fazla kategoriye bağlanabilir.

## İçerik Hedefleri

Her ana kategoride yaklaşık olarak:

- 20 teknik terim,
- 15 fiyat faktörü,
- 3 kapsamlı rehber bulunur.

Ortak terimler ve faktörler tekrar oluşturulmaz. Örneğin inverter kontrolü klima, buzdolabı ve çamaşır makinesine; paslanmaz çelik gövde birden fazla ev teknolojisi kategorisine bağlanabilir. Bu nedenle benzersiz kayıt sayısı kategori hedeflerinin toplamından düşük olabilir, ancak her kategori kendi sayfasında hedef kapsamı sunar.

Her teknik terim mevcut içerik sözleşmesini korur:

- kısa tanım,
- günlük benzetme,
- nasıl çalıştığı,
- fiyatı neden etkilediği,
- artılar ve eksiler,
- kim önemsemeli,
- kim ekstra ödeme yapmamalı,
- fiyat etkisi, kullanıcı faydası ve önem puanları,
- kaynak durumu ve inceleme tarihi.

## Ayrıntı Seviyesi

Telefon içeriği en az şu parça sınıflarına iner: işlemci/SoC, modem, RAM, depolama, ekran paneli, ekran camı, dokunmatik katman, kamera sensörü, lens grubu, optik sabitleme, kasa ve çerçeve, batarya hücresi, şarj kontrol devresi, anten sistemi, hoparlör, mikrofon, titreşim motoru, biyometrik sensör, soğutma sistemi, bağlantı çipleri ve yazılım desteği.

Diğer kategoriler aynı ayrıntı ilkesini izler:

- Kamera: sensör, görüntü işlemci, obtüratör, sabitleme mekanizması, vizör, bağlantılar, gövde sızdırmazlığı ve lens elemanları.
- Televizyon: panel katmanları, arka aydınlatma, yerel karartma bölgeleri, görüntü işlemci, kasa, hoparlör, bağlantı kartı ve yazılım desteği.
- Buzdolabı: kompresör, soğutucu devre, evaporatör, fan, yalıtım, kapı contası, sensörler ve raf malzemesi.
- Çamaşır makinesi: motor, tambur, rulman, amortisör, pompa, rezistans, su valfi ve kontrol kartı.
- Bulaşık makinesi: sirkülasyon pompası, püskürtme kolları, filtre, rezistans/ısı pompası, sepet rayları, sensörler ve yalıtım.
- Kurutma makinesi: ısı pompası, kompresör, tambur, nem sensörü, filtre, motor ve hava kanalları.
- Fırın: rezistans, fan, sıcaklık sensörü, cam katmanları, yalıtım, pişirme haznesi ve kontrol elektroniği.
- Klima: kompresör, inverter kartı, eşanjör, fan motoru, soğutucu akışkan devresi, filtre, sensör ve iç/dış ünite yalıtımı.

## Fiyat Faktörü Taksonomisi

Fiyat faktörleri üç grupta sunulur:

### Ürünün İçindeki Parçalar

Somut bileşen, malzeme ve modüller. Kullanıcı bu grupta “ürünün içinde ne var?” sorusunun yanıtını görür.

### Üretim ve Geliştirme

Hassas üretim, kalite kontrol, Ar-Ge, yazılım geliştirme, lisanslama, sertifikasyon, enerji verimliliği çalışmaları ve düşük üretim adedi gibi maliyetler.

### Ürün Dışı Etkenler

Marka primi, PR/pazarlama, vergi, döviz kuru, lojistik, stok riski, garanti ve servis ağı.

Her faktör başlık, kısa açıklama, ayrıntılı açıklama, etki seviyesi ve kategori ilişkileri taşır. Kesin ve doğrulanmış maliyet verisi bulunmadığında yüzde gösterilmez; etki seviyesi editoryal değerlendirme olarak etiketlenir.

## İçerik Modülleri ve Veri Akışı

Tek büyük `content.js` dosyası kategori bazlı JavaScript modüllerine ayrılır. Önerilen sınırlar:

- ortak kategoriler ve kaynaklar,
- ortak fiyat faktörleri,
- kategoriye özel terimler,
- kategoriye özel rehberler,
- birleştirme ve doğrulama katmanı.

Modüller yalnızca veri tanımlar. Birleştirme katmanı benzersiz slug, zorunlu alan ve ilişki doğrulamasını gerçekleştirir. Akış `kategori içerik modülleri → birleşik içerik sözleşmesi → Prisma seed → sorgu katmanı → sayfalar` biçiminde kalır.

Seed mevcut güvenli davranışı korur: yalnızca yönetilen kayıtları upsert eder, ilgili alt satırları senkronize eder ve uygulamaya ait olmayan verileri topluca silmez. İşlem tekrar çalıştırılabilir olmalıdır.

## Okuma Süresi

Rehber okuma süresi elle girilen sabit sayıdan alınmaz. Türkçe içerik metninden deterministik biçimde hesaplanır.

- Yalnızca rehberin ana gövdesi ve bölüm metinleri sayılır.
- Başlık, kategori adı, navigasyon, kısa etiketler ve buton metinleri sayılmaz.
- Boşlukla ayrılan gerçek metin parçaları kelime kabul edilir.
- Dakikada 180 kelime varsayılır.
- Sonuç yukarı yuvarlanır ve minimum 1 dakikadır.
- Liste ve detay sayfaları aynı yardımcı fonksiyonu kullanır; böylece iki yerde farklı süre görünmez.

Veritabanındaki `readingTime` alanı geçiş süresince korunabilir ancak kullanıcı arayüzü hesaplanan değeri kullanır. Seed alanı da aynı fonksiyonla üretilerek tutarsızlık azaltılır.

## Sayfa Davranışı

Ana sayfa dokuz kategoriyi okunabilir biçimde gösterecek şekilde yeniden düzenlenir. İlk üç teknoloji kategorisi ile altı ev teknolojisi görsel gruplarla ayrılabilir; hepsi ana kategori olarak erişilebilir olur.

Kategori detayında fiyat faktörleri taksonomi gruplarıyla sunulur. Çok sayıda faktör tek bir rozet satırına sıkıştırılmaz. Parça faktörleri önce, üretim/geliştirme ikinci, ürün dışı etkenler son sırada gösterilir.

Genel beyaz eşya sayfası alt kategorilere yönlendiren açıklayıcı bir indeks olur. Arama sonuçları yeni kategori, terim, faktör ve rehberleri kapsar.

## Eksik Veri ve Geçiş Davranışı

- Bir kategoride hedef sayıya henüz ulaşılamazsa sayfa mevcut içerikle çalışır; sahte yer tutucu göstermez.
- İsteğe bağlı kaynak veya alternatif eksikse boş bölüm oluşturulmaz.
- Eski beyaz eşya slug'ı 404 üretmez.
- Ortak bir terim yalnızca bir kez adreslenir ve tüm ilgili kategorileri gösterir.
- Seed sırasında geçersiz ilişki veya yinelenen slug açıklayıcı hata ile işlemi durdurur.

## Test Stratejisi

Uygulama test güdümlü ilerler. Önce şu beklentiler başarısız testlerle tanımlanır:

- dokuz ana kategori,
- kategori başına yaklaşık 20 terim ve 3 rehber,
- kategori başına yaklaşık 15 ilişkili fiyat faktörü,
- telefonun temel parça faktörlerini içermesi,
- altı ev teknolojisi kategorisinin bulunması,
- eski `beyaz-esya` adresinin indeks davranışı,
- her terimde artı ve eksi bulunması,
- benzersiz locale/slug birleşimleri,
- okuma süresinin 180 kelime/dakika hesabı ve minimum 1 dakika davranışı,
- liste ve detay sayfasında aynı sürenin gösterilmesi,
- seed işleminin iki kez güvenle çalışması.

Son doğrulama tam test paketi, ESLint, production build, seed veri sayımları ve temiz veritabanında migration/seed kontrolünü içerir.

## Kapsam Dışı

Gerçek zamanlı mağaza fiyatları, otomatik ürün kataloğu çekme, kesin parça maliyet yüzdeleri, yönetim paneli, kullanıcı hesabı ve harici CMS bu teslimata dahil değildir.

## Kabul Ölçütleri

- Dokuz ana kategori erişilebilir ve içerik veritabanından gelir.
- Her kategori yaklaşık 20 terim, 15 fiyat faktörü ve 3 rehber sunar.
- Telefon ve diğer kategoriler anlamlı bileşen seviyesine kadar fiyat açıklaması içerir.
- Genel beyaz eşya bağlantısı alt kategorilere yönlendiren bir indeks olarak çalışır.
- Okuma süreleri içerik uzunluğundan hesaplanır ve liste/detay sayfalarında tutarlıdır.
- Mevcut dark mode, ansiklopedik okuma düzeni, arama ve tema davranışı korunur.
