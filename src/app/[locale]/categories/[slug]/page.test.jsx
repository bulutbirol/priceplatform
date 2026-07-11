import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CategoryPage from "./page";

vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

describe("CategoryPage", () => {
  it("shows only the terms and guides related to the selected category", async () => {
    const page = await CategoryPage({ params: Promise.resolve({ locale: "tr", slug: "kameralar" }) });
    render(page);

    expect(screen.getByRole("heading", { name: "Kamera" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sensör boyutu" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "OLED ekran" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "İlk kamera nasıl seçilir?" })).toBeInTheDocument();
  });

  it("turns the legacy white-goods route into an index of appliance categories", async () => {
    const page = await CategoryPage({ params: Promise.resolve({ locale: "tr", slug: "beyaz-esya" }) });
    render(page);

    expect(screen.getByRole("heading", { name: "Buzdolabı" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Çamaşır Makinesi" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Klima" })).toBeInTheDocument();
  });

  it("does not render empty term sections for newer product categories", async () => {
    const page = await CategoryPage({ params: Promise.resolve({ locale: "tr", slug: "robot-supurgeler" }) });
    render(page);

    expect(screen.queryByText("0 terim")).not.toBeInTheDocument();
    expect(screen.getAllByText(/terim$/).length).toBeGreaterThan(0);
  });
});
