import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CircleDollarSign, Scale } from "lucide-react";
import { CategoryIllustration } from "@/components/visuals/category-illustration";
import { getCategoryBySlug } from "@/lib/content-queries";

export default async function CategoryPage({ params }) {
  const { locale, slug } = await params;
  const category = await getCategoryBySlug(slug, locale);
  if (!category) notFound();

  return (
    <div className="category-page">
      <header className="category-hero shell">
        <div><p className="eyebrow">Ürün dünyası · {category.terms.length} terim</p><h1>{category.title}</h1><p>{category.body}</p></div>
        <CategoryIllustration slug={category.slug} title={category.title} />
      </header>
      <section className="category-factor-band"><div className="shell">
        <div className="category-factor-band__intro"><CircleDollarSign /><p className="kicker">Bu kategoride fiyatı ne büyütür?</p><h2>Etiketin görünmeyen tarafı</h2></div>
        <div className="category-factor-chips">{category.priceFactors.map(({ priceFactor }) => <span key={priceFactor.slug}><strong>{priceFactor.title}</strong><small>{priceFactor.impact} etki</small></span>)}</div>
        <p className="editorial-note">Etki seviyeleri editoryal değerlendirmedir; kesin maliyet oranı değildir.</p>
      </div></section>
      <section className="category-terms shell section-space">
        <div className="section-heading"><div><span className="section-index">01</span><p className="kicker">Teknoloji sözlüğü</p></div><h2>Terimi öğren,<br />pazarlamayı ayıkla.</h2></div>
        <div className="category-term-list">{category.terms.map(({ term }, index) => <Link href={`/${locale}/terms/${term.slug}`} key={term.slug}>
          <span>{String(index + 1).padStart(2, "0")}</span><div><h3>{term.title}</h3><p>{term.shortDescription}</p></div>
          <div className="mini-tradeoff"><small>+</small>{term.advantages[0]?.text}<small>−</small>{term.disadvantages[0]?.text}</div><ArrowRight aria-hidden="true" />
        </Link>)}</div>
      </section>
      <section className="category-guides shell section-space">
        <div className="category-guides__intro"><BookOpen /><p className="kicker">Satın alma rehberleri</p><h2>Bilgiyi karara dönüştür.</h2><p>Teknik özellikleri tek başına değil, kullanım amacın ve toplam maliyetle birlikte düşün.</p></div>
        <div className="category-guide-cards">{category.guides.map((guide, index) => <Link href={`/${locale}/guides/${guide.slug}`} key={guide.slug}>
          <span>Rehber 0{index + 1}</span><h3>{guide.title}</h3><p>{guide.shortDescription}</p><strong>Okumaya başla <ArrowRight /></strong>
        </Link>)}</div>
      </section>
      <section className="category-value shell"><Scale /><div><p className="kicker">Kısa kural</p><h2>En pahalı özellik,<br />sana en faydalı özellik olmayabilir.</h2></div></section>
    </div>
  );
}
