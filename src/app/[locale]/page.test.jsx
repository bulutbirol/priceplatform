import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./page";

vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn(async ({ namespace }) => (key) => ({
    "home.heroTitle": "Understand why technology products cost more",
    "home.heroDescription": "A simple explanation.",
    "home.pricingFactors": "Pricing factors",
    "home.popularCategories": "Popular categories",
    "home.howItWorks": "How it works",
    "home.featuredGuides": "Featured guides",
    "home.feedbackSectionTitle": "Feedback",
    "home.feedbackSectionDescription": "Feedback description",
    "home.disclaimer": "Disclaimer",
    "common.siteName": "Price Explained",
    "common.searchPlaceholder": "Search",
    "common.exploreCategories": "Explore",
    "common.learnPricing": "Learn",
    "common.feedback": "Feedback",
  })[`${namespace}.${key}`] ?? key),
}));

describe("HomePage", () => {
  it("leads with a simple explanation of product pricing", async () => {
    const page = await HomePage({ params: Promise.resolve({ locale: "tr" }) });
    render(page);

    expect(screen.getByRole("heading", { name: /Bir ürünün fiyatında ne var/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Marka primi/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/PR ve pazarlama/i).length).toBeGreaterThan(0);
  });

  it("shows all four launch categories", async () => {
    const page = await HomePage({ params: Promise.resolve({ locale: "tr" }) });
    render(page);

    for (const category of ["Telefon", "Kamera", "Televizyon", "Beyaz Eşya"]) {
      expect(screen.getByRole("heading", { name: category })).toBeInTheDocument();
    }
  });
});
