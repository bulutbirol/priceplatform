import { describe, expect, it } from "vitest";
import { groupGuidesByProductGroup, groupPriceFactors } from "./content-grouping";

describe("content grouping", () => {
  it("groups guides under their household product group", () => {
    const guides = [
      { id: "1", title: "Telefon rehberi", category: { group: { slug: "kisisel", title: "Kişisel Teknoloji", position: 0 } } },
      { id: "2", title: "Buzdolabı rehberi", category: { group: { slug: "ev", title: "Büyük Ev Aletleri", position: 2 } } },
      { id: "3", title: "Kamera rehberi", category: { group: { slug: "kisisel", title: "Kişisel Teknoloji", position: 0 } } },
    ];

    expect(groupGuidesByProductGroup(guides)).toEqual([
      expect.objectContaining({ slug: "kisisel", title: "Kişisel Teknoloji", items: [guides[0], guides[2]] }),
      expect.objectContaining({ slug: "ev", title: "Büyük Ev Aletleri", items: [guides[1]] }),
    ]);
  });

  it("puts familiar price factors into four plain-language layers", () => {
    const factors = [
      { slug: "islemci-maliyeti", title: "İşlemci maliyeti" },
      { slug: "dayaniklilik-testleri", title: "Dayanıklılık testleri" },
      { slug: "marka-primi", title: "Marka primi" },
      { slug: "vergi", title: "Vergi" },
    ];

    const groups = groupPriceFactors(factors);
    expect(groups.map((group) => group.title)).toEqual(["Ürünün kendisi", "Üretim ve ömür", "Marka ve satış", "Dış maliyetler"]);
    expect(groups.map((group) => group.items[0].slug)).toEqual(["islemci-maliyeti", "dayaniklilik-testleri", "marka-primi", "vergi"]);
  });
});
