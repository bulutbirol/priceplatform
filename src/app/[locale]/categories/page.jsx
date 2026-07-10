import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { CategoryIllustration } from "@/components/visuals/category-illustration";
import { getAllCategories } from "@/lib/content-queries";

export default async function CategoriesPage({ params }) {
  const { locale } = await params;
  const categories = await getAllCategories(locale);
  return <div className="listing-page shell section-space">
    <header className="listing-hero"><p className="eyebrow">Dört ürün dünyası</p><h1>Kategoriler</h1><p>Bir ürünün fiyatını büyüten teknolojiyi, üretim kararlarını ve görünmeyen maliyetleri kategori kategori keşfet.</p></header>
    <div className="category-grid">{categories.map((category, index) => <Link className={`category-card category-card--${category.color}`} href={`/${locale}/categories/${category.slug}`} key={category.slug}>
      <div className="category-card__meta"><span>0{index + 1}</span><small>{category._count.terms} terim · {category._count.guides} rehber</small></div><CategoryIllustration slug={category.slug} title={category.title} /><div className="category-card__copy"><h2>{category.title}</h2><p>{category.shortDescription}</p></div><ArrowDownRight className="category-card__arrow" />
    </Link>)}</div>
  </div>;
}
