import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllComparisons } from "@/lib/content-queries";
export default async function ComparisonsPage({ params }) { const { locale } = await params; const comparisons = await getAllComparisons(); return <div className="listing-page shell section-space"><header className="listing-hero"><p className="eyebrow">İkincil araç</p><h1>Karşılaştırmalar</h1><p>İki teknoloji arasında kaldığında pazarlama cümlelerini değil, gerçek kullanım farkını yan yana gör.</p></header><div className="comparison-catalog">{comparisons.map((item, index) => <Link href={`/${locale}/comparisons/${item.slug}`} key={item.slug}><span>0{index + 1}</span><h2>{item.title}</h2><p>{item.shortDescription}</p><ArrowRight /></Link>)}</div></div>; }
