import { describe, expect, it } from "vitest";
import { staleCanonicalIds } from "./seed-sync";

describe("seed synchronization", () => {
  it("identifies generated records that are no longer in the canonical catalog", () => {
    expect(staleCanonicalIds(["term-1-1", "term-1-2", "manual-note"], ["term-1-1"], "term-")).toEqual(["term-1-2"]);
  });
});
