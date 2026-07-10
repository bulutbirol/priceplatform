import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { searchDatabase } from "@/lib/content-queries";

const labels = { term: "Teknik terim", guide: "Rehber", category: "Kategori", "pricing-factor": "Fiyat faktörü" };
function hrefFor(result, locale) {
  if (result.summary) return `/${locale}/terms/${result.slug}`;
  if (result.readingTime) return `/${locale}/guides/${result.slug}`;
  if (result.impact) return `/${locale}/pricing-factors#${result.slug}`;
  if (result.eyebrow) return `/${locale}/categories/${result.slug}`;
  return `/${locale}/pricing-factors#markalar`;
}
export default async function SearchPage({ params, searchParams }) {
  const { locale } = await params; const query = (await searchParams).q ?? ""; const results = await searchDatabase(query, locale);
  return <div className="search-page shell section-space"><header className="listing-hero"><p className="eyebrow">Sade teknoloji sözlüğü</p><h1>Arama</h1><p>Bir özellik, ürün kategorisi, rehber veya fiyat faktörü yaz. Teknik dili birlikte çözelim.</p>
    <form className="search-page__form"><Search /><input aria-label="Arama terimi" name="q" defaultValue={query} placeholder="Örn. indüksiyon, OLED, marka primi" /><button>Ara <ArrowRight /></button></form></header>
    {query && <div className="search-results"><p className="kicker">“{query}” için {results.length} sonuç</p>{results.length ? results.map((result) => <Link href={hrefFor(result, locale)} key={`${result.id}-${result.slug}`}><span>{labels[result.contentType] || (result.name ? "Marka" : "İçerik")}</span><div><h2>{result.title || result.name}</h2><p>{result.shortDescription || result.summary || result.positioning}</p></div><ArrowRight /></Link>) : <div className="empty-state"><h2>Henüz bir eşleşme yok.</h2><p>Daha kısa bir terim deneyebilir veya kategorilerden başlayabilirsin.</p><Link href={`/${locale}/categories`}>Kategorileri keşfet</Link></div>}</div>}
  </div>;
}
