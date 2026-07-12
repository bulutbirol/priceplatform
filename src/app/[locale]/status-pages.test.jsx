import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ useParams: () => ({ locale: "en" }) }));

import ErrorPage from "./error";
import NotFoundPage from "./not-found";

describe("localized status pages", () => {
  it("shows an English retry action", () => {
    render(<ErrorPage reset={vi.fn()} />);
    expect(screen.getByRole("button", { name: /Try again/i })).toBeInTheDocument();
  });

  it("shows an English not-found message", () => {
    render(<NotFoundPage />);
    expect(screen.getByRole("heading", { name: /content is not here/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back to home/i })).toHaveAttribute("href", "/en");
  });
});
