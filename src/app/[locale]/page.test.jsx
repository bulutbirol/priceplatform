import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("leads with a simple explanation of product pricing", async () => {
    const page = await HomePage({ params: Promise.resolve({ locale: "tr" }) });
    render(page);

    expect(screen.getByRole("heading", { name: "Hangi ürünün fiyatını anlamak istiyorsun?" })).toBeInTheDocument();
    expect(screen.getByLabelText("Platform içeriği")).toHaveTextContent("72 ürün türü");
    expect(screen.getByLabelText("Platform içeriği")).toHaveTextContent("1700+ teknik terim");
  });

  it("shows all nine upper product groups", async () => {
    const page = await HomePage({ params: Promise.resolve({ locale: "tr" }) });
    render(page);

    for (const group of [
      "Kişisel Teknoloji",
      "Görüntü ve Eğlence",
      "Büyük Ev Aletleri",
      "Küçük Mutfak Aletleri",
      "Temizlik ve Hava",
      "Akıllı Ev ve Güvenlik",
      "Enerji Sistemleri",
      "Kişisel Bakım",
      "Ev, Atölye ve Bahçe",
    ]) {
      expect(screen.getByRole("heading", { name: group })).toBeInTheDocument();
    }
  });

  it("keeps the catalog search-first and opens product groups progressively", async () => {
    const page = await HomePage({ params: Promise.resolve({ locale: "tr" }) });
    render(page);

    expect(screen.getByRole("textbox", { name: "Teknoloji ara" })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Bir ürün fiyatını oluşturan katmanlar" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Kişisel Teknoloji/ })).toHaveAttribute("href", "/tr/groups/kisisel-teknoloji");
  });

  it("renders the English catalog entry page", async () => {
    const page = await HomePage({ params: Promise.resolve({ locale: "en" }) });
    render(page);

    expect(screen.getByRole("heading", { name: "Which product price do you want to understand?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Personal Technology" })).toBeInTheDocument();
    expect(screen.getByText(/Technical articles are being translated/i)).toBeInTheDocument();
  });
});
