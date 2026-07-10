import { render, screen } from "@testing-library/react";
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
});
