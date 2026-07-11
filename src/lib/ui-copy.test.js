import { describe, expect, it } from "vitest";
import { uiCopy } from "./ui-copy";

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
