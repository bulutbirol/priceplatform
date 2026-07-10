import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Lightbulb, Minus, Plus, Quote, X } from "lucide-react";
import { TermDiagram } from "@/components/visuals/term-diagram";
import { getTermBySlug } from "@/lib/content-queries";

function ImpactMeter({ label, value, hint }) {
  return (
    <div className="impact-meter">
      <div><span>{label}</span><strong>{value}/5</strong></div>
      <div className="impact-meter__track" aria-label={`${label}: 5 üzerinden ${value}`}>
        {Array.from({ length: 5 }, (_, index) => <i key={index} className={index < value ? "is-active" : ""} />)}
      </div>
      <small>{hint}</small>
    </div>
  );
}

export default async function TermPage({ params }) {
  const { locale, slug } = await params;
  const term = await getTermBySlug(slug, locale);
  if (!term) notFound();

  return (
    <article className="term-page">
      <header className="term-hero shell">
        <div className="term-hero__copy">
          <Link href={`/${locale}/categories/${term.categories[0]?.category.slug || "telefonlar"}`} className="back-link"><ArrowLeft size={15} /> Kategoriye dön</Link>
          <p className="eyebrow">Teknoloji sözlüğü · 30 saniyede</p>
          <h1>{term.title}</h1>
          <p className="term-hero__summary">{term.summary}</p>
          <div className="term-category-tags">
            {term.categories.map(({ category }) => <Link key={category.slug} href={`/${locale}/categories/${category.slug}`}>{category.title}</Link>)}
          </div>
        </div>
        <TermDiagram term={term} />
      </header>

      <div className="term-body shell">
        <section className="analogy-card">
          <Quote aria-hidden="true" />
          <div><p className="kicker">Aklında şöyle canlandır</p><h2>{term.analogy}</h2></div>
        </section>

        <div className="term-explainer-grid">
          <section><span className="explainer-icon"><Lightbulb /></span><p className="kicker">Nasıl çalışır?</p><h2>İşin basit mantığı</h2><p>{term.howItWorks}</p></section>
          <section><span className="explainer-icon"><Plus /></span><p className="kicker">Fiyatı neden etkiler?</p><h2>Etikete eklenen kısım</h2><p>{term.whyPriceMatters}</p></section>
        </div>

        <section className="tradeoff-section">
          <div className="section-mini-heading"><p className="kicker">Denge tablosu</p><h2>Kazandırdığı ve götürdüğü</h2></div>
          <div className="tradeoff-grid">
            <div className="tradeoff-card tradeoff-card--pro"><span><Check /> Fayda</span><h3>Artıları</h3><ul>{term.advantages.map((item) => <li key={item.id}><Plus />{item.text}</li>)}</ul></div>
            <div className="tradeoff-card tradeoff-card--con"><span><X /> Bedel</span><h3>Eksileri</h3><ul>{term.disadvantages.map((item) => <li key={item.id}><Minus />{item.text}</li>)}</ul></div>
          </div>
        </section>

        <section className="audience-section">
          <div className="audience-card audience-card--care"><span>EVET</span><div><p className="kicker">Kararında ağırlık ver</p><h2>Kim önemsemeli?</h2><p>{term.whoShouldCare}</p></div></div>
          <div className="audience-card audience-card--skip"><span>PAS</span><div><p className="kicker">Bütçeni başka yere ayır</p><h2>Kim ekstra para vermemeli?</h2><p>{term.whoCanSkip}</p></div></div>
        </section>

        <section className="impact-section">
          <div className="impact-section__intro"><p className="kicker">Editoryal değerlendirme</p><h2>Ne kadar fark yaratır?</h2><p>Bu puanlar mutlak teknik ölçüm değil, ortalama kullanım için açıklamalı değerlendirmedir.</p></div>
          <div className="impact-list">
            <ImpactMeter label="Fiyata etkisi" value={term.priceImpact} hint="Ürünün maliyet ve konumlandırmasına etkisi" />
            <ImpactMeter label="Kullanıcı faydası" value={term.userBenefit} hint="Doğru kullanımda hissedilen günlük katkı" />
            <ImpactMeter label="Ortalama kullanıcı için önem" value={term.importanceForAverageUsers} hint="Çoğu kişinin satın alma kararındaki ağırlığı" />
          </div>
        </section>

        <footer className="term-sources">
          <p className="kicker">Kaynak durumu ve şeffaflık</p>
          <p>Bu ilk içerik paketi editoryal taslaktır. Üretici ve standart belgeleri terim bazında eşleştirilmeden yayınlanmış teknik kaynak olarak değerlendirilmemelidir.</p>
          <p>Son gözden geçirilme: {new Intl.DateTimeFormat("tr-TR").format(term.reviewedAt)}</p>
          {term.sources.map(({ source }) => <Link href={source.url} key={source.id}>{source.publisher} · {source.title}</Link>)}
        </footer>
      </div>
    </article>
  );
}
