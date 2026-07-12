import { describe, expect, it } from "vitest";
import { getAllCategories, getCategoryBySlug, searchDatabase } from "./content-queries";

describe("release content queries", () => {
  it("serves the bundled Turkish catalog without requiring a database", async () => {
    const categories = await getAllCategories("tr");

    expect(categories.length).toBeGreaterThanOrEqual(70);
    expect(categories.find((item) => item.slug === "telefonlar")?.title).toBe("Telefon");
  });

  it("never falls back to Turkish text on English category pages", async () => {
    const phone = await getCategoryBySlug("telefonlar", "en");

    expect(phone?.title).toBe("Phones");
    expect(phone?.shortDescription).toMatch(/phone/i);
    expect(phone?.locale).toBe("en");
  });

  it("returns English search results for English queries", async () => {
    const results = await searchDatabase("phone", "en");

    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.title === "Phones")).toBe(true);
    expect(results.every((item) => item.locale === "en")).toBe(true);
  });
});
