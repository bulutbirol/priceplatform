import { describe, expect, it } from "vitest";
import { categoryTree } from "./category-tree";

describe("deep category tree", () => {
  it("places all 88 products exactly once under a family", () => {
    const products = categoryTree.flatMap((group) => group.families.flatMap((family) => family.products));
    expect(products).toHaveLength(88);
    expect(new Set(products.map((product) => product.slug)).size).toBe(88);
  });

  it("gives every main category meaningful intermediate families", () => {
    expect(categoryTree).toHaveLength(9);
    for (const group of categoryTree) expect(group.families.length, group.slug).toBeGreaterThanOrEqual(2);

    const appliances = categoryTree.find((group) => group.slug === "buyuk-ev-aletleri");
    const cooking = appliances.families.find((family) => family.slug === "pisirme");
    expect(cooking.products.map((product) => product.slug)).toEqual(["firinlar", "ocaklar", "davlumbazlar"]);

    const technology = categoryTree.find((group) => group.slug === "kisisel-teknoloji");
    const hardware = technology.families.find((family) => family.slug === "bilgisayar-donanimi");
    expect(hardware.products.map((product) => product.slug)).toEqual(expect.arrayContaining(["islemciler", "ekran-kartlari", "anakartlar", "ram-bellekler", "ssdler"]));
  });
});
