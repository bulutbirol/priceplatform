import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CircleDollarSign, Scale } from "lucide-react";
import { CategoryIllustration } from "@/components/visuals/category-illustration";
import { getAllCategories, getCategoryBySlug } from "@/lib/content-queries";

export default async function CategoryPage({ params }) {
  const { locale, slug } = await params;
  const category = await getCategoryBySlug(slug, locale);
  if (!category) notFound();

  if (slug === "beyaz-esya") {
    const applianceCategories = (await getAllCategories(locale)).filter((item) => ["buzdolaplari", "camasir-makineleri", "bulasik-makineleri", "kurutma-makineleri", "firinlar", "klimalar"].includes(item.slug));
    return <div className="listing-page shell section-space">
      <header className="listing-hero"><p className="eyebrow">Altı ayrı ürün dünyası</p><h1>Beyaz Eşya</h1><p>Her cihazın parçaları, enerji kullanımı ve fiyat yapısı farklıdır. İncelemek istediğin ürünü seç.</p></header>
      <div className="category-grid">{applianceCategories.map((item, index) => <Link className={`category-card category-card--${item.color}`} href={`/${locale}/categories/${item.slug}`} key={item.slug}>
        <div className="category-card__meta"><span>{String(index + 1).padStart(2, "0")}</span><small>{item._count.terms} terim · {item._count.guides} rehber</small></div>
        <CategoryIllustration slug={item.slug} title={item.title} />
        <div className="category-card__copy"><h2>{item.title}</h2><p>{item.shortDescription}</p></div>
        <ArrowRight className="category-card__arrow" aria-hidden="true" />
      </Link>)}</div>
    </div>;
  }

  const termGroupTitles = ["Parçalar ve malzemeler", "Çalışma prensipleri", "Üretim ve dayanıklılık", "Enerji, bakım ve ömür", "Yazılım, bağlantı ve kullanım"];
  const groupedTerms = termGroupTitles.map((title, groupIndex) => ({
    title,
    terms: category.terms.slice(groupIndex * 10, groupIndex * 10 + 10),
  }));

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
        <div className="category-term-groups">{groupedTerms.map((group, groupIndex) => <section key={group.title}>
          <header><span>0{groupIndex + 1}</span><h3>{group.title}</h3></header>
          <div className="category-term-list">{group.terms.map(({ term }, index) => <Link href={`/${locale}/terms/${term.slug}`} key={term.slug}>
            <span>{String(groupIndex * 10 + index + 1).padStart(2, "0")}</span><div><h3>{term.title}</h3><p>{term.shortDescription}</p></div>
            <div className="mini-tradeoff"><small>+</small>{term.advantages[0]?.text}<small>−</small>{term.disadvantages[0]?.text}</div><ArrowRight aria-hidden="true" />
          </Link>)}</div>
        </section>)}</div>
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
