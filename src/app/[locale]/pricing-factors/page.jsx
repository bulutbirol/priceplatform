import { getAllBrands, getAllFactors } from "@/lib/content-queries";

export default async function PricingFactorsPage({ params }) {
  const { locale } = await params;
  const [factors, brands] = await Promise.all([getAllFactors(locale), getAllBrands(locale)]);
  return <div className="listing-page shell section-space">
    <header className="listing-hero"><p className="eyebrow">Donanımın ötesi</p><h1>Fiyat faktörleri</h1><p>Bir etiket fiyatı; teknoloji, üretim ve görünmeyen ticari kararların toplamıdır.</p></header>
    <div className="factor-catalog">{factors.map((factor, index) => <article id={factor.slug} key={factor.slug}><span>0{index + 1}</span><div><small>{factor.impact} etki</small><h2>{factor.title}</h2><p>{factor.shortDescription}</p></div></article>)}</div>
    <aside className="estimate-disclaimer">Marka primi ve PR/pazarlama etkisi dahil bu sınıflandırmalar kesin maliyet yüzdesi değil, şeffaf editoryal değerlendirmedir.</aside>
    <section id="markalar" className="brand-section"><p className="eyebrow">Marka profilleri</p><h2>Marka, fiyatı nasıl konumlandırır?</h2><p>Bu profiller kalite sıralaması değil, markanın pazardaki genel anlatım biçimini gösteren tarafsız başlangıç notlarıdır.</p><div>{brands.map((brand) => <article key={brand.id}><h3>{brand.name}</h3><p>{brand.positioning}</p></article>)}</div></section>
  </div>;
}
