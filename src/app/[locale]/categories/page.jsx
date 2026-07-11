import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllCategoryGroups } from "@/lib/content-queries";
import { localizeGroups } from "@/lib/locale-copy";

export default async function CategoriesPage({ params }) {
  const { locale } = await params;
  const groups = localizeGroups(await getAllCategoryGroups(locale), locale);
  const english = locale === "en";

  return <div className="listing-page shell section-space">
    <header className="listing-hero">
      <p className="eyebrow">{english ? "A technology atlas for the home" : "Evin içindeki teknoloji atlası"}</p>
      <h1>{english ? "Product categories" : "Ürün kategorileri"}</h1>
      <p>{english ? "All products are organized into nine clear groups. Choose a group first, then the product." : "Aradığın ürünü kolay bulmak için tüm ürünleri dokuz anlaşılır gruba ayırdık. Önce grubu, sonra ürünü seç."}</p>
    </header>
    <div className="product-catalog" aria-label="Ürün grupları">
      {groups.map((group, index) => <Link href={`/${locale}/groups/${group.slug}`} className="group-catalog-item" key={group.slug}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div><h2>{group.title}</h2><p>{group.description}</p><small>{group._count.categories} {english ? "product types" : "ürün türü"}</small></div>
        <ArrowRight aria-hidden="true" />
      </Link>)}
    </div>
  </div>;
}
