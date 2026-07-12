import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SearchPage from "./page";

describe("SearchPage", () => {
  it("finds Turkish technology terms without requiring exact casing", async () => {
    const page = await SearchPage({
      params: Promise.resolve({ locale: "tr" }),
      searchParams: Promise.resolve({ q: "İNDÜKSİYON" }),
    });
    render(page);

    expect(screen.getByRole("heading", { name: "Arama" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "İndüksiyon" })).toBeInTheDocument();
  });

  it("finds store features despite spaces and common spelling differences", async () => {
    const page = await SearchPage({
      params: Promise.resolve({ locale: "tr" }),
      searchParams: Promise.resolve({ q: "nofrost" }),
    });
    render(page);

    const groupHeading = screen.getByRole("heading", { name: "Mağaza özellikleri" });
    expect(within(groupHeading.closest("details")).getByRole("heading", { name: "No Frost" })).toBeInTheDocument();
  });
});
