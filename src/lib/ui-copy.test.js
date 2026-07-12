import { describe, expect, it } from "vitest";
import { uiCopy } from "./ui-copy";
import { categoryTree } from "./category-tree";
import { localizeGroups } from "./locale-copy";

function flatten(value, prefix = "", result = {}) {
  for (const [key, item] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (item && typeof item === "object" && !Array.isArray(item)) flatten(item, path, result);
    else result[path] = item;
  }
  return result;
}

describe("interface translations", () => {
  it("keeps Turkish and English keys complete and non-empty", () => {
    const tr = flatten(uiCopy.tr);
    const en = flatten(uiCopy.en);
    expect(Object.keys(en).sort()).toEqual(Object.keys(tr).sort());
    for (const [key, value] of Object.entries(en)) expect(String(value).trim(), key).not.toBe("");
  });
});

describe("English category navigation", () => {
  it("translates group, family, and product labels", () => {
    const tree = localizeGroups(categoryTree, "en");
    const personalTech = tree.find((group) => group.slug === "kisisel-teknoloji");

    expect(personalTech.title).toBe("Personal Technology");
    expect(personalTech.families[0].title).toBe("Mobile and wearable");
    expect(personalTech.families[0].products[0].title).toBe("Phones");
  });
});
