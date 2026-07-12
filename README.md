# Fiyatın Anatomisi

Fiyatın Anatomisi, evde kullanılan teknoloji ürünlerinin neden farklı fiyatlara satıldığını sade bir dille anlatan bir ürün rehberidir. Katalog; mağazada görülen özelliklerden başlayıp parça, yazılım, enerji tüketimi, servis, marka ve satış maliyetlerine doğru ilerler.

Türkçe katalog telefon, bilgisayar donanımı, görüntü ve ses sistemleri, beyaz eşya, küçük ev aletleri, akıllı ev, kişisel bakım ve bahçe ekipmanlarını kapsar. İngilizce sürümde gezinme, temel ürün sayfaları, fiyat faktörleri ve yayın bilgileri bulunur.

## Teknik yapı

- Next.js ve React
- Tailwind CSS
- next-intl ile Türkçe ve İngilizce arayüz
- Prisma ve PostgreSQL ile geri bildirim kaydı
- Vitest ve Playwright

Katalog içeriği uygulamayla birlikte derlenir. Veritabanı yalnızca geri bildirim formu için kullanılır.

## Kurulum

```bash
npm install
npm run db:migrate
npm run dev
```

Başlamadan önce `.env.example` dosyasını `.env` olarak kopyalayıp PostgreSQL bağlantı bilgilerini doldurmak gerekir.

## Kontroller

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

## Vercel'e yayınlama

1. GitHub reposunu Vercel'e aktarın.
2. Vercel Marketplace içinden Neon entegrasyonunu projeye bağlayın.
3. Neon'un havuzlanmış bağlantısını `DATABASE_URL`, doğrudan bağlantısını `DIRECT_URL` olarak Production, Preview ve Development ortamlarına ekleyin.
4. İsterseniz `NEXT_PUBLIC_SITE_URL` değerini Vercel'in verdiği üretim adresiyle güncelleyin.
5. Deploy işlemini başlatın. `vercel-build` komutu migration'ı uygular ve üretim build'ini oluşturur.

Özel alan adı zorunlu değildir. Vercel proje adına göre herkese açık bir `.vercel.app` adresi verir.
