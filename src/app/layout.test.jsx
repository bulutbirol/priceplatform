import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import RootLayout from "./layout";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "font-sans" }),
  Geist_Mono: () => ({ variable: "font-mono" }),
}));

describe("RootLayout theme boot", () => {
  it("applies the saved or system theme before hydration", () => {
    const markup = renderToStaticMarkup(
      <RootLayout><main>İçerik</main></RootLayout>,
    );

    expect(markup).toContain("localStorage");
    expect(markup).toContain("prefers-color-scheme: dark");
    expect(markup).toContain("data-theme");
  });
});
