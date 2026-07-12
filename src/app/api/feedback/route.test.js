import { beforeEach, describe, expect, it, vi } from "vitest";

const { createFeedback } = vi.hoisted(() => ({ createFeedback: vi.fn() }));

vi.mock("@/lib/prisma", () => ({
  prisma: { feedback: { create: createFeedback } },
}));

import { POST } from "./route";

function feedbackRequest(overrides = {}, headers = {}) {
  return new Request("https://example.com/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
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
      ...overrides,
    }),
  });
}

describe("POST /api/feedback", () => {
  beforeEach(() => {
    createFeedback.mockReset();
    createFeedback.mockResolvedValue({ referenceCode: "FB-12345678" });
  });

  it("stores validated feedback", async () => {
    const response = await POST(feedbackRequest({}, { "x-forwarded-for": "203.0.113.10" }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ referenceCode: "FB-12345678" });
    expect(createFeedback).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ message: "This page is very helpful.", language: "en" }),
    }));
  });

  it("rejects oversized feedback payloads", async () => {
    const response = await POST(feedbackRequest({ message: "x".repeat(5001) }, { "x-forwarded-for": "203.0.113.11" }));
    expect(response.status).toBe(400);
    expect(createFeedback).not.toHaveBeenCalled();
  });

  it("rate limits repeated anonymous writes", async () => {
    let response;
    for (let index = 0; index < 6; index += 1) {
      response = await POST(feedbackRequest({ message: `Valid feedback ${index}` }, { "x-forwarded-for": "203.0.113.42" }));
    }
    expect(response.status).toBe(429);
  });
});
