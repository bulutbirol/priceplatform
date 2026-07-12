import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";

describe("search engine metadata", () => {
  it("publishes both language home pages and product categories", () => {
    const entries = sitemap();
    expect(entries.some((item) => item.url.endsWith("/tr"))).toBe(true);
    expect(entries.some((item) => item.url.endsWith("/en"))).toBe(true);
    expect(entries.some((item) => item.url.endsWith("/tr/categories/telefonlar"))).toBe(true);
    expect(entries.some((item) => item.url.endsWith("/en/categories/telefonlar"))).toBe(true);
  });

  it("points crawlers to the generated sitemap", () => {
    expect(robots().sitemap).toMatch(/\/sitemap\.xml$/);
  });
});
