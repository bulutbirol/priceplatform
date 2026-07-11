import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { searchDatabase } from "@/lib/content-queries";
import { groupSearchResults } from "@/lib/content-grouping";

const labels = { term: "Teknik terim", guide: "Rehber", category: "Ürün türü", "pricing-factor": "Fiyat faktörü" };

function hrefFor(result, locale) {
  if (result.description && Number.isInteger(result.position)) return `/${locale}/groups/${result.slug}`;
  if (result.summary) return `/${locale}/terms/${result.slug}`;
  if (result.readingTime) return `/${locale}/guides/${result.slug}`;
  if (result.impact) return `/${locale}/pricing-factors#${result.slug}`;
  if (result.eyebrow) return `/${locale}/categories/${result.slug}`;
  return `/${locale}/pricing-factors#markalar`;
}

export default async function SearchPage({ params, searchParams }) {
  const { locale } = await params;
  const query = (await searchParams).q ?? "";
  const results = await searchDatabase(query, locale);
  const resultGroups = groupSearchResults(results);

  return <div className="search-page shell section-space">
    <header className="listing-hero"><p className="eyebrow">Tüm ev teknolojileri</p><h1>Arama</h1><p>Bir ürün, parça, teknoloji, rehber veya fiyat faktörü yaz.</p>
      <form className="search-page__form"><Search /><input aria-label="Arama terimi" name="q" defaultValue={query} placeholder="Örn. robot süpürge, LiDAR, inverter" /><button>Ara <ArrowRight /></button></form>
    </header>
    {query && <div className="search-results"><p className="kicker">“{query}” için {results.length} sonuç</p>{results.length ? <div className="disclosure-catalog">{resultGroups.map((group, index) => <details key={group.slug} open={index === 0}><summary><div><h2>{group.title}</h2><p>{group.items.length} eşleşme</p></div><strong>{group.items.length}</strong></summary><div className="search-result-list">{group.items.map((result) => <Link href={hrefFor(result, locale)} key={`${result.id}-${result.slug}`}>
      <span>{result.description ? "Ürün grubu" : labels[result.contentType] || (result.name ? "Marka" : "İçerik")}</span>
      <div><h3>{result.title || result.name}</h3><p>{result.description || result.shortDescription || result.summary || result.positioning}</p></div><ArrowRight />
    </Link>)}</div></details>)}</div> : <div className="empty-state"><h2>Henüz bir eşleşme yok.</h2><p>Daha kısa bir terim deneyebilir veya ürün gruplarından başlayabilirsin.</p><Link href={`/${locale}`}>Ürün gruplarını keşfet</Link></div>}</div>}
  </div>;
}
