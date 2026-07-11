import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleInfobox, ArticleSection, ReadingLayout } from "@/components/reading/article-layout";
import { getGuideBySlug } from "@/lib/content-queries";
import { getUiCopy } from "@/lib/ui-copy";

export default async function GuidePage({ params }) {
  const { locale, slug } = await params;
  const guide = await getGuideBySlug(slug, locale);
  if (!guide) notFound();

  const ui = getUiCopy(locale);
  const copy = ui.guideDetail;
  const reviewedAt = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "tr-TR").format(guide.reviewedAt);
  const sections = guide.sections.map((section, index) => ({ ...section, anchor: `bolum-${index + 1}` }));
  const toc = [
    { id: "rehber-ozeti", label: copy.summary },
    ...sections.map((section) => ({ id: section.anchor, label: section.title })),
    { id: "rehber-notu", label: copy.editorial },
  ];
  const infobox = (
    <ArticleInfobox title={ui.article.shortInfo} items={[
      { label: copy.guide, value: guide.title },
      { label: copy.category, value: guide.category?.title },
      { label: copy.readingTime, value: `${guide.readingTime} ${copy.minuteLong}` },
      { label: copy.sectionCount, value: guide.sections.length },
      { label: copy.lastReview, value: reviewedAt },
    ]} />
  );

  return (
    <article className="guide-page encyclopedia-page">
      <header className="article-header shell">
        <Link className="back-link" href={`/${locale}/categories/${guide.category.slug}`}><ArrowLeft size={15} /> {guide.category.title}</Link>
        <p className="article-kicker">{copy.practical} · {guide.readingTime} {copy.minuteLong}</p>
        <h1>{guide.title}</h1>
        <p className="article-lead">{guide.shortDescription}</p>
      </header>

      <ReadingLayout title={guide.title} toc={toc} infobox={infobox} labels={ui.article}>
        <ArticleSection id="rehber-ozeti" title={copy.summary}>
          <p>{guide.shortDescription}</p>
        </ArticleSection>
        {sections.map((section) => (
          <ArticleSection id={section.anchor} title={section.title} key={section.id}>
            <p>{section.body}</p>
          </ArticleSection>
        ))}
        <ArticleSection id="rehber-notu" title={copy.editorial}>
          <p className="article-note">{copy.note}</p>
          <p>{copy.reviewed}: {reviewedAt}</p>
        </ArticleSection>
      </ReadingLayout>
    </article>
  );
}
