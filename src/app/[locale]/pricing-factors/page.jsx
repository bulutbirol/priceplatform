import { getAllBrands, getAllFactors } from "@/lib/content-queries";
import { groupPriceFactors } from "@/lib/content-grouping";

export default async function PricingFactorsPage({ params }) {
  const { locale } = await params;
  const [factors, brands] = await Promise.all([getAllFactors(locale), getAllBrands(locale)]);
  const groups = groupPriceFactors(factors);

  return <div className="listing-page shell section-space">
    <header className="listing-hero"><p className="eyebrow">Donanımın ötesi</p><h1>Fiyat faktörleri</h1><p>Etiket fiyatını dört basit katmanda incele. Başlığı açtığında o katmandaki tüm etkenleri görebilirsin.</p></header>
    <nav className="section-jump" aria-label="Fiyat faktörü katmanları">{groups.map((group) => <a href={`#${group.slug}`} key={group.slug}>{group.title}<span>{group.items.length}</span></a>)}</nav>
    <div className="disclosure-catalog">{groups.map((group, groupIndex) => <details id={group.slug} key={group.slug} open={groupIndex === 0}>
      <summary><span>0{groupIndex + 1}</span><div><h2>{group.title}</h2><p>{group.description}</p></div><strong>{group.items.length}</strong></summary>
      <div className="factor-catalog">{group.items.map((factor, index) => <article id={factor.slug} key={factor.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{factor.impact} etki</small><h3>{factor.title}</h3><p>{factor.shortDescription}</p></div></article>)}</div>
    </details>)}</div>
    <aside className="estimate-disclaimer">Marka primi ve PR/pazarlama etkisi dahil bu sınıflandırmalar kesin maliyet yüzdesi değil, şeffaf editoryal değerlendirmedir.</aside>
    <details id="markalar" className="brand-section brand-section--disclosure"><summary><div><p className="eyebrow">Marka profilleri</p><h2>Marka, fiyatı nasıl konumlandırır?</h2></div><strong>{brands.length}</strong></summary><p>Bu profiller kalite sıralaması değil, markanın pazardaki genel anlatım biçimini gösteren tarafsız başlangıç notlarıdır.</p><div>{brands.map((brand) => <article key={brand.id}><h3>{brand.name}</h3><p>{brand.positioning}</p></article>)}</div></details>
  </div>;
}
