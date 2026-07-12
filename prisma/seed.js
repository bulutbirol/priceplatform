import { PrismaClient } from "../node_modules/.prisma/client-taxonomy/index.js";
import { brands, categories, categoryGroups, comparisons, guides, pricingFactors, sourceData, terms } from "../src/lib/content.js";
import { staleCanonicalIds } from "../src/lib/seed-sync.js";

const prisma = new PrismaClient();
let categoryIdBySlug = new Map();
const categoryGroupIdBySlug = new Map(categoryGroups.map((group) => [group.slug, group.id]));
const asDate = (value) => new Date(value);

async function seedSources() {
  for (const source of sourceData) {
    const data = { ...source, accessDate: asDate(source.accessDate) };
    await prisma.source.upsert({ where: { id: source.id }, update: data, create: data });
  }
}

async function seedCategories() {
  for (const { contentType, status, guideCount, groupSlug, ...category } of categories) {
    const data = { ...category, groupId: categoryGroupIdBySlug.get(groupSlug) || null, updatedAt: asDate(category.updatedAt), reviewedAt: asDate(category.reviewedAt) };
    const { id, ...updateData } = data;
    await prisma.category.upsert({ where: { locale_slug: { locale: category.locale, slug: category.slug } }, update: updateData, create: { id, ...updateData } });
  }
  const persistedCategories = await prisma.category.findMany({ select: { id: true, slug: true } });
  categoryIdBySlug = new Map(persistedCategories.map((category) => [category.slug, category.id]));
}

async function seedCategoryGroups() {
  for (const { products, ...group } of categoryGroups) {
    await prisma.categoryGroup.upsert({ where: { id: group.id }, update: group, create: group });
  }
}

async function seedTerms() {
  for (const term of terms) {
    const { contentType, status, body, categorySlugs, sources, advantages, disadvantages, alternatives, commonMisunderstandings, ...raw } = term;
    const data = { ...raw, updatedAt: asDate(term.updatedAt), reviewedAt: asDate(term.reviewedAt) };
    await prisma.$transaction(async (tx) => {
      const { id, ...updateData } = data;
      const persisted = await tx.technologyTerm.upsert({ where: { locale_slug: { locale: term.locale, slug: term.slug } }, update: updateData, create: { id, ...updateData } });
      const termId = persisted.id;
      await Promise.all([
        tx.categoryTerm.deleteMany({ where: { termId } }), tx.termSource.deleteMany({ where: { termId } }),
        tx.termAdvantage.deleteMany({ where: { termId } }), tx.termDisadvantage.deleteMany({ where: { termId } }),
        tx.termAlternative.deleteMany({ where: { termId } }), tx.termMisunderstanding.deleteMany({ where: { termId } }),
      ]);
      await tx.categoryTerm.createMany({ data: categorySlugs.map((slug) => ({ categoryId: categoryIdBySlug.get(slug), termId })) });
      await tx.termSource.createMany({ data: sources.map((sourceId) => ({ termId, sourceId })) });
      await tx.termAdvantage.createMany({ data: advantages.map((text, index) => ({ id: `${termId}-adv-${index}`, text, termId })) });
      await tx.termDisadvantage.createMany({ data: disadvantages.map((text, index) => ({ id: `${termId}-con-${index}`, text, termId })) });
      if (alternatives.length) await tx.termAlternative.createMany({ data: alternatives.map((text, index) => ({ id: `${termId}-alt-${index}`, text, termId })) });
      await tx.termMisunderstanding.createMany({ data: commonMisunderstandings.map((text, index) => ({ id: `${termId}-myth-${index}`, text, termId })) });
    });
  }
  const existingSlugs = (await prisma.technologyTerm.findMany({ where: { locale: "tr" }, select: { slug: true } })).map(({ slug }) => slug);
  const staleSlugs = staleCanonicalIds(existingSlugs, terms.map(({ slug }) => slug), "");
  if (staleSlugs.length) await prisma.technologyTerm.deleteMany({ where: { locale: "tr", slug: { in: staleSlugs } } });
}

async function seedFactors() {
  for (const factor of pricingFactors) {
    const { contentType, status, categorySlugs, ...raw } = factor;
    const data = { ...raw, updatedAt: asDate(factor.updatedAt), reviewedAt: asDate(factor.reviewedAt) };
    await prisma.$transaction(async (tx) => {
      const { id, ...updateData } = data;
      const persisted = await tx.priceFactor.upsert({ where: { locale_slug: { locale: factor.locale, slug: factor.slug } }, update: updateData, create: { id, ...updateData } });
      await tx.categoryPriceFactor.deleteMany({ where: { priceFactorId: persisted.id } });
      await tx.categoryPriceFactor.createMany({ data: categorySlugs.map((slug) => ({ categoryId: categoryIdBySlug.get(slug), priceFactorId: persisted.id })) });
    });
  }
}

async function seedGuides() {
  for (const guide of guides) {
    const { contentType, status, categorySlug, sources, sections, ...raw } = guide;
    const data = { ...raw, categoryId: categoryIdBySlug.get(categorySlug), updatedAt: asDate(guide.updatedAt), reviewedAt: asDate(guide.reviewedAt) };
    await prisma.$transaction(async (tx) => {
      const { id, ...updateData } = data;
      const persisted = await tx.guide.upsert({ where: { locale_slug: { locale: guide.locale, slug: guide.slug } }, update: updateData, create: { id, ...updateData } });
      await tx.guideSource.deleteMany({ where: { guideId: persisted.id } });
      await tx.guideSection.deleteMany({ where: { guideId: persisted.id } });
      await tx.guideSource.createMany({ data: sources.map((sourceId) => ({ guideId: persisted.id, sourceId })) });
      await tx.guideSection.createMany({ data: sections.map((section, position) => ({ id: `${persisted.id}-section-${position}`, ...section, position, guideId: persisted.id })) });
    });
  }
}

async function seedBrandsAndComparisons() {
  for (const brand of brands) await prisma.brand.upsert({ where: { id: brand.id }, update: brand, create: brand });
  for (const comparison of comparisons) {
    const { contentType, status, comparisonTable, ...raw } = comparison;
    const data = { ...raw, updatedAt: asDate(comparison.updatedAt), reviewedAt: asDate(comparison.reviewedAt) };
    await prisma.$transaction(async (tx) => {
      await tx.comparison.upsert({ where: { id: comparison.id }, update: data, create: data });
      await tx.comparisonRow.deleteMany({ where: { comparisonId: comparison.id } });
      await tx.comparisonRow.createMany({ data: comparisonTable.map((row, position) => ({ id: `${comparison.id}-row-${position}`, ...row, position, comparisonId: comparison.id })) });
    });
  }
}

async function seed() {
  await seedSources(); await seedCategoryGroups(); await seedCategories(); await seedTerms(); await seedFactors(); await seedGuides(); await seedBrandsAndComparisons();
}

seed().then(async () => {
  console.log(`Synchronized ${categories.length} categories, ${terms.length} terms and ${guides.length} guides.`);
  await prisma.$disconnect();
}).catch(async (error) => { console.error(error); await prisma.$disconnect(); process.exit(1); });
