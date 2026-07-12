import {
  brands, categories, categoryGroups, comparisons, guides, pricingFactors, sourceData, terms,
} from "./content";
import { calculateReadingTime } from "./reading-time";
import { englishPriceFactors, englishProductNames, toEnglishCategory } from "./english-catalog";
import { localizeGroups } from "./locale-copy";
import { retailFeatures } from "./retail-features";

const asDate = (value) => value instanceof Date ? value : new Date(value);
const categoryBySlug = new Map(categories.map((item) => [item.slug, item]));
const groupBySlug = new Map(categoryGroups.map((item) => [item.slug, item]));
const sourceById = new Map(sourceData.map((item) => [item.id, item]));

function relationItems(values = [], prefix) {
  return values.map((text, index) => ({ id: `${prefix}-${index}`, text }));
}

function decorateTerm(term) {
  return {
    ...term,
    updatedAt: asDate(term.updatedAt),
    reviewedAt: asDate(term.reviewedAt),
    advantages: relationItems(term.advantages, `${term.id}-adv`),
    disadvantages: relationItems(term.disadvantages, `${term.id}-con`),
    alternatives: relationItems(term.alternatives, `${term.id}-alt`),
    misunderstandings: relationItems(term.commonMisunderstandings, `${term.id}-myth`),
    categories: term.categorySlugs.map((slug) => ({ category: decorateCategoryBase(categoryBySlug.get(slug), "tr") })).filter((item) => item.category),
    sources: term.sources.map((id) => ({ source: sourceById.get(id) })).filter((item) => item.source),
  };
}

function decorateGuide(guide, locale = "tr") {
  const category = decorateCategoryBase(categoryBySlug.get(guide.categorySlug), locale);
  const sections = (guide.sections || []).map((section, position) => ({ ...section, id: `${guide.id}-section-${position}`, position }));
  return {
    ...guide,
    locale,
    category: category ? { ...category, group: category.groupSlug ? localizedGroup(category.groupSlug, locale) : null } : null,
    sections,
    sources: guide.sources.map((id) => ({ source: sourceById.get(id) })).filter((item) => item.source),
    updatedAt: asDate(guide.updatedAt),
    reviewedAt: asDate(guide.reviewedAt),
    readingTime: calculateReadingTime([guide.body, ...sections.map((section) => section.body)]),
  };
}

function localizedGroup(slug, locale) {
  const group = groupBySlug.get(slug);
  if (!group) return null;
  const localized = localizeGroups([{ ...group }], locale)[0];
  return { ...localized, _count: { categories: categories.filter((item) => item.groupSlug === slug && item.slug !== "beyaz-esya").length } };
}

function decorateCategoryBase(category, locale) {
  if (!category) return null;
  const localized = locale === "en" ? toEnglishCategory(category) : { ...category };
  if (!localized) return null;
  return { ...localized, updatedAt: asDate(category.updatedAt), reviewedAt: asDate(category.reviewedAt) };
}

function decorateCategory(category, locale) {
  const base = decorateCategoryBase(category, locale);
  if (!base) return null;
  const categoryTerms = locale === "tr" ? terms.filter((item) => item.categorySlugs.includes(category.slug)).map((term) => ({ term: decorateTerm(term) })) : [];
  const categoryGuides = locale === "tr" ? guides.filter((item) => item.categorySlug === category.slug).map((guide) => decorateGuide(guide, locale)) : [];
  const factors = locale === "tr" ? pricingFactors.filter((item) => item.categorySlugs.includes(category.slug)) : englishPriceFactors;
  return {
    ...base,
    terms: categoryTerms,
    guides: categoryGuides,
    priceFactors: factors.map((priceFactor) => ({ priceFactor: { ...priceFactor, updatedAt: asDate(priceFactor.updatedAt), reviewedAt: asDate(priceFactor.reviewedAt) } })),
    _count: { terms: categoryTerms.length, guides: categoryGuides.length },
  };
}

const englishGuides = [
  ["phone-buying-basics", "Phone buying basics", "telefonlar"],
  ["laptop-buying-basics", "Laptop buying basics", "dizustu-bilgisayarlar"],
  ["television-buying-basics", "Television buying basics", "televizyonlar"],
  ["appliance-running-costs", "Understanding appliance running costs", "buzdolaplari"],
].map(([slug, title, categorySlug], index) => ({
  id: `guide-en-${index + 1}`, slug, locale: "en", title,
  shortDescription: "Compare the specifications you will notice in daily use before paying for headline numbers.",
  body: "Define your use case, compare measurable specifications, and include energy, maintenance, software support, warranty, and service in the total cost.",
  categorySlug, readingTime: 1, updatedAt: "2026-07-13", reviewedAt: "2026-07-13", sources: [],
  sections: [
    { title: "Start with your use case", body: "Write down what you use every day and which limitations actually affect you." },
    { title: "Compare complete systems", body: "A single number rarely explains performance. Check how the main components work together." },
    { title: "Include long-term cost", body: "Consider energy, consumables, repairs, software support, warranty, and resale value." },
  ],
}));

const englishComparisons = [
  ["oled-vs-mini-led", "OLED or Mini LED?", "OLED prioritizes black levels; Mini LED often prioritizes high brightness."],
  ["large-sensor-vs-high-megapixel", "Large sensor or more megapixels?", "Sensor size and resolution solve different problems; neither number guarantees image quality."],
  ["fast-charging-vs-battery-life", "Fast charging or longer battery life?", "Choose between quick top-ups and more time away from a charger."],
  ["heat-pump-vs-vented-dryer", "Heat-pump or conventional dryer?", "Compare purchase price with energy use, cycle time, and fabric care."],
].map(([slug, title, quickResult], index) => ({
  id: `comparison-en-${index + 1}`, slug, locale: "en", title, shortDescription: quickResult,
  body: quickResult, quickResult, updatedAt: asDate("2026-07-13"), reviewedAt: asDate("2026-07-13"),
  rows: [
    { id: `${slug}-1`, position: 0, feature: "Best fit", optionA: "Prioritises the first strength", optionB: "Prioritises the second strength" },
    { id: `${slug}-2`, position: 1, feature: "Before paying more", optionA: "Check independent measurements", optionB: "Check your daily use case" },
  ],
}));

export async function getHomeContent(locale = "tr") {
  const allCategories = await getAllCategories(locale);
  const groups = await getAllCategoryGroups(locale);
  return {
    categories: allCategories,
    groups,
    terms: locale === "tr" ? terms.slice(0, 6).map(decorateTerm) : [],
    pricingFactors: (locale === "tr" ? pricingFactors : englishPriceFactors).slice(0, 6),
    guides: (await getAllGuides(locale)).slice(0, 4),
    comparisons: (await getAllComparisons(locale)).slice(0, 3),
  };
}

export async function getAllCategoryGroups(locale = "tr") {
  return categoryGroups.map((group) => localizedGroup(group.slug, locale));
}

export async function getCategoryGroupBySlug(slug, locale = "tr") {
  const group = localizedGroup(slug, locale);
  if (!group) return null;
  return { ...group, categories: categories.filter((item) => item.groupSlug === slug && item.slug !== "beyaz-esya").map((item) => decorateCategory(item, locale)).filter(Boolean) };
}

export async function getAllCategories(locale = "tr") {
  return categories.filter((item) => item.slug !== "beyaz-esya").map((item) => decorateCategory(item, locale)).filter(Boolean);
}

export async function getCategoryBySlug(slug, locale = "tr") {
  return decorateCategory(categoryBySlug.get(slug), locale);
}

export async function getTermBySlug(slug, locale = "tr") {
  if (locale !== "tr") return null;
  const term = terms.find((item) => item.slug === slug);
  return term ? decorateTerm(term) : null;
}

export async function getAllTerms(locale = "tr") {
  return locale === "tr" ? terms.map(decorateTerm).sort((a, b) => a.title.localeCompare(b.title, "tr")) : [];
}

export async function getAllGuides(locale = "tr") {
  return (locale === "en" ? englishGuides : guides).map((guide) => decorateGuide(guide, locale));
}

export async function getGuideBySlug(slug, locale = "tr") {
  const guide = (locale === "en" ? englishGuides : guides).find((item) => item.slug === slug);
  return guide ? decorateGuide(guide, locale) : null;
}

export async function getAllFactors(locale = "tr") {
  return (locale === "en" ? englishPriceFactors : pricingFactors).map((item) => ({ ...item, updatedAt: asDate(item.updatedAt), reviewedAt: asDate(item.reviewedAt) }));
}

export async function getAllBrands(locale = "tr") {
  if (locale === "en") return brands.map((item) => ({ ...item, locale: "en", positioning: "See current product range, service coverage, and long-term support by category." }));
  return brands;
}

export async function getAllComparisons(locale = "tr") {
  if (locale === "en") return englishComparisons;
  return comparisons.map((item) => ({ ...item, updatedAt: asDate(item.updatedAt), reviewedAt: asDate(item.reviewedAt), rows: item.comparisonTable.map((row, position) => ({ ...row, id: `${item.id}-${position}`, position })) }));
}

export async function getComparisonBySlug(slug, locale = "tr") {
  return (await getAllComparisons(locale)).find((item) => item.slug === slug) || null;
}

function normalize(value, locale = "tr") {
  return value.toLocaleLowerCase(locale === "en" ? "en-US" : "tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i");
}

function searchableText(item) {
  return [item.title || item.name, item.shortDescription, item.summary, item.positioning, item.decision, ...(item.commonValues || []), ...(item.aliases || [])].filter(Boolean).join(" ");
}

export async function searchDatabase(query, locale = "tr") {
  const normalizedQuery = normalize(query.trim(), locale);
  if (!normalizedQuery) return [];
  const groups = await getAllCategoryGroups(locale);
  const allCategories = await getAllCategories(locale);
  const searchable = locale === "en"
    ? [...groups, ...allCategories, ...englishPriceFactors, ...(await getAllBrands("en"))]
    : [...groups, ...allCategories, ...retailFeatures, ...terms.map(decorateTerm), ...guides.map((item) => decorateGuide(item)), ...pricingFactors, ...brands];
  return searchable.filter((item) => {
    const text = normalize(searchableText(item), locale);
    const compactText = text.replace(/[^a-z0-9]/g, "");
    const compactQuery = normalizedQuery.replace(/[^a-z0-9]/g, "");
    return text.includes(normalizedQuery) || (compactQuery.length > 1 && compactText.includes(compactQuery));
  }).slice(0, 20);
}

export { englishProductNames };
