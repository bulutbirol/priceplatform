import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { getHomeContent } from "@/lib/content-queries";
import { homeCopy, localizeGroups } from "@/lib/locale-copy";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const copy = homeCopy[locale] || homeCopy.tr;
  const { groups: sourceGroups } = await getHomeContent(locale);
  const groups = localizeGroups(sourceGroups, locale);
  const destinations = ["pricing-factors", "guides", "comparisons"];

  return <div className="catalog-home">
    <section className="catalog-intro shell">
      <p className="catalog-intro__eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.lead}</p>
      {copy.translationNotice && <aside className="translation-notice">{copy.translationNotice}</aside>}
      <form action={`/${locale}/search`} className="catalog-search"><Search aria-hidden="true" size={21} /><input name="q" aria-label={copy.searchLabel} placeholder={copy.placeholder} /><button type="submit">{copy.search} <ArrowRight size={17} /></button></form>
      <div className="catalog-stats" aria-label={locale === "en" ? "Platform content" : "Platform içeriği"}><span><strong>9</strong> {copy.stats[0]}</span><span><strong>72</strong> {copy.stats[1]}</span><span><strong>1700+</strong> {copy.stats[2]}</span></div>
    </section>
    <section className="product-catalog shell" aria-label={copy.catalog}>{groups.map((group, index) => <Link href={`/${locale}/groups/${group.slug}`} className="group-catalog-item" key={group.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{group.title}</h2><p>{group.description}</p><small>{group._count.categories} {copy.stats[1]}</small></div><ArrowRight aria-hidden="true" /></Link>)}</section>
    <section className="catalog-next shell" aria-labelledby="catalog-next-title"><div><p className="kicker">{copy.deeper}</p><h2 id="catalog-next-title">{copy.nextTitle}</h2></div><div className="catalog-next__links">{copy.links.map(([title, description], index) => <Link href={`/${locale}/${destinations[index]}`} key={title}><span><strong>{title}</strong><small>{description}</small></span><ArrowRight /></Link>)}</div></section>
  </div>;
}
