import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeedbackForm } from "@/components/feedback/feedback-form";
describe("FeedbackForm", () => {
    it("renders the feedback form", () => {
        render(<FeedbackForm locale="en"/>);
        expect(screen.getByText(/Feedback type/i)).toBeInTheDocument();
    });
});
