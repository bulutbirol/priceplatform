import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CategoryGroupPage from "./page";

vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

describe("CategoryGroupPage", () => {
  it("organizes products under intermediate families", async () => {
    const page = await CategoryGroupPage({ params: Promise.resolve({ locale: "tr", slug: "buyuk-ev-aletleri" }) });
    render(page);

    expect(screen.getByRole("heading", { name: "Pişirme" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Fırın/ })).toHaveAttribute("href", "/tr/categories/firinlar");
    expect(screen.getByRole("link", { name: /Ocak/ })).toHaveAttribute("href", "/tr/categories/ocaklar");
  });
});
