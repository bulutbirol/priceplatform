import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleInfobox, ArticleSection, ReadingLayout } from "@/components/reading/article-layout";
import { getGuideBySlug } from "@/lib/content-queries";

export default async function GuidePage({ params }) {
  const { locale, slug } = await params;
  const guide = await getGuideBySlug(slug, locale);
  if (!guide) notFound();

  const reviewedAt = new Intl.DateTimeFormat("tr-TR").format(guide.reviewedAt);
  const sections = guide.sections.map((section, index) => ({ ...section, anchor: `bolum-${index + 1}` }));
  const toc = [
    { id: "rehber-ozeti", label: "Rehber özeti" },
    ...sections.map((section) => ({ id: section.anchor, label: section.title })),
    { id: "rehber-notu", label: "Editoryal not" },
  ];
  const infobox = (
    <ArticleInfobox items={[
      { label: "Rehber", value: guide.title },
      { label: "Kategori", value: guide.category?.title },
      { label: "Okuma süresi", value: `${guide.readingTime} dakika` },
      { label: "Bölüm sayısı", value: guide.sections.length },
      { label: "Son inceleme", value: reviewedAt },
    ]} />
  );

  return (
    <article className="guide-page encyclopedia-page">
      <header className="article-header shell">
        <Link className="back-link" href={`/${locale}/categories/${guide.category.slug}`}><ArrowLeft size={15} /> {guide.category.title}</Link>
        <p className="article-kicker">Pratik rehber · {guide.readingTime} dakika</p>
        <h1>{guide.title}</h1>
        <p className="article-lead">{guide.shortDescription}</p>
      </header>

      <ReadingLayout title={guide.title} toc={toc} infobox={infobox}>
        <ArticleSection id="rehber-ozeti" title="Rehber özeti">
          <p>{guide.shortDescription}</p>
        </ArticleSection>
        {sections.map((section) => (
          <ArticleSection id={section.anchor} title={section.title} key={section.id}>
            <p>{section.body}</p>
          </ArticleSection>
        ))}
        <ArticleSection id="rehber-notu" title="Editoryal not">
          <p className="article-note">Bu rehber genel eğitim amaçlıdır. Satın almadan önce üreticinin güncel belgelerini doğrula.</p>
          <p>Son gözden geçirilme: {reviewedAt}</p>
        </ArticleSection>
      </ReadingLayout>
    </article>
  );
}
