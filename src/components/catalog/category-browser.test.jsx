import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CategoryBrowser } from "./category-browser";

const tree = [
  { slug: "tech", title: "Teknoloji", families: [
    { slug: "mobile", title: "Mobil", products: [{ slug: "phones", title: "Telefon" }] },
    { slug: "computer", title: "Bilgisayar", products: [{ slug: "laptop", title: "Dizüstü" }] },
  ] },
  { slug: "home", title: "Ev", families: [{ slug: "cooling", title: "Soğutma", products: [{ slug: "fridge", title: "Buzdolabı" }] }] },
];

describe("CategoryBrowser", () => {
  it("drills from main category to family and product", () => {
    render(<CategoryBrowser locale="tr" tree={tree} />);
    expect(screen.getByRole("link", { name: /Telefon/ })).toHaveAttribute("href", "/tr/categories/phones");

    fireEvent.click(screen.getByRole("button", { name: /Ev/ }));
    expect(screen.getByRole("button", { name: /Soğutma/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Buzdolabı/ })).toHaveAttribute("href", "/tr/categories/fridge");
  });
});
