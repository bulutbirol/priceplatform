import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CircleDollarSign, Scale } from "lucide-react";
import { CategoryIllustration } from "@/components/visuals/category-illustration";
import { ProductExplainer } from "@/components/catalog/product-explainer";
import { getAllCategories, getCategoryBySlug } from "@/lib/content-queries";
import { groupPriceFactors } from "@/lib/content-grouping";
import { getUiCopy } from "@/lib/ui-copy";

export default async function CategoryPage({ params }) {
  const { locale, slug } = await params;
  const category = await getCategoryBySlug(slug, locale);
  if (!category) notFound();
  const copy = getUiCopy(locale).category;

  if (slug === "beyaz-esya") {
    const applianceCategories = (await getAllCategories(locale)).filter((item) => ["buzdolaplari", "camasir-makineleri", "bulasik-makineleri", "kurutma-makineleri", "firinlar", "klimalar"].includes(item.slug));
    return <div className="listing-page shell section-space">
      <header className="listing-hero"><p className="eyebrow">{copy.applianceEyebrow}</p><h1>{copy.appliances}</h1><p>{copy.applianceLead}</p></header>
      <div className="category-grid">{applianceCategories.map((item, index) => <Link className={`category-card category-card--${item.color}`} href={`/${locale}/categories/${item.slug}`} key={item.slug}>
        <div className="category-card__meta"><span>{String(index + 1).padStart(2, "0")}</span><small>{item._count.terms} terim · {item._count.guides} rehber</small></div>
        <CategoryIllustration slug={item.slug} title={item.title} />
        <div className="category-card__copy"><h2>{item.title}</h2><p>{item.shortDescription}</p></div>
        <ArrowRight className="category-card__arrow" aria-hidden="true" />
      </Link>)}</div>
    </div>;
  }

  const termGroupTitles = copy.groups;
  const groupedTerms = termGroupTitles.map((title, groupIndex) => ({
    title,
    terms: category.terms.slice(groupIndex * 10, groupIndex * 10 + 10),
  })).filter((group) => group.terms.length > 0);
  const groupedFactors = groupPriceFactors(category.priceFactors.map(({ priceFactor }) => priceFactor));

  return (
    <div className="category-page">
      <header className="category-hero shell">
        <div><p className="eyebrow">{copy.world} · {category.terms.length} {copy.term}</p><h1>{category.title}</h1><p>{category.body}</p></div>
        <CategoryIllustration slug={category.slug} title={category.title} />
      </header>
      <ProductExplainer title={category.title} terms={category.terms} locale={locale} />
      <section className="category-factor-band"><div className="shell">
        <div className="category-factor-band__intro"><CircleDollarSign /><p className="kicker">{copy.priceQuestion}</p><h2>{copy.hiddenSide}</h2></div>
        <div className="compact-disclosures">{groupedFactors.map((group, index) => <details key={group.slug} open={index === 0}><summary><span>{group.title}</span><small>{group.items.length} {copy.factor}</small></summary><div className="category-factor-chips">{group.items.map((factor) => <span key={factor.slug}><strong>{factor.title}</strong><small>{factor.impact} {copy.effect}</small></span>)}</div></details>)}</div>
        <p className="editorial-note">{copy.estimate}</p>
      </div></section>
      <section className="category-terms shell section-space">
        <div className="section-heading"><div><span className="section-index">02</span><p className="kicker">{copy.glossary}</p></div><h2>{copy.learn}<br />{copy.filterMarketing}</h2></div>
        <div className="category-term-groups">{groupedTerms.map((group, groupIndex) => <details key={group.title} open={groupIndex === 0}>
          <summary><span>0{groupIndex + 1}</span><h3>{group.title}</h3><small>{group.terms.length} {copy.term}</small></summary>
          <div className="category-term-list">{group.terms.map(({ term }, index) => <Link href={`/${locale}/terms/${term.slug}`} key={term.slug}>
            <span>{String(groupIndex * 10 + index + 1).padStart(2, "0")}</span><div><h3>{term.title}</h3><p>{term.shortDescription}</p></div>
            <div className="mini-tradeoff"><small>+</small>{term.advantages[0]?.text}<small>−</small>{term.disadvantages[0]?.text}</div><ArrowRight aria-hidden="true" />
          </Link>)}</div>
        </details>)}</div>
      </section>
      <section className="category-guides shell section-space">
        <div className="category-guides__intro"><BookOpen /><p className="kicker">{copy.guides}</p><h2>{copy.decision}</h2><p>{copy.guideLead}</p></div>
        <div className="category-guide-cards">{category.guides.map((guide, index) => <Link href={`/${locale}/guides/${guide.slug}`} key={guide.slug}>
          <span>{copy.guide} 0{index + 1}</span><h3>{guide.title}</h3><p>{guide.shortDescription}</p><strong>{copy.start} <ArrowRight /></strong>
        </Link>)}</div>
      </section>
      <section className="category-value shell"><Scale /><div><p className="kicker">{copy.rule}</p><h2>{copy.ruleText}</h2></div></section>
    </div>
  );
}
