import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { searchDatabase } from "@/lib/content-queries";
import { groupSearchResults } from "@/lib/content-grouping";
import { getUiCopy } from "@/lib/ui-copy";

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
  const copy = getUiCopy(locale).search;
  const results = await searchDatabase(query, locale);
  const resultGroups = groupSearchResults(results).map((group) => ({ ...group, title: copy.groups[group.slug] || group.title }));

  return <div className="search-page shell section-space">
    <header className="listing-hero"><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.lead}</p>
      <form className="search-page__form"><Search /><input aria-label={copy.label} name="q" defaultValue={query} placeholder={copy.placeholder} /><button>{copy.button} <ArrowRight /></button></form>
    </header>
    {query && <div className="search-results"><p className="kicker">“{query}” · {results.length} {copy.result}</p>{results.length ? <div className="disclosure-catalog">{resultGroups.map((group, index) => <details key={group.slug} open={index === 0}><summary><div><h2>{group.title}</h2><p>{group.items.length} {copy.match}</p></div><strong>{group.items.length}</strong></summary><div className="search-result-list">{group.items.map((result) => <Link href={hrefFor(result, locale)} key={`${result.id}-${result.slug}`}>
      <span>{result.description ? copy.group : copy.labels[result.contentType === "pricing-factor" ? "factor" : result.contentType] || (result.name ? copy.brand : copy.content)}</span>
      <div><h3>{result.title || result.name}</h3><p>{result.description || result.shortDescription || result.summary || result.positioning}</p></div><ArrowRight />
    </Link>)}</div></details>)}</div> : <div className="empty-state"><h2>{copy.noMatch}</h2><p>{copy.retry}</p><Link href={`/${locale}`}>{copy.explore}</Link></div>}</div>}
  </div>;
}
