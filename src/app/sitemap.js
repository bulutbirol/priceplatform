import { categories, guides, terms } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";

const sharedPages = ["", "/categories", "/guides", "/pricing-factors", "/comparisons", "/about-our-content", "/editorial-policy", "/privacy-policy", "/contact", "/feedback"];

export default function sitemap() {
  const base = getSiteUrl();
  const now = new Date("2026-07-13");
  const shared = ["tr", "en"].flatMap((locale) => sharedPages.map((path) => ({ url: `${base}/${locale}${path}`, lastModified: now })));
  const categoryPages = ["tr", "en"].flatMap((locale) => categories.filter((item) => item.slug !== "beyaz-esya").map((item) => ({ url: `${base}/${locale}/categories/${item.slug}`, lastModified: new Date(item.updatedAt) })));
  const termPages = terms.map((item) => ({ url: `${base}/tr/terms/${item.slug}`, lastModified: new Date(item.updatedAt) }));
  const guidePages = guides.map((item) => ({ url: `${base}/tr/guides/${item.slug}`, lastModified: new Date(item.updatedAt) }));
  return [...shared, ...categoryPages, ...termPages, ...guidePages];
}
