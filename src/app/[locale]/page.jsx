import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { CategoryBrowser } from "@/components/catalog/category-browser";
import { categoryTree } from "@/lib/category-tree";
import { homeCopy, localizeGroups } from "@/lib/locale-copy";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const copy = homeCopy[locale] || homeCopy.tr;
  const tree = localizeGroups(categoryTree, locale);
  const destinations = ["pricing-factors", "guides", "comparisons"];
  const stats = locale === "en" ? [9, 88, 8] : [9, 88, "1400+"];

  return <div className="catalog-home">
    <section className="catalog-intro shell">
      <p className="catalog-intro__eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.lead}</p>
      {copy.translationNotice && <aside className="translation-notice">{copy.translationNotice}</aside>}
      <form action={`/${locale}/search`} className="catalog-search"><Search aria-hidden="true" size={21} /><input name="q" aria-label={copy.searchLabel} placeholder={copy.placeholder} /><button type="submit">{copy.search} <ArrowRight size={17} /></button></form>
      <div className="catalog-stats" aria-label={locale === "en" ? "Platform content" : "Platform içeriği"}>{stats.map((value, index) => <span key={copy.stats[index]}><strong>{value}</strong> {copy.stats[index]}</span>)}</div>
    </section>
    <div className="shell"><CategoryBrowser locale={locale} tree={tree} /></div>
    <section className="catalog-next shell" aria-labelledby="catalog-next-title"><div><p className="kicker">{copy.deeper}</p><h2 id="catalog-next-title">{copy.nextTitle}</h2></div><div className="catalog-next__links">{copy.links.map(([title, description], index) => <Link href={`/${locale}/${destinations[index]}`} key={title}><span><strong>{title}</strong><small>{description}</small></span><ArrowRight /></Link>)}</div></section>
  </div>;
}
