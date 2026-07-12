import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductExplainer } from "./product-explainer";

const terms = ["Fan motoru", "Isıtma rezistansı", "Termal sigorta", "Hava kanalı"].map((title, index) => ({
  term: {
    id: String(index), title, shortDescription: `${title} açıklaması`, whyPriceMatters: `${title} fiyat etkisi`,
    advantages: [{ text: `${title} artısı` }], disadvantages: [{ text: `${title} eksisi` }],
  },
}));

describe("ProductExplainer", () => {
  it("builds a visual system map from the product's own terms", () => {
    render(<ProductExplainer title="Saç Kurutma Makinesi" terms={terms} />);

    expect(screen.getByRole("img", { name: "Saç Kurutma Makinesi sistem haritası" })).toBeInTheDocument();
    expect(screen.getAllByText("Fan motoru").length).toBeGreaterThan(0);
    expect(screen.getByText("Termal sigorta artısı")).toBeInTheDocument();
    expect(screen.getByText("Termal sigorta eksisi")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Satın alırken üç kontrol" })).toBeInTheDocument();
  });

  it("keeps detailed system notes closed until the reader opens them", () => {
    const { container } = render(<ProductExplainer title="Saç Kurutma Makinesi" terms={terms} />);
    const notes = [...container.querySelectorAll(".core-system-notes details")];

    expect(notes).toHaveLength(4);
    expect(notes.every((note) => !note.hasAttribute("open"))).toBe(true);
  });
});
