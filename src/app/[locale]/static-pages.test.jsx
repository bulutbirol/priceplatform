import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPolicyPage from "./privacy-policy/page";
import ContactPage from "./contact/page";

describe("release information pages", () => {
  it("publishes a complete Turkish privacy notice", async () => {
    render(await PrivacyPolicyPage({ params: Promise.resolve({ locale: "tr" }) }));
    expect(screen.getByRole("heading", { name: "Gizlilik politikası" })).toBeInTheDocument();
    expect(screen.getByText(/Neon/i)).toBeInTheDocument();
    expect(screen.queryByText(/starter|placeholder/i)).not.toBeInTheDocument();
  });

  it("does not ship placeholder copy on the English contact page", async () => {
    render(await ContactPage({ params: Promise.resolve({ locale: "en" }) }));
    expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /feedback form/i })).toHaveAttribute("href", "/en/feedback");
    expect(screen.queryByText(/placeholder/i)).not.toBeInTheDocument();
  });
});
