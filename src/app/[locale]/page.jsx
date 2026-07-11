import Link from "next/link";
import { ArrowDownRight, ArrowRight, BookOpen, Clock3, Search, Sparkles } from "lucide-react";
import { CategoryIllustration } from "@/components/visuals/category-illustration";
import { PriceAnatomy } from "@/components/visuals/price-anatomy";
import { getHomeContent } from "@/lib/content-queries";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const { categories, terms, pricingFactors, guides, comparisons } = await getHomeContent(locale);

  return (
    <div className="home-page">
      <section className="home-hero shell">
        <div className="home-hero__copy reveal">
          <div className="eyebrow"><Sparkles size={15} /> Teknolojiyi değil, değerini oku</div>
          <h1>Bir ürünün fiyatında <em>ne var?</em></h1>
          <p className="home-hero__lead">
            Karmaşık teknik terimleri, marka etkisini ve pazarlama payını sadeleştiriyoruz.
            Neye para verdiğini birkaç dakikada anla.
          </p>
          <form action={`/${locale}/search`} className="hero-search">
            <Search aria-hidden="true" size={20} />
            <input name="q" aria-label="Teknoloji ara" placeholder="OLED, inverter, sensör boyutu…" />
            <button type="submit">Açıkla <ArrowRight size={17} /></button>
          </form>
          <div className="hero-proof" aria-label="Platform içeriği">
            <span><strong>465</strong> teknik terim</span>
            <span><strong>48</strong> sade rehber</span>
            <span><strong>9</strong> ürün dünyası</span>
          </div>
        </div>
        <div className="home-hero__visual reveal reveal--delay">
          <PriceAnatomy />
        </div>
      </section>

      <section className="category-section shell section-space" aria-labelledby="categories-title">
        <div className="section-heading">
          <div><span className="section-index">01</span><p className="kicker">Nereden başlamak istersin?</p></div>
          <h2 id="categories-title">Ürünü seç,<br />fiyatı parçalarına ayıralım.</h2>
          <Link href={`/${locale}/categories`} className="text-link">Tüm kategoriler <ArrowRight size={16} /></Link>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link className={`category-card category-card--${category.color}`} href={`/${locale}/categories/${category.slug}`} key={category.slug}>
              <div className="category-card__meta"><span>0{index + 1}</span><small>{category.eyebrow}</small></div>
              <CategoryIllustration slug={category.slug} title={category.title} />
              <div className="category-card__copy">
                <h3>{category.title}</h3>
                <p>{category.shortDescription}</p>
              </div>
              <ArrowDownRight className="category-card__arrow" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="factor-section section-space">
        <div className="shell">
          <div className="section-heading section-heading--light">
            <div><span className="section-index">02</span><p className="kicker">Etiketi büyüten görünmez kalemler</p></div>
            <h2>Fiyat sadece<br />donanım değildir.</h2>
            <Link href={`/${locale}/pricing-factors`} className="text-link">Tüm faktörler <ArrowRight size={16} /></Link>
          </div>
          <div className="factor-list">
            {pricingFactors.map((factor, index) => (
              <article className="factor-row" key={factor.slug}>
                <span>0{index + 1}</span>
                <h3>{factor.title}</h3>
                <p>{factor.shortDescription}</p>
                <small>Etki: {factor.impact}</small>
              </article>
            ))}
          </div>
          <p className="editorial-note">Etki seviyeleri kesin maliyet oranı değil, açıklamalı editoryal değerlendirmedir.</p>
        </div>
      </section>

      <section className="term-section shell section-space">
        <div className="section-heading">
          <div><span className="section-index">03</span><p className="kicker">30 saniyede öğren</p></div>
          <h2>Terimler gözünü<br />korkutmasın.</h2>
          <Link href={`/${locale}/search`} className="text-link">Bir terim ara <ArrowRight size={16} /></Link>
        </div>
        <div className="term-grid">
          {terms.map((term, index) => (
            <Link href={`/${locale}/terms/${term.slug}`} className="term-card" key={term.slug}>
              <span className="term-card__number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{term.title}</h3>
              <p>{term.shortDescription}</p>
              <span className="term-card__cta">Basitçe öğren <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="guide-section shell section-space">
        <div className="guide-intro">
          <span className="section-index">04</span>
          <p className="kicker">Satın almadan önce</p>
          <h2>Rakamları değil,<br /><em>ihtiyacını</em> karşılaştır.</h2>
          <p>En pahalı ürünü değil, sana gerçekten fayda sağlayan teknolojiyi bul.</p>
          <Link className="button button--dark" href={`/${locale}/guides`}>Tüm rehberler <ArrowRight size={17} /></Link>
        </div>
        <div className="guide-list">
          {guides.map((guide) => (
            <Link href={`/${locale}/guides/${guide.slug}`} className="guide-row" key={guide.slug}>
              <div className="guide-row__icon"><BookOpen size={21} /></div>
              <div><small>{guide.category.title}</small><h3>{guide.title}</h3><p>{guide.shortDescription}</p></div>
              <span className="guide-row__time"><Clock3 size={14} /> {guide.readingTime} dk</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="comparison-strip shell section-space">
        <div><p className="kicker">Yan işlev, net cevap</p><h2>Kararsız kaldığında<br />yan yana koy.</h2></div>
        <div className="comparison-links">
          {comparisons.map((comparison) => (
            <Link href={`/${locale}/comparisons/${comparison.slug}`} key={comparison.slug}>
              <span>{comparison.title}</span><ArrowRight size={17} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
