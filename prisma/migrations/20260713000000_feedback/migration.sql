CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "referenceCode" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "pageUrl" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "suggestedCorrection" TEXT,
    "sourceUrl" TEXT,
    "name" TEXT,
    "email" TEXT,
    "language" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "honeypot" TEXT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Feedback_referenceCode_key" ON "Feedback"("referenceCode");
CREATE INDEX "Feedback_status_createdAt_idx" ON "Feedback"("status", "createdAt");
