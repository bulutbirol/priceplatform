import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeedbackForm } from "@/components/feedback/feedback-form";
describe("FeedbackForm", () => {
    it("renders the feedback form", () => {
        render(<FeedbackForm locale="en"/>);
        expect(screen.getByText(/Feedback type/i)).toBeInTheDocument();
    });
    it("renders Turkish labels on Turkish pages", () => {
        render(<FeedbackForm locale="tr"/>);
        expect(screen.getByText("Geri bildirim türü")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Geri bildirim gönder" })).toBeInTheDocument();
    });
});
