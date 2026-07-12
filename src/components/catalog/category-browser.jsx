"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export function CategoryBrowser({ locale, tree }) {
  const [groupSlug, setGroupSlug] = useState(tree[0]?.slug);
  const [mobileLevel, setMobileLevel] = useState(0);
  const activeGroup = useMemo(() => tree.find((group) => group.slug === groupSlug) || tree[0], [groupSlug, tree]);
  const [familyByGroup, setFamilyByGroup] = useState({});
  const familySlug = familyByGroup[activeGroup?.slug] || activeGroup?.families[0]?.slug;
  const activeFamily = activeGroup?.families.find((family) => family.slug === familySlug) || activeGroup?.families[0];
  const english = locale === "en";

  const selectGroup = (slug) => {
    setGroupSlug(slug);
    setMobileLevel(1);
  };

  const selectFamily = (slug) => {
    setFamilyByGroup((current) => ({ ...current, [activeGroup.slug]: slug }));
    setMobileLevel(2);
  };

  if (!activeGroup || !activeFamily) return null;

  return <section className={`category-browser category-browser--level-${mobileLevel}`} aria-label={english ? "Category browser" : "Kategori gezgini"}>
    <div className="category-browser__trail" aria-label={english ? "Category path" : "Kategori yolu"}>
      <span>{english ? "All categories" : "Tüm kategoriler"}</span><ChevronRight />
      <strong>{activeGroup.title}</strong><ChevronRight /><strong>{activeFamily.title}</strong>
    </div>
    <div className="category-browser__columns">
      <div className="category-browser__column category-browser__column--groups" aria-label={english ? "Main categories" : "Ana kategoriler"}>
        <header><span>01</span><h2>{english ? "Main categories" : "Ana kategoriler"}</h2></header>
        {tree.map((group) => <button type="button" key={group.slug} aria-pressed={group.slug === activeGroup.slug} onClick={() => selectGroup(group.slug)}>
          <span>{group.title}</span><small>{group.families.length} {english ? "families" : "ürün ailesi"}</small><ChevronRight />
        </button>)}
      </div>
      <div className="category-browser__column category-browser__column--families" aria-label={english ? "Product families" : "Ürün aileleri"}>
        <header><span>02</span><h2>{activeGroup.title}</h2></header>
        <button className="category-browser__mobile-back" type="button" onClick={() => setMobileLevel(0)}><ArrowLeft /> {english ? "Main categories" : "Ana kategoriler"}</button>
        {activeGroup.families.map((family) => <button type="button" key={family.slug} aria-pressed={family.slug === activeFamily.slug} onClick={() => selectFamily(family.slug)}>
          <span>{family.title}</span><small>{family.products.length} {english ? "products" : "ürün"}</small><ChevronRight />
        </button>)}
      </div>
      <div className="category-browser__column category-browser__column--products" aria-label={english ? "Products" : "Ürünler"}>
        <header><span>03</span><h2>{activeFamily.title}</h2></header>
        <button className="category-browser__mobile-back" type="button" onClick={() => setMobileLevel(1)}><ArrowLeft /> {english ? "Product families" : "Ürün aileleri"}</button>
        {activeFamily.products.map((product) => <Link href={`/${locale}/categories/${product.slug}`} key={product.slug}><span>{product.title}</span><small>{english ? "See price anatomy" : "Fiyat yapısını incele"}</small><ChevronRight /></Link>)}
      </div>
    </div>
  </section>;
}
