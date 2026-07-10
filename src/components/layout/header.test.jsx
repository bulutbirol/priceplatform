import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "./header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/tr",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("next-intl", () => ({
  useLocale: () => "tr",
  useTranslations: (namespace) => (key) =>
    ({
      "common.siteName": "Fiyatın Anatomisi",
      "navigation.categories": "Kategoriler",
      "navigation.guides": "Rehberler",
      "navigation.comparisons": "Karşılaştırmalar",
      "navigation.pricingFactors": "Fiyat Faktörleri",
      "navigation.feedback": "Geri Bildirim",
    })[`${namespace}.${key}`] ?? key,
}));

describe("Header theme controls", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = "light";
  });

  it("offers light, dark and system theme choices", () => {
    render(<Header locale="tr" />);

    expect(screen.getByRole("button", { name: "Açık tema" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Koyu tema" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sistem teması" })).toBeInTheDocument();
  });

  it("persists the selected theme", () => {
    render(<Header locale="tr" />);

    fireEvent.click(screen.getByRole("button", { name: "Koyu tema" }));

    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
});
