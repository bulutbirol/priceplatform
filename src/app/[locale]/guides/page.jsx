import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { getAllGuides } from "@/lib/content-queries";
import { groupGuidesByProductGroup } from "@/lib/content-grouping";
import { getUiCopy } from "@/lib/ui-copy";

export default async function GuidesPage({ params }) {
  const { locale } = await params;
  const copy = getUiCopy(locale).guides;
  const groups = groupGuidesByProductGroup(await getAllGuides(locale));

  return <div className="listing-page shell section-space">
    <header className="listing-hero"><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.lead}</p></header>
    <nav className="section-jump" aria-label={copy.navigation}>{groups.map((group) => <a href={`#${group.slug}`} key={group.slug}>{group.title}<span>{group.items.length}</span></a>)}</nav>
    <div className="disclosure-catalog">{groups.map((group, groupIndex) => <details id={group.slug} key={group.slug} open={groupIndex === 0}>
      <summary><span>0{groupIndex + 1}</span><div><h2>{group.title}</h2><p>{group.items.length} {copy.count}</p></div><strong>{group.items.length}</strong></summary>
      <div className="article-list">{group.items.map((guide, index) => <Link href={`/${locale}/guides/${guide.slug}`} key={guide.slug}>
        <span>{String(index + 1).padStart(2, "0")}</span><div><small>{guide.category.title}</small><h3>{guide.title}</h3><p>{guide.shortDescription}</p></div><strong><Clock3 /> {guide.readingTime} {copy.minute}</strong><ArrowRight />
      </Link>)}</div>
    </details>)}</div>
  </div>;
}
