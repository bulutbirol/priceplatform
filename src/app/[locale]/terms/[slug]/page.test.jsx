import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TermPage from "./page";

vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

describe("TermPage", () => {
  it("explains a term with a visual, trade-offs and audience guidance", async () => {
    const page = await TermPage({ params: Promise.resolve({ locale: "tr", slug: "oled-ekran" }) });
    render(page);

    expect(screen.getByRole("heading", { name: "OLED ekran" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /OLED ekran.*diyagram/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Artıları" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Eksileri" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Kim önemsemeli/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Kim ekstra para vermemeli/i })).toBeInTheDocument();
  });

  it("presents the term as an encyclopedic article with navigation and a concise infobox", async () => {
    const page = await TermPage({ params: Promise.resolve({ locale: "tr", slug: "oled-ekran" }) });
    render(page);

    const contents = screen.getByRole("navigation", { name: "İçindekiler" });
    expect(contents).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "OLED ekran makalesi" })).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Kısa bilgiler" })).toBeInTheDocument();
    expect(within(contents).getByRole("link", { name: "Fiyatı neden etkiler?" })).toHaveAttribute("href", "#fiyat-etkisi");
  });

  it("localizes the article interface on English routes", async () => {
    const page = await TermPage({ params: Promise.resolve({ locale: "en", slug: "oled-ekran" }) });
    render(page);

    expect(screen.getByRole("navigation", { name: "Contents" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Advantages" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How does it work?" })).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Quick facts" })).toBeInTheDocument();
  });
});
