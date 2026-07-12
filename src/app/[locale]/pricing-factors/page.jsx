import { getAllBrands, getAllFactors } from "@/lib/content-queries";
import { groupPriceFactors } from "@/lib/content-grouping";
import { getUiCopy } from "@/lib/ui-copy";

export default async function PricingFactorsPage({ params }) {
  const { locale } = await params;
  const [factors, brands] = await Promise.all([getAllFactors(locale), getAllBrands(locale)]);
  const copy = getUiCopy(locale).pricing;
  const groups = groupPriceFactors(factors).map((group) => ({ ...group, title: copy.layers[group.slug][0], description: copy.layers[group.slug][1] }));

  return <div className="listing-page shell section-space">
    <header className="listing-hero"><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.lead}</p></header>
    <nav className="section-jump" aria-label={copy.nav}>{groups.map((group) => <a href={`#${group.slug}`} key={group.slug}>{group.title}<span>{group.items.length}</span></a>)}</nav>
    <div className="disclosure-catalog">{groups.map((group, groupIndex) => <details id={group.slug} key={group.slug} open={groupIndex === 0}>
      <summary><span>0{groupIndex + 1}</span><div><h2>{group.title}</h2><p>{group.description}</p></div><strong>{group.items.length}</strong></summary>
      <div className="factor-catalog">{group.items.map((factor, index) => <article id={factor.slug} key={factor.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{factor.impact} {copy.effect}</small><h3>{factor.title}</h3><p>{factor.shortDescription}</p></div></article>)}</div>
    </details>)}</div>
    <aside className="estimate-disclaimer">{copy.disclaimer}</aside>
    <details id="markalar" className="brand-section brand-section--disclosure"><summary><div><p className="eyebrow">{copy.brands}</p><h2>{copy.brandTitle}</h2></div><strong>{brands.length}</strong></summary><p>{copy.brandLead}</p><div>{brands.map((brand) => <article key={brand.id}><h3>{brand.name}</h3><p>{brand.positioning}</p></article>)}</div></details>
  </div>;
}
