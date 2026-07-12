# Fiyatın Anatomisi

Bu projeyi, alışveriş yaparken bir ürüne neden daha fazla para verdiğimizi daha kolay anlayabilmek için hazırladım. Telefonlardan beyaz eşyalara kadar ürünlerin parçalarını, teknik özelliklerini ve fiyatı değiştiren diğer etkenleri bir arada topluyor.

![Kategori görünümü](docs/screenshots/category-tree.png)

## Kurulum

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

## Komutlar

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

`.env.example` dosyasını `.env` adıyla kopyalamak yeterli. İçerikler şimdilik ağırlıklı olarak Türkçe.
