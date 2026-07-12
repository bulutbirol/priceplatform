import { describe, expect, it } from "vitest";
import { calculateReadingTime } from "./reading-time";

describe("calculateReadingTime", () => {
  it("uses 180 Turkish words per minute and rounds up", () => {
    expect(calculateReadingTime("kelime ".repeat(181))).toBe(2);
  });

  it("returns at least one minute for short or empty content", () => {
    expect(calculateReadingTime("Kısa bir metin.")).toBe(1);
    expect(calculateReadingTime("")).toBe(1);
  });

  it("accepts multiple article sections", () => {
    expect(calculateReadingTime(["kelime ".repeat(90), "kelime ".repeat(91)])).toBe(2);
  });
});
