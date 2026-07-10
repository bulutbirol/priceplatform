-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "honeypot" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_referenceCode_key" ON "Feedback"("referenceCode");
