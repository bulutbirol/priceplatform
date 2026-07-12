import { prisma } from "./prisma";
import { calculateReadingTime } from "./reading-time";

function withReadingTime(guide) {
  return { ...guide, readingTime: calculateReadingTime([guide.body, ...(guide.sections || []).map((section) => section.body)]) };
}

function publishedContentLocale(locale) {
  return locale === "tr" ? locale : "tr";
}

const termRelations = {
  advantages: true,
  disadvantages: true,
  alternatives: true,
  misunderstandings: true,
  categories: { include: { category: true } },
  sources: { include: { source: true } },
};

export async function getHomeContent(locale = "tr") {
  const contentLocale = publishedContentLocale(locale);
  const [categories, groups, terms, pricingFactors, guides, comparisons] = await Promise.all([
    prisma.category.findMany({ where: { locale: contentLocale, NOT: { slug: "beyaz-esya" } }, orderBy: { id: "asc" } }),
    prisma.categoryGroup.findMany({ where: { locale: contentLocale }, orderBy: { position: "asc" }, include: { _count: { select: { categories: true } } } }),
    prisma.technologyTerm.findMany({ where: { locale: contentLocale }, take: 6, orderBy: { id: "asc" } }),
    prisma.priceFactor.findMany({
      where: { locale: contentLocale, slug: { in: ["bilesen-kalitesi", "arge", "marka-primi", "pr-pazarlama", "vergi", "servis-agi"] } },
      orderBy: { id: "asc" },
    }),
    prisma.guide.findMany({ where: { locale: contentLocale }, take: 4, orderBy: { id: "asc" }, include: { category: true, sections: { orderBy: { position: "asc" } } } }),
    prisma.comparison.findMany({ where: { locale: contentLocale }, take: 3, orderBy: { id: "asc" } }),
  ]);

  return { categories, groups, terms, pricingFactors, guides: guides.map(withReadingTime), comparisons };
}

export async function getAllCategoryGroups(locale = "tr") {
  return prisma.categoryGroup.findMany({ where: { locale: publishedContentLocale(locale) }, orderBy: { position: "asc" }, include: { _count: { select: { categories: true } } } });
}

export async function getCategoryGroupBySlug(slug, locale = "tr") {
  return prisma.categoryGroup.findUnique({ where: { locale_slug: { locale: publishedContentLocale(locale), slug } }, include: { categories: { where: { NOT: { slug: "beyaz-esya" } }, orderBy: { title: "asc" }, include: { _count: { select: { terms: true, guides: true } } } } } });
}

export async function getAllCategories(locale = "tr") {
  return prisma.category.findMany({
    where: { locale: publishedContentLocale(locale), NOT: { slug: "beyaz-esya" } }, orderBy: { id: "asc" },
    include: { _count: { select: { terms: true, guides: true } } },
  });
}

export async function getCategoryBySlug(slug, locale = "tr") {
  return prisma.category.findUnique({
    where: { locale_slug: { locale: publishedContentLocale(locale), slug } },
    include: {
      terms: { include: { term: { include: { advantages: true, disadvantages: true } } } },
      guides: { orderBy: { id: "asc" } },
      priceFactors: { include: { priceFactor: true } },
    },
  });
}

export async function getTermBySlug(slug, locale = "tr") {
  return prisma.technologyTerm.findUnique({ where: { locale_slug: { locale: publishedContentLocale(locale), slug } }, include: termRelations });
}

export async function getAllTerms(locale = "tr") {
  return prisma.technologyTerm.findMany({ where: { locale: publishedContentLocale(locale) }, orderBy: { title: "asc" }, include: termRelations });
}

export async function getAllGuides(locale = "tr") {
  const guides = await prisma.guide.findMany({ where: { locale: publishedContentLocale(locale) }, orderBy: { id: "asc" }, include: { category: { include: { group: true } }, sections: { orderBy: { position: "asc" } } } });
  return guides.map(withReadingTime);
}

export async function getGuideBySlug(slug, locale = "tr") {
  const guide = await prisma.guide.findUnique({
    where: { locale_slug: { locale: publishedContentLocale(locale), slug } },
    include: { category: true, sections: { orderBy: { position: "asc" } }, sources: { include: { source: true } } },
  });
  return guide ? withReadingTime(guide) : null;
}

export async function getAllFactors(locale = "tr") {
  return prisma.priceFactor.findMany({ where: { locale: publishedContentLocale(locale) }, orderBy: { id: "asc" } });
}

export async function getAllBrands(locale = "tr") {
  return prisma.brand.findMany({ where: { locale: publishedContentLocale(locale) }, orderBy: { name: "asc" } });
}

export async function getAllComparisons(locale = "tr") {
  return prisma.comparison.findMany({ where: { locale: publishedContentLocale(locale) }, orderBy: { id: "asc" }, include: { rows: { orderBy: { position: "asc" } } } });
}

export async function getComparisonBySlug(slug, locale = "tr") {
  return prisma.comparison.findUnique({ where: { locale_slug: { locale: publishedContentLocale(locale), slug } }, include: { rows: { orderBy: { position: "asc" } } } });
}

function normalize(value) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i");
}

export async function searchDatabase(query, locale = "tr") {
  locale = publishedContentLocale(locale);
  const normalizedQuery = normalize(query.trim());
  if (!normalizedQuery) return [];

  const [groups, categories, terms, guides, factors, brands] = await Promise.all([
    prisma.categoryGroup.findMany({ where: { locale } }),
    prisma.category.findMany({ where: { locale } }),
    prisma.technologyTerm.findMany({ where: { locale } }),
    prisma.guide.findMany({ where: { locale } }),
    prisma.priceFactor.findMany({ where: { locale } }),
    prisma.brand.findMany({ where: { locale } }),
  ]);

  return [...groups, ...categories, ...terms, ...guides, ...factors, ...brands]
    .filter((item) => normalize([item.title || item.name, item.shortDescription, item.summary, item.positioning].filter(Boolean).join(" ")).includes(normalizedQuery))
    .slice(0, 20);
}
