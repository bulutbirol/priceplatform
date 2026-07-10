import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import { getGuideBySlug } from "@/lib/content-queries";
export default async function GuidePage({ params }) { const { locale, slug } = await params; const guide = await getGuideBySlug(slug); if (!guide) notFound(); return <article className="guide-page shell section-space"><header><Link className="back-link" href={`/${locale}/categories/${guide.category.slug}`}><ArrowLeft /> {guide.category.title}</Link><p className="eyebrow">Pratik rehber · <Clock3 /> {guide.readingTime} dk</p><h1>{guide.title}</h1><p>{guide.shortDescription}</p></header><div className="guide-content">{guide.sections.map((section, index) => <section key={section.id}><span>0{index + 1}</span><div><h2>{section.title}</h2><p>{section.body}</p></div></section>)}</div><footer>Bu rehber genel eğitim amaçlıdır. Satın almadan önce üreticinin güncel belgelerini doğrula.</footer></article>; }
