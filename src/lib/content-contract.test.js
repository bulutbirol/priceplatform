import { describe, expect, it } from "vitest";
import { categories, guides, pricingFactors, terms } from "./content";

describe("Turkish content catalog", () => {
  it("contains the four launch categories", () => {
    expect(categories.map((category) => category.slug).sort()).toEqual([
      "beyaz-esya",
      "kameralar",
      "telefonlar",
      "televizyonlar",
    ]);
  });

  it("ships a substantial set of terms and guides", () => {
    expect(terms.length).toBeGreaterThanOrEqual(60);
    expect(terms.length).toBeLessThanOrEqual(80);
    expect(guides).toHaveLength(12);
  });

  it("gives every term practical trade-offs", () => {
    for (const term of terms) {
      expect(term.advantages.length, `${term.slug} advantages`).toBeGreaterThan(0);
      expect(term.disadvantages.length, `${term.slug} disadvantages`).toBeGreaterThan(0);
      expect(term.analogy, `${term.slug} analogy`).toBeTruthy();
      expect(term.whoShouldCare, `${term.slug} audience`).toBeTruthy();
      expect(term.whoCanSkip, `${term.slug} skip audience`).toBeTruthy();
    }
  });

  it("treats brand premium and PR as explicit pricing factors", () => {
    expect(pricingFactors.map((factor) => factor.slug)).toEqual(
      expect.arrayContaining(["marka-primi", "pr-pazarlama"]),
    );
  });

  it("keeps slugs unique and editorial scores in range", () => {
    for (const collection of [categories, terms, guides, pricingFactors]) {
      expect(new Set(collection.map((item) => item.slug)).size).toBe(collection.length);
    }
    for (const term of terms) {
      expect(term.priceImpact).toBeGreaterThanOrEqual(1);
      expect(term.priceImpact).toBeLessThanOrEqual(5);
      expect(term.userBenefit).toBeGreaterThanOrEqual(1);
      expect(term.importanceForAverageUsers).toBeLessThanOrEqual(5);
      expect(term.sources.length).toBeGreaterThan(0);
    }
  });

  it("distributes terms and guides evenly across launch categories", () => {
    for (const category of categories) {
      expect(terms.filter((term) => term.categorySlugs.includes(category.slug))).toHaveLength(15);
      expect(guides.filter((guide) => guide.categorySlug === category.slug)).toHaveLength(3);
    }
  });
});
