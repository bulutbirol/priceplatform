import { PrismaClient } from "../node_modules/.prisma/client-taxonomy/index.js";
import { brands, categories, categoryGroups, comparisons, guides, pricingFactors, sourceData, terms } from "../src/lib/content.js";
import { staleCanonicalIds } from "../src/lib/seed-sync.js";

const prisma = new PrismaClient();
const categoryIdBySlug = new Map(categories.map((category) => [category.slug, category.id]));
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
    await prisma.category.upsert({ where: { id: category.id }, update: data, create: data });
  }
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
      await tx.technologyTerm.upsert({ where: { id: term.id }, update: data, create: data });
      await Promise.all([
        tx.categoryTerm.deleteMany({ where: { termId: term.id } }), tx.termSource.deleteMany({ where: { termId: term.id } }),
        tx.termAdvantage.deleteMany({ where: { termId: term.id } }), tx.termDisadvantage.deleteMany({ where: { termId: term.id } }),
        tx.termAlternative.deleteMany({ where: { termId: term.id } }), tx.termMisunderstanding.deleteMany({ where: { termId: term.id } }),
      ]);
      await tx.categoryTerm.createMany({ data: categorySlugs.map((slug) => ({ categoryId: categoryIdBySlug.get(slug), termId: term.id })) });
      await tx.termSource.createMany({ data: sources.map((sourceId) => ({ termId: term.id, sourceId })) });
      await tx.termAdvantage.createMany({ data: advantages.map((text, index) => ({ id: `${term.id}-adv-${index}`, text, termId: term.id })) });
      await tx.termDisadvantage.createMany({ data: disadvantages.map((text, index) => ({ id: `${term.id}-con-${index}`, text, termId: term.id })) });
      if (alternatives.length) await tx.termAlternative.createMany({ data: alternatives.map((text, index) => ({ id: `${term.id}-alt-${index}`, text, termId: term.id })) });
      await tx.termMisunderstanding.createMany({ data: commonMisunderstandings.map((text, index) => ({ id: `${term.id}-myth-${index}`, text, termId: term.id })) });
    });
  }
  const existingIds = (await prisma.technologyTerm.findMany({ select: { id: true } })).map(({ id }) => id);
  const staleIds = staleCanonicalIds(existingIds, terms.map(({ id }) => id), "term-");
  if (staleIds.length) await prisma.technologyTerm.deleteMany({ where: { id: { in: staleIds } } });
}

async function seedFactors() {
  for (const factor of pricingFactors) {
    const { contentType, status, categorySlugs, ...raw } = factor;
    const data = { ...raw, updatedAt: asDate(factor.updatedAt), reviewedAt: asDate(factor.reviewedAt) };
    await prisma.$transaction(async (tx) => {
      await tx.priceFactor.upsert({ where: { id: factor.id }, update: data, create: data });
      await tx.categoryPriceFactor.deleteMany({ where: { priceFactorId: factor.id } });
      await tx.categoryPriceFactor.createMany({ data: categorySlugs.map((slug) => ({ categoryId: categoryIdBySlug.get(slug), priceFactorId: factor.id })) });
    });
  }
}

async function seedGuides() {
  for (const guide of guides) {
    const { contentType, status, categorySlug, sources, sections, ...raw } = guide;
    const data = { ...raw, categoryId: categoryIdBySlug.get(categorySlug), updatedAt: asDate(guide.updatedAt), reviewedAt: asDate(guide.reviewedAt) };
    await prisma.$transaction(async (tx) => {
      await tx.guide.upsert({ where: { id: guide.id }, update: data, create: data });
      await tx.guideSource.deleteMany({ where: { guideId: guide.id } });
      await tx.guideSection.deleteMany({ where: { guideId: guide.id } });
      await tx.guideSource.createMany({ data: sources.map((sourceId) => ({ guideId: guide.id, sourceId })) });
      await tx.guideSection.createMany({ data: sections.map((section, position) => ({ id: `${guide.id}-section-${position}`, ...section, position, guideId: guide.id })) });
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
