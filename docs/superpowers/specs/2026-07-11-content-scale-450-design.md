# 450 Terim Ölçeğinde İçerik Genişletme Tasarımı

## Amaç

Dokuz ana ürün kategorisinin her biri 50 teknik terim, 30 fiyat faktörü ve 5 rehber sunacak biçimde genişletilecektir. Amaç yalnızca kayıt sayısını artırmak değil; ürünün içindeki küçük parçalardan bakım ve kullanım ömrüne kadar fiyatı açıklayan kapsamlı bir Türkçe başvuru kaynağı oluşturmaktır.

## Hedef Hacim

- Dokuz ana kategoride kategori başına 50 terim.
- En az 450 kategori-terim ilişkisi.
- Kategori başına 30 fiyat faktörü ve toplam en az 270 kategori-faktör ilişkisi.
- Kategori başına 5 rehber ve toplam 45 ana kategori rehberi.
- `beyaz-esya` üst indeksi ana kategori sayımlarına dahil edilmez; eski üç genel rehber ve ortak terimler geçiş içeriği olarak korunabilir.

Ortak bir terim birden fazla kategoriyle ilişkilendirilebilir. Bu nedenle benzersiz terim kaydı sayısı 450’den düşük olabilir; ancak her kategori sayfasında 50 farklı terim görünmelidir.

## İçerik Taksonomisi

Her kategorinin terimleri beş dengeli gruba ayrılır:

1. Ürünün içindeki parçalar ve malzemeler.
2. Teknoloji ve çalışma prensipleri.
3. Üretim, kalite kontrol ve dayanıklılık.
4. Enerji, bakım, arıza ve kullanım ömrü.
5. Yazılım, bağlantı, servis ve satın alma kararları.

Fiyat faktörleri üç ana grubu korur: parça/malzeme, üretim/geliştirme ve ürün dışı etkenler. Marka, PR, vergi, kur, lojistik ve servis tüm kategorilerde görünür; kategoriye özel 15 ek faktörle toplam en az 30 faktöre ulaşılır.

## İçerik Kalitesi

Her yeni terim kendine özgü şu alanları taşır:

- basit tanım,
- günlük benzetme,
- nasıl çalıştığı,
- fiyatı neden etkilediği,
- somut artı,
- somut eksi,
- kim önemsemeli,
- kim ekstra ödeme yapmamalı,
- editoryal etki puanları.

Aynı jenerik cümle farklı terimlere kopyalanmaz. Açıklama, parçanın gerçek görevini ve kullanıcıya etkisini belirtir. Doğrulanmış maliyet yüzdesi bulunmadığında yüzde gösterilmez.

## Veri Mimarisi

Mevcut kategori genişleme modülü, kategori başına ayrı terim ve faktör veri bloklarına ayrılır. Ortak üretici yardımcıları yalnızca kimlik, tarih, puan aralığı ve zorunlu alanları üretir; açıklama metinlerini üretmez.

Birleştirme katmanı şu kontrolleri yapar:

- locale/slug benzersizliği,
- kategori ilişkilerinin geçerliliği,
- zorunlu açıklama alanları,
- artı ve eksi varlığı,
- kategori başına hedef sayılar,
- aynı açıklamanın farklı terimlerde tekrar edilmemesi.

Prisma şeması değişmez. Seed mevcut upsert ve ilişki senkronizasyonu davranışını korur.

## Sayfa Deneyimi

Kategori sayfasında 50 terim tek ve uzun bir duvar olarak sunulmaz. Terimler beş konu grubuna ayrılır ve her grupta başlık, kısa açıklama ve ilgili terim listesi bulunur. Varsayılan sunum tüm içeriği erişilebilir tutar; arama ve bağlantılar JavaScript olmadan da çalışır.

Fiyat faktörleri parça/malzeme, üretim/geliştirme ve ürün dışı etkenler başlıkları altında gruplanır. Ürün karşılaştırmaları ikincil kalır.

Yeni iki rehber kategoriye özgü olur: biri bakım/kullanım ömrü, diğeri gereksiz özelliklere para vermeme odağında hazırlanır. Okuma süresi mevcut kelime hesabından üretilir.

## Test Stratejisi

- Dokuz ana kategorinin her birinde tam 50 terim görünmesi.
- Her ana kategoride en az 30 fiyat faktörü ve 5 rehber bulunması.
- Toplam kategori-terim ilişkisinin en az 450 olması.
- Slug ve açıklama tekrarlarının bulunmaması.
- Her terimin artı, eksi, benzetme ve hedef kullanıcı alanlarının dolu olması.
- Seed’in iki kez güvenle çalışması.
- Kategori gruplarının ve yeni rehberlerin sayfa testleri.
- Tam test, lint, production build ve Prisma ilişki sayımları.

## Kapsam Dışı

Gerçek zamanlı fiyat verileri, kesin parça maliyet yüzdeleri, otomatik web içeriği kopyalama, yönetim paneli ve harici CMS bu genişlemeye dahil değildir.

## Kabul Ölçütleri

- Her ana kategori 50 terim, en az 30 faktör ve 5 rehber sunar.
- İçerik beş anlaşılır konu grubunda taranabilir.
- Yeni metinler terime özgüdür ve basit Türkçe kullanır.
- Okuma süreleri kelime sayısından hesaplanır.
- Arama, dark mode, ansiklopedik okuma düzeni ve eski beyaz eşya indeksi çalışmaya devam eder.
