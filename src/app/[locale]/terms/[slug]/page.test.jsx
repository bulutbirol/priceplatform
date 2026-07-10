import { render, screen } from "@testing-library/react";
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
});
