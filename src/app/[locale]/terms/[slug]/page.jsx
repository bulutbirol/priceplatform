import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleInfobox, ArticleSection, ProsCons, ReadingLayout } from "@/components/reading/article-layout";
import { TermDiagram } from "@/components/visuals/term-diagram";
import { getTermBySlug } from "@/lib/content-queries";

function ImpactScale({ label, value }) {
  return <div><dt>{label}</dt><dd>{value}/5</dd></div>;
}

export default async function TermPage({ params }) {
  const { locale, slug } = await params;
  const term = await getTermBySlug(slug, locale);
  if (!term) notFound();

  const category = term.categories[0]?.category;
  const reviewedAt = new Intl.DateTimeFormat("tr-TR").format(term.reviewedAt);
  const toc = [
    { id: "kisa-ozet", label: "Kısaca" },
    { id: "nasil-calisir", label: "Nasıl çalışır?" },
    { id: "fiyat-etkisi", label: "Fiyatı neden etkiler?" },
    { id: "artilar-eksiler", label: "Artıları ve eksileri" },
    { id: "kim-onemsemeli", label: "Kim önemsemeli?" },
    { id: "degerlendirme", label: "Editoryal değerlendirme" },
    { id: "kaynaklar", label: "Kaynaklar" },
  ];

  const infobox = (
    <ArticleInfobox items={[
      { label: "Terim", value: term.title },
      { label: "Kategori", value: category?.title },
      { label: "Fiyata etkisi", value: `${term.priceImpact}/5` },
      { label: "Kullanıcı faydası", value: `${term.userBenefit}/5` },
      { label: "Son inceleme", value: reviewedAt },
    ]} />
  );

  return (
    <article className="term-page encyclopedia-page">
      <header className="article-header shell">
        <Link href={`/${locale}/categories/${category?.slug || "telefonlar"}`} className="back-link"><ArrowLeft size={15} /> Kategoriye dön</Link>
        <p className="article-kicker">Teknoloji sözlüğü</p>
        <h1>{term.title}</h1>
        <p className="article-lead">{term.summary}</p>
        <div className="article-categories">
          {term.categories.map(({ category: item }) => <Link key={item.slug} href={`/${locale}/categories/${item.slug}`}>{item.title}</Link>)}
        </div>
      </header>

      <ReadingLayout title={term.title} toc={toc} infobox={infobox}>
        <ArticleSection id="kisa-ozet" title="Kısaca">
          <p className="article-analogy"><strong>Basit benzetme:</strong> {term.analogy}</p>
          <TermDiagram term={term} />
        </ArticleSection>

        <ArticleSection id="nasil-calisir" title="Nasıl çalışır?">
          <p>{term.howItWorks}</p>
        </ArticleSection>

        <ArticleSection id="fiyat-etkisi" title="Fiyatı neden etkiler?">
          <p>{term.whyPriceMatters}</p>
        </ArticleSection>

        <ArticleSection id="artilar-eksiler" title="Artıları ve eksileri">
          <ProsCons advantages={term.advantages} disadvantages={term.disadvantages} />
        </ArticleSection>

        <ArticleSection id="kim-onemsemeli" title="Kim önemsemeli?">
          <h3>Önem vermesi gerekenler</h3>
          <p>{term.whoShouldCare}</p>
          <h3>Kim ekstra para vermemeli?</h3>
          <p>{term.whoCanSkip}</p>
        </ArticleSection>

        <ArticleSection id="degerlendirme" title="Editoryal değerlendirme">
          <p className="article-note">Bu puanlar mutlak teknik ölçüm değil, ortalama kullanım için açıklamalı değerlendirmedir.</p>
          <dl className="article-impact-list">
            <ImpactScale label="Fiyata etkisi" value={term.priceImpact} />
            <ImpactScale label="Kullanıcı faydası" value={term.userBenefit} />
            <ImpactScale label="Ortalama kullanıcı için önem" value={term.importanceForAverageUsers} />
          </dl>
        </ArticleSection>

        <ArticleSection id="kaynaklar" title="Kaynaklar">
          <p className="article-note">Bu ilk içerik paketi editoryal taslaktır. Üretici ve standart belgeleri terim bazında eşleştirilmeden yayımlanmış teknik kaynak olarak değerlendirilmemelidir.</p>
          <p>Son gözden geçirilme: {reviewedAt}</p>
          <div className="article-sources">{term.sources.map(({ source }) => <Link href={source.url} key={source.id}>{source.publisher} · {source.title}</Link>)}</div>
        </ArticleSection>
      </ReadingLayout>
    </article>
  );
}
