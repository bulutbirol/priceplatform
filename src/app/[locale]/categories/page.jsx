import { CategoryBrowser } from "@/components/catalog/category-browser";
import { categoryTree } from "@/lib/category-tree";
import { localizeGroups } from "@/lib/locale-copy";

export default async function CategoriesPage({ params }) {
  const { locale } = await params;
  const english = locale === "en";
  const tree = localizeGroups(categoryTree, locale);

  return <div className="listing-page shell section-space">
    <header className="listing-hero">
      <p className="eyebrow">{english ? "A technology atlas for the home" : "Evin içindeki teknoloji atlası"}</p>
      <h1>{english ? "Find a product" : "Ürününü bul"}</h1>
      <p>{english ? "Choose a main category, product family, and then the exact product." : "Önce ana kategoriyi, sonra ürün ailesini, son olarak incelemek istediğin ürünü seç."}</p>
    </header>
    <CategoryBrowser locale={locale} tree={tree} />
  </div>;
}
