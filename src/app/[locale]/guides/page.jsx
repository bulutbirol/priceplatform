import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { getAllGuides } from "@/lib/content-queries";
import { groupGuidesByProductGroup } from "@/lib/content-grouping";

export default async function GuidesPage({ params }) {
  const { locale } = await params;
  const groups = groupGuidesByProductGroup(await getAllGuides(locale));

  return <div className="listing-page shell section-space">
    <header className="listing-hero"><p className="eyebrow">Satın alma kararından önce</p><h1>Rehberler</h1><p>Önce ürün grubunu seç. Teknik özellikleri gerçek ihtiyaca ve toplam maliyete çeviren rehberlere hızla ulaş.</p></header>
    <nav className="section-jump" aria-label="Rehber kategorileri">{groups.map((group) => <a href={`#${group.slug}`} key={group.slug}>{group.title}<span>{group.items.length}</span></a>)}</nav>
    <div className="disclosure-catalog">{groups.map((group, groupIndex) => <details id={group.slug} key={group.slug} open={groupIndex === 0}>
      <summary><span>0{groupIndex + 1}</span><div><h2>{group.title}</h2><p>{group.items.length} satın alma ve kullanım rehberi</p></div><strong>{group.items.length}</strong></summary>
      <div className="article-list">{group.items.map((guide, index) => <Link href={`/${locale}/guides/${guide.slug}`} key={guide.slug}>
        <span>{String(index + 1).padStart(2, "0")}</span><div><small>{guide.category.title}</small><h3>{guide.title}</h3><p>{guide.shortDescription}</p></div><strong><Clock3 /> {guide.readingTime} dk</strong><ArrowRight />
      </Link>)}</div>
    </details>)}</div>
  </div>;
}
