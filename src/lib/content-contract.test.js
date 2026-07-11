import { describe, expect, it } from "vitest";
import { categories, guides, pricingFactors, terms } from "./content";

describe("Turkish content catalog", () => {
  it("contains nine primary product categories and the white-goods index", () => {
    expect(categories.map((category) => category.slug)).toEqual(expect.arrayContaining([
      "bulasik-makineleri",
      "buzdolaplari",
      "camasir-makineleri",
      "firinlar",
      "kameralar",
      "klimalar",
      "kurutma-makineleri",
      "telefonlar",
      "televizyonlar",
    ]));
    expect(categories.some((category) => category.slug === "beyaz-esya")).toBe(true);
  });

  it("covers the whole-home catalog with at least seventy product types", () => {
    expect(categories.filter((category) => category.slug !== "beyaz-esya").length).toBeGreaterThanOrEqual(70);
    expect(categories.map((category) => category.slug)).toEqual(expect.arrayContaining([
      "robot-supurgeler",
      "kahve-makineleri",
      "akilli-kilitler",
      "gunes-panelleri",
      "sac-kurutma-makineleri",
      "matkaplar",
    ]));
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
      const expectedEstablished = ["telefonlar", "kameralar", "televizyonlar", "buzdolaplari", "camasir-makineleri", "bulasik-makineleri", "kurutma-makineleri", "firinlar", "klimalar"].includes(category.slug);
      const categoryTermCount = terms.filter((term) => term.categorySlugs.includes(category.slug)).length;
      if (expectedEstablished) expect(categoryTermCount, `${category.slug} terms`).toBeGreaterThanOrEqual(50);
      else expect(categoryTermCount, `${category.slug} profile terms`).toBe(12);
      expect(pricingFactors.filter((factor) => factor.categorySlugs.includes(category.slug)).length, `${category.slug} factors`).toBeGreaterThanOrEqual(expectedEstablished ? 30 : 12);
      expect(guides.filter((guide) => guide.categorySlug === category.slug).length, `${category.slug} guides`).toBeGreaterThanOrEqual(expectedEstablished ? 5 : 3);
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

  it("does not present cooktop or purifier features as generic oven and air-conditioner parts", () => {
    const ovenTitles = terms.filter((term) => term.categorySlugs.includes("firinlar")).map((term) => term.title);
    const airconTitles = terms.filter((term) => term.categorySlugs.includes("klimalar")).map((term) => term.title);
    expect(ovenTitles).not.toContain("İndüksiyon destekli fırın");
    expect(ovenTitles).toContain("Sıcaklık probu");
    expect(airconTitles).not.toContain("HEPA filtre");
    expect(airconTitles).toContain("Yüksek yoğunluklu hava filtresi");
  });

  it("keeps product-specific technologies out of unrelated categories", () => {
    const forbiddenPairs = [
      ["sac-kurutma-makineleri", "Su geçirmezlik"],
      ["sac-kurutma-makineleri", "Kesici başlık"],
      ["elektrikli-dis-fircalari", "Isıtıcı"],
      ["akilli-baskuller", "Motor"],
      ["kettlelar", "Bıçak veya öğütücü"],
      ["tost-makineleri", "Pompa sistemi"],
      ["hoparlorler", "Panel veya optik sistem"],
      ["soundbarlar", "Renk işleme"],
      ["utuler", "Haritalama yazılımı"],
      ["nemlendiriciler", "Emiş basıncı"],
      ["akilli-prizler", "Kamera sensörü"],
      ["akilli-ampuller", "Anahtarlama rölesi"],
      ["akilli-ampuller", "Güç ölçümü"],
      ["modemler", "Gece görüşü"],
      ["gunes-panelleri", "Batarya hücresi"],
      ["dikis-makineleri", "Pompa"],
      ["matkaplar", "Su koruması"],
    ];

    for (const [categorySlug, title] of forbiddenPairs) {
      const titles = terms.filter((term) => term.categorySlugs.includes(categorySlug)).map((term) => term.title);
      expect(titles, `${categorySlug} should not contain ${title}`).not.toContain(title);
    }
  });

  it("does not claim passive parts require control software", () => {
    for (const passiveTitle of ["Güç kablosu", "Termal sigorta", "Cam platform", "Kapı contası"]) {
      const matchingTerms = terms.filter((term) => term.title === passiveTitle);
      for (const term of matchingTerms) expect(term.howItWorks.toLocaleLowerCase("tr-TR"), term.slug).not.toContain("kontrol yazılımı");
    }
  });
});
