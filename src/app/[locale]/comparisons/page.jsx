import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllComparisons } from "@/lib/content-queries";
import { getUiCopy } from "@/lib/ui-copy";
export default async function ComparisonsPage({ params }) { const { locale } = await params; const copy = getUiCopy(locale).comparisons; const comparisons = await getAllComparisons(locale); return <div className="listing-page shell section-space"><header className="listing-hero"><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.lead}</p></header><div className="comparison-catalog">{comparisons.map((item, index) => <Link href={`/${locale}/comparisons/${item.slug}`} key={item.slug}><span>0{index + 1}</span><h2>{item.title}</h2><p>{item.shortDescription}</p><ArrowRight /></Link>)}</div></div>; }
