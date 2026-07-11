import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GuidePage from "./page";

vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

describe("GuidePage", () => {
  it("uses the encyclopedic reading layout", async () => {
    const page = await GuidePage({ params: Promise.resolve({ locale: "tr", slug: "telefon-fiyati-nasil-okunur" }) });
    render(page);

    expect(screen.getByRole("heading", { name: "Telefon fiyatı nasıl okunur?" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "İçindekiler" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Telefon fiyatı nasıl okunur? makalesi" })).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Kısa bilgiler" })).toBeInTheDocument();
  });

  it("localizes guide navigation on English routes", async () => {
    const page = await GuidePage({ params: Promise.resolve({ locale: "en", slug: "telefon-fiyati-nasil-okunur" }) });
    render(page);

    expect(screen.getByRole("navigation", { name: "Contents" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Guide summary" })).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Quick facts" })).toBeInTheDocument();
  });
});
