import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { POST } from "./route";
describe("POST /api/feedback", () => {
    beforeEach(async () => {
        await prisma.feedback.deleteMany();
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
    it("stores feedback in the database", async () => {
        const request = new Request("http://localhost/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: "feedback",
                pageUrl: "https://example.com/en",
                message: "This page is very helpful.",
                suggestedCorrection: "Add a pricing example.",
                sourceUrl: "https://example.com/guides",
                name: "Ada",
                email: "ada@example.com",
                language: "en",
                consent: true,
                website: "",
            }),
        });
        const response = await POST(request);
        expect(response.status).toBe(200);
        const body = await response.json();
        expect(body.referenceCode).toMatch(/^FB-/);
        const saved = await prisma.feedback.findUnique({
            where: { referenceCode: body.referenceCode },
        });
        expect(saved?.message).toBe("This page is very helpful.");
        expect(saved?.language).toBe("en");
    });
    it("rejects oversized feedback payloads", async () => {
        const request = new Request("http://localhost/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: "feedback",
                pageUrl: "https://example.com/tr",
                message: "x".repeat(5001),
                language: "tr",
                consent: true,
                website: "",
            }),
        });
        const response = await POST(request);
        expect(response.status).toBe(400);
    });
    it("rate limits repeated anonymous writes", async () => {
        let response;
        for (let index = 0; index < 6; index += 1) {
            response = await POST(new Request("http://localhost/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.42" },
                body: JSON.stringify({ type: "feedback", pageUrl: "", message: `Geçerli geri bildirim ${index}`, language: "tr", consent: true, website: "" }),
            }));
        }
        expect(response.status).toBe(429);
    });
});
