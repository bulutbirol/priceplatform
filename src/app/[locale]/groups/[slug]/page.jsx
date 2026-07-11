import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CategoryIllustration } from "@/components/visuals/category-illustration";
import { getCategoryGroupBySlug } from "@/lib/content-queries";
import { localizeGroups } from "@/lib/locale-copy";

export default async function CategoryGroupPage({ params }) {
  const { locale, slug } = await params;
  const sourceGroup = await getCategoryGroupBySlug(slug, locale);
  if (!sourceGroup) notFound();
  const group = localizeGroups([sourceGroup], locale)[0];
  const english = locale === "en";

  return <div className="group-page shell section-space">
    <header className="listing-hero">
      <Link href={`/${locale}`} className="back-link"><ArrowLeft size={16} /> {english ? "All product groups" : "Tüm ürün grupları"}</Link>
      <p className="eyebrow">{group.categories.length} {english ? "product types" : "ürün türü"}</p>
      <h1>{group.title}</h1>
      <p>{group.description}</p>
      {english && <aside className="translation-notice">Product names and technical articles in this section are still being translated and currently use the reviewed Turkish catalog.</aside>}
    </header>
    <div className="group-product-list">
      {group.categories.map((category) => <Link href={`/${locale}/categories/${category.slug}`} key={category.slug}>
        <CategoryIllustration slug={category.slug} title={category.title} />
        <div><h2>{category.title}</h2><p>{category.shortDescription}</p><small>{category._count.terms} {english ? "terms" : "terim"} · {category._count.guides} {english ? "guides" : "rehber"}</small></div>
        <ArrowRight aria-hidden="true" />
      </Link>)}
    </div>
  </div>;
}
