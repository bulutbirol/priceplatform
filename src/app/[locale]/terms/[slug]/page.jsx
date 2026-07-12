import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleInfobox, ArticleSection, ProsCons, ReadingLayout } from "@/components/reading/article-layout";
import { TermDiagram } from "@/components/visuals/term-diagram";
import { getTermBySlug } from "@/lib/content-queries";
import { getUiCopy } from "@/lib/ui-copy";

function ImpactScale({ label, value }) {
  return <div><dt>{label}</dt><dd>{value}/5</dd></div>;
}

export default async function TermPage({ params }) {
  const { locale, slug } = await params;
  const term = await getTermBySlug(slug, locale);
  if (!term) notFound();

  const ui = getUiCopy(locale);
  const copy = ui.term;
  const category = term.categories[0]?.category;
  const reviewedAt = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "tr-TR").format(term.reviewedAt);
  const toc = [
    { id: "kisa-ozet", label: copy.brief },
    { id: "nasil-calisir", label: copy.works },
    { id: "fiyat-etkisi", label: copy.price },
    { id: "artilar-eksiler", label: copy.tradeoffs },
    { id: "kim-onemsemeli", label: copy.audience },
    { id: "degerlendirme", label: copy.assessment },
    { id: "kaynaklar", label: copy.sources },
  ];

  const infobox = (
    <ArticleInfobox title={ui.article.shortInfo} items={[
      { label: copy.term, value: term.title },
      { label: copy.category, value: category?.title },
      { label: copy.impact, value: `${term.priceImpact}/5` },
      { label: copy.benefit, value: `${term.userBenefit}/5` },
      { label: copy.lastReview, value: reviewedAt },
    ]} />
  );

  return (
    <article className="term-page encyclopedia-page">
      <header className="article-header shell">
        <Link href={`/${locale}/categories/${category?.slug || "telefonlar"}`} className="back-link"><ArrowLeft size={15} /> {copy.back}</Link>
        <p className="article-kicker">{copy.kicker}</p>
        <h1>{term.title}</h1>
        <p className="article-lead">{term.summary}</p>
        <div className="article-categories">
          {term.categories.map(({ category: item }) => <Link key={item.slug} href={`/${locale}/categories/${item.slug}`}>{item.title}</Link>)}
        </div>
      </header>

      <ReadingLayout title={term.title} toc={toc} infobox={infobox} labels={ui.article}>
        <ArticleSection id="kisa-ozet" title={copy.brief}>
          <p className="article-analogy"><strong>{copy.analogy}</strong> {term.analogy}</p>
          <TermDiagram term={term} locale={locale} />
        </ArticleSection>

        <ArticleSection id="nasil-calisir" title={copy.works}>
          <p>{term.howItWorks}</p>
        </ArticleSection>

        <ArticleSection id="fiyat-etkisi" title={copy.price}>
          <p>{term.whyPriceMatters}</p>
        </ArticleSection>

        <ArticleSection id="artilar-eksiler" title={copy.tradeoffs}>
          <ProsCons advantages={term.advantages} disadvantages={term.disadvantages} labels={ui.article} />
        </ArticleSection>

        <ArticleSection id="kim-onemsemeli" title={copy.audience}>
          <h3>{copy.shouldCare}</h3>
          <p>{term.whoShouldCare}</p>
          <h3>{copy.canSkip}</h3>
          <p>{term.whoCanSkip}</p>
        </ArticleSection>

        <ArticleSection id="degerlendirme" title={copy.assessment}>
          <p className="article-note">{copy.assessmentNote}</p>
          <dl className="article-impact-list">
            <ImpactScale label={copy.impact} value={term.priceImpact} />
            <ImpactScale label={copy.benefit} value={term.userBenefit} />
            <ImpactScale label={copy.importance} value={term.importanceForAverageUsers} />
          </dl>
        </ArticleSection>

        <ArticleSection id="kaynaklar" title={copy.sources}>
          <p className="article-note">{copy.sourceNote}</p>
          <p>{copy.reviewed}: {reviewedAt}</p>
          <div className="article-sources">{term.sources.map(({ source }) => <Link href={source.url} key={source.id}>{source.publisher} · {source.title}</Link>)}</div>
        </ArticleSection>
      </ReadingLayout>
    </article>
  );
}
