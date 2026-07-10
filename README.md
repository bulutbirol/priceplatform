# Fiyatın Anatomisi

Teknolojik ürünlerin fiyatını oluşturan teknoloji, üretim, marka, pazarlama, vergi ve servis etkilerini sade Türkçe ile açıklayan bağımsız eğitim platformu.

## Teknoloji

- Next.js 16 App Router ve React 19
- JavaScript / JSX
- Tailwind CSS 4 ve semantik CSS değişkenleri
- Prisma 5 + SQLite (yerel geliştirme)
- next-intl dil yönlendirmesi
- Vitest, Testing Library ve Playwright

## Başlangıç

Node.js 22 LTS önerilir; mevcut Prisma 5 sürümü için Node 24 production hedefi değildir.

```bash
npm install
# .env dosyasına DATABASE_URL="file:./dev.db" ekleyin
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Varsayılan yerel adres `http://localhost:3000/tr` olur.

## Komutlar

```bash
npm test          # Birim ve bileşen testleri
npm run lint      # ESLint
npm run build     # Production build
npm run db:seed   # Türkçe başlangıç içeriği
npx playwright test
```

Playwright testleri mevcut production build'i 3100 portunda çalıştırır. İlk kullanımda Chromium kurulumu gerekebilir:

```bash
npx playwright install chromium
```

## İçerik modeli

Başlangıç verisi dört kategori, 60 teknik terim, 12 rehber, 10 fiyat faktörü, marka profilleri ve örnek karşılaştırmalar içerir. Terimler kategori ilişkileri, artılar, eksiler, kullanıcı yönlendirmesi, editoryal etki puanları ve kaynaklarla tutulur.

Marka primi ve PR/pazarlama değerlendirmeleri kesin maliyet yüzdesi değildir; açıklamalı editoryal değerlendirmelerdir.

## Tema

Açık, koyu ve sistem temaları desteklenir. Tercih ilk çizimden önce uygulanır ve `localStorage` içinde saklanır; böylece sayfa açılışında renk sıçraması oluşmaz.

## Yayın notları

- İlk 60 terim editoryal beta içeriğidir; üretici ve standart kaynaklarının terim bazında eşleştirilmesi yayın öncesi editoryal adımdır.
- Feedback hız sınırı tek Node instance + SQLite kurulumu için bellek içi korumadır. Çok instance veya serverless dağıtımda Redis benzeri paylaşımlı bir rate-limit deposu kullanılmalıdır.
