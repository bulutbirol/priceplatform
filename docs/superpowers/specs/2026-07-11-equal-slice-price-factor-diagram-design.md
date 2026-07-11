# Eşit Dilimli Fiyat Faktörü Şeması Tasarımı

## Amaç

Kategori sayfasındaki “Bu kategoride fiyatı ne büyütür?” ve “Etiketin görünmeyen tarafı” anlatımını, fiyatı etkileyen başlıkların kolay taranabildiği dairesel bir şemaya dönüştürmek.

## Anlam ve Editoryal Kural

Şemadaki her dilim bir fiyat faktörünü temsil eder. Dilimler eşit büyüklüktedir ve maliyet yüzdesi, önem sırası veya kesin fiyat payı anlamına gelmez. Şemanın yanında açıkça şu not gösterilir: “Dilimler oran değil, fiyatı etkileyen başlıkları temsil eder.”

Bu yaklaşım; elde doğrulanmış kategori bazlı maliyet oranları bulunmadığı için yanıltıcı kesinlik oluşturmaz.

## Görsel Düzen

- Bölüm başlığı “Bu kategoride fiyatı ne büyütür?” olarak korunur.
- “Etiketin görünmeyen tarafı” kısa giriş metni olarak kullanılır.
- Sol tarafta eşit dilimli dairesel SVG şema, sağ tarafta açıklama listesi bulunur.
- Her dilim farklı fakat mevcut açık/koyu tema paletiyle uyumlu bir renk ve sıra numarası taşır.
- Açıklama listesi aynı renk/numara eşleşmesiyle faktör adını, etki seviyesini ve kısa açıklamasını gösterir.
- Tasarım düz ve editoryaldir; gölge, üç boyut etkisi, patlatılmış dilim veya animasyon kullanılmaz.

Mobil görünümde şema açıklama listesinin üzerinde yer alır. Şema kapsayıcı genişliğini aşmaz ve yatay kaydırma oluşturmaz.

## Teknik Yaklaşım

Şema React tarafından üretilen yerel SVG bileşeni olacaktır. Harici grafik kütüphanesi eklenmeyecektir. Dilim yolları faktör sayısından deterministik biçimde hesaplanır; böylece farklı kategorilerdeki faktör sayıları desteklenir.

Bileşen veri sorgulamaz. Kategori sayfası mevcut Prisma sorgusundan gelen fiyat faktörlerini bileşene aktarır. Veri modeli ve seed değişmez.

## Erişilebilirlik

- SVG açıklayıcı bir erişilebilir ada sahip olur.
- Faktörlerin metinsel listesi her zaman görünür; bilgi yalnızca renk veya şekille aktarılmaz.
- Renk-numara eşleşmesi, renk görme farklılıklarında da faktörlerin ayırt edilmesini sağlar.
- Dekoratif çizgiler ekran okuyucudan gizlenir.
- Şema notu görselin hemen yakınında bulunur.

## Eksik Veri Davranışı

Faktör listesi boşsa pasta şeması gösterilmez; mevcut sade boş durum mesajı kullanılır. Tek faktör varsa tam daire tek faktör olarak gösterilir. Çok uzun faktör adları SVG içine sıkıştırılmaz, yalnızca yan açıklama listesinde tam metinle gösterilir.

## Test Stratejisi

- Önce kategori sayfasında erişilebilir fiyat faktörü şeması ve “oran değildir” açıklamasını bekleyen başarısız test yazılır.
- Eşit dilim üretimi ayrı saf geometri fonksiyonuyla test edilir.
- Bir, dört ve değişken sayıdaki faktör için dilim sayısı doğrulanır.
- Kategori sayfası testi faktör adlarının metinsel listede kalmaya devam ettiğini doğrular.
- Tam test, lint ve production build yeniden çalıştırılır.

## Kapsam Dışı

Gerçek maliyet yüzdeleri, kullanıcı tarafından değiştirilebilir grafik, animasyon, hover ile veri gizleme, yeni veri tabanı alanları ve harici grafik paketleri bu çalışmaya dahil değildir.

## Kabul Ölçütleri

- Her kategori, mevcut fiyat faktörlerini eşit dilimli dairesel şemada gösterebilir.
- Dilim sayısı gösterilen faktör sayısına eşittir.
- Şema yüzde izlenimi vermeyen açık bir editoryal not taşır.
- Faktör adları ve açıklamaları şemadan bağımsız olarak okunabilir.
- Açık/koyu tema ve mobil yerleşim erişilebilir ve taşmasızdır.
