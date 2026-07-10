import { prisma } from "./prisma";

const termRelations = {
  advantages: true,
  disadvantages: true,
  alternatives: true,
  misunderstandings: true,
  categories: { include: { category: true } },
  sources: { include: { source: true } },
};

export async function getHomeContent(locale = "tr") {
  const [categories, terms, pricingFactors, guides, comparisons] = await Promise.all([
    prisma.category.findMany({ where: { locale }, orderBy: { id: "asc" } }),
    prisma.technologyTerm.findMany({ where: { locale }, take: 6, orderBy: { id: "asc" } }),
    prisma.priceFactor.findMany({
      where: { locale, slug: { in: ["bilesen-kalitesi", "arge", "marka-primi", "pr-pazarlama", "vergi", "servis-agi"] } },
      orderBy: { id: "asc" },
    }),
    prisma.guide.findMany({ where: { locale }, take: 4, orderBy: { id: "asc" }, include: { category: true } }),
    prisma.comparison.findMany({ where: { locale }, take: 3, orderBy: { id: "asc" } }),
  ]);

  return { categories, terms, pricingFactors, guides, comparisons };
}

export async function getAllCategories(locale = "tr") {
  return prisma.category.findMany({
    where: { locale }, orderBy: { id: "asc" },
    include: { _count: { select: { terms: true, guides: true } } },
  });
}

export async function getCategoryBySlug(slug, locale = "tr") {
  return prisma.category.findUnique({
    where: { locale_slug: { locale, slug } },
    include: {
      terms: { include: { term: { include: { advantages: true, disadvantages: true } } } },
      guides: { orderBy: { id: "asc" } },
      priceFactors: { include: { priceFactor: true } },
    },
  });
}

export async function getTermBySlug(slug, locale = "tr") {
  return prisma.technologyTerm.findUnique({ where: { locale_slug: { locale, slug } }, include: termRelations });
}

export async function getAllTerms(locale = "tr") {
  return prisma.technologyTerm.findMany({ where: { locale }, orderBy: { title: "asc" }, include: termRelations });
}

export async function getAllGuides(locale = "tr") {
  return prisma.guide.findMany({ where: { locale }, orderBy: { id: "asc" }, include: { category: true, sections: { orderBy: { position: "asc" } } } });
}

export async function getGuideBySlug(slug, locale = "tr") {
  return prisma.guide.findUnique({
    where: { locale_slug: { locale, slug } },
    include: { category: true, sections: { orderBy: { position: "asc" } }, sources: { include: { source: true } } },
  });
}

export async function getAllFactors(locale = "tr") {
  return prisma.priceFactor.findMany({ where: { locale }, orderBy: { id: "asc" } });
}

export async function getAllBrands(locale = "tr") {
  return prisma.brand.findMany({ where: { locale }, orderBy: { name: "asc" } });
}

export async function getAllComparisons(locale = "tr") {
  return prisma.comparison.findMany({ where: { locale }, orderBy: { id: "asc" }, include: { rows: { orderBy: { position: "asc" } } } });
}

export async function getComparisonBySlug(slug, locale = "tr") {
  return prisma.comparison.findUnique({ where: { locale_slug: { locale, slug } }, include: { rows: { orderBy: { position: "asc" } } } });
}

function normalize(value) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i");
}

export async function searchDatabase(query, locale = "tr") {
  const normalizedQuery = normalize(query.trim());
  if (!normalizedQuery) return [];

  const [categories, terms, guides, factors, brands] = await Promise.all([
    prisma.category.findMany({ where: { locale } }),
    prisma.technologyTerm.findMany({ where: { locale } }),
    prisma.guide.findMany({ where: { locale } }),
    prisma.priceFactor.findMany({ where: { locale } }),
    prisma.brand.findMany({ where: { locale } }),
  ]);

  return [...categories, ...terms, ...guides, ...factors, ...brands]
    .filter((item) => normalize([item.title || item.name, item.shortDescription, item.summary, item.positioning].filter(Boolean).join(" ")).includes(normalizedQuery))
    .slice(0, 20);
}
