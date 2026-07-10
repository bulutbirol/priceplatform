import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const requestLog = new Map();

const feedbackSchema = z.object({
  type: z.string().min(1).max(100),
  pageUrl: z.string().url().max(2048).optional().or(z.literal("")),
  message: z.string().min(10).max(5000),
  suggestedCorrection: z.string().max(5000).optional(),
  sourceUrl: z.string().url().max(2048).optional().or(z.literal("")),
  name: z.string().max(100).optional(),
  email: z.string().email().max(254).optional().or(z.literal("")),
  language: z.string().min(1).max(10),
  consent: z.boolean(),
  website: z.string().max(200).optional(),
});

function isRateLimited(request) {
  const now = Date.now();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const key = `${ip}:${userAgent.slice(0, 80)}`;
  if (!requestLog.has(key) && requestLog.size >= 1000) requestLog.delete(requestLog.keys().next().value);
  const recent = (requestLog.get(key) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  requestLog.set(key, [...recent, now]);
  return false;
}

export async function POST(request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 20_000) return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    if (isRateLimited(request)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    const parsed = feedbackSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ error: "Spam blocked" }, { status: 400 });
    if (!parsed.data.consent) return NextResponse.json({ error: "Consent required" }, { status: 400 });

    const referenceCode = `FB-${randomUUID().slice(0, 8).toUpperCase()}`;
    const feedback = await prisma.feedback.create({
      data: {
        referenceCode,
        type: parsed.data.type,
        pageUrl: parsed.data.pageUrl ?? "",
        message: parsed.data.message,
        suggestedCorrection: parsed.data.suggestedCorrection ?? "",
        sourceUrl: parsed.data.sourceUrl ?? "",
        name: parsed.data.name ?? "",
        email: parsed.data.email ?? "",
        language: parsed.data.language,
        status: "NEW",
        honeypot: parsed.data.website ?? "",
      },
    });
    return NextResponse.json({ referenceCode: feedback.referenceCode });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to save feedback" }, { status: 500 });
  }
}
