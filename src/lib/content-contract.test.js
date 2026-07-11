import { describe, expect, it } from "vitest";
import { categories, guides, pricingFactors, terms } from "./content";

describe("Turkish content catalog", () => {
  it("contains nine primary product categories and the white-goods index", () => {
    expect(categories.filter((category) => category.slug !== "beyaz-esya").map((category) => category.slug).sort()).toEqual([
      "bulasik-makineleri",
      "buzdolaplari",
      "camasir-makineleri",
      "firinlar",
      "kameralar",
      "klimalar",
      "kurutma-makineleri",
      "telefonlar",
      "televizyonlar",
    ]);
    expect(categories.some((category) => category.slug === "beyaz-esya")).toBe(true);
  });

  it("ships a substantial set of terms and guides", () => {
    expect(terms.length).toBeGreaterThanOrEqual(450);
    expect(guides.length).toBeGreaterThanOrEqual(48);
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

  it("gives every primary category deep terms, factors and guides", () => {
    for (const category of categories.filter((item) => item.slug !== "beyaz-esya")) {
      expect(terms.filter((term) => term.categorySlugs.includes(category.slug)), `${category.slug} terms`).toHaveLength(50);
      expect(pricingFactors.filter((factor) => factor.categorySlugs.includes(category.slug)).length, `${category.slug} factors`).toBeGreaterThanOrEqual(30);
      expect(guides.filter((guide) => guide.categorySlug === category.slug), `${category.slug} guides`).toHaveLength(5);
    }
  });

  it("covers granular phone component costs", () => {
    const phoneFactorSlugs = pricingFactors.filter((factor) => factor.categorySlugs.includes("telefonlar")).map((factor) => factor.slug);
    expect(phoneFactorSlugs).toEqual(expect.arrayContaining([
      "telefon-islemci-maliyeti",
      "telefon-kamera-modulu",
      "telefon-ekran-cami",
      "telefon-batarya-hucresi",
      "telefon-kasa-malzemesi",
    ]));
  });
});
