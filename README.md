# Fiyatın Anatomisi

Teknolojik ürünlerin neden farklı fiyatlara satıldığını anlatan bir web projesi.

Telefon, bilgisayar, kamera, beyaz eşya ve evde kullanılan diğer elektronik ürünlerde parçaların, yazılımın, marka konumlandırmasının ve satış maliyetlerinin etikete nasıl yansıdığını sade bir dille açıklamayı amaçlıyor.

![Kategori görünümü](docs/screenshots/category-tree.png)

## Kurulum

Node.js 20 veya 22 gereklidir.

```bash
npm install
```

`.env.example` dosyasını `.env` adıyla kopyaladıktan sonra veritabanını hazırlayın:

```bash
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Türkçe arayüz `http://localhost:3000/tr`, İngilizce arayüz ise `http://localhost:3000/en` adresindedir.

## Komutlar

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

## Teknik yapı

Next.js, React, JavaScript, Tailwind CSS, Prisma ve SQLite kullanılıyor. Birim testleri Vitest ve Testing Library, tarayıcı testleri Playwright ile çalışıyor.

İçeriklerin büyük bölümü şu anda Türkçe. İngilizce sayfalarda çevrilmemiş yazılar Türkçe olarak gösteriliyor.
