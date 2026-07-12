-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "title" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "image" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "reviewedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TechnologyTerm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "analogy" TEXT NOT NULL,
    "howItWorks" TEXT NOT NULL,
    "whyPriceMatters" TEXT NOT NULL,
    "whoShouldCare" TEXT NOT NULL,
    "whoCanSkip" TEXT NOT NULL,
    "priceImpact" INTEGER NOT NULL,
    "userBenefit" INTEGER NOT NULL,
    "importanceForAverageUsers" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "reviewedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TermAdvantage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "termId" TEXT NOT NULL,
    CONSTRAINT "TermAdvantage_termId_fkey" FOREIGN KEY ("termId") REFERENCES "TechnologyTerm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TermDisadvantage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "termId" TEXT NOT NULL,
    CONSTRAINT "TermDisadvantage_termId_fkey" FOREIGN KEY ("termId") REFERENCES "TechnologyTerm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TermAlternative" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "termId" TEXT NOT NULL,
    CONSTRAINT "TermAlternative_termId_fkey" FOREIGN KEY ("termId") REFERENCES "TechnologyTerm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TermMisunderstanding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "termId" TEXT NOT NULL,
    CONSTRAINT "TermMisunderstanding_termId_fkey" FOREIGN KEY ("termId") REFERENCES "TechnologyTerm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CategoryTerm" (
    "categoryId" TEXT NOT NULL,
    "termId" TEXT NOT NULL,

    PRIMARY KEY ("categoryId", "termId"),
    CONSTRAINT "CategoryTerm_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CategoryTerm_termId_fkey" FOREIGN KEY ("termId") REFERENCES "TechnologyTerm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PriceFactor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "editorialEstimate" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL,
    "reviewedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CategoryPriceFactor" (
    "categoryId" TEXT NOT NULL,
    "priceFactorId" TEXT NOT NULL,

    PRIMARY KEY ("categoryId", "priceFactorId"),
    CONSTRAINT "CategoryPriceFactor_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CategoryPriceFactor_priceFactorId_fkey" FOREIGN KEY ("priceFactorId") REFERENCES "PriceFactor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Guide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "readingTime" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "reviewedAt" DATETIME NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Guide_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GuideSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,
    CONSTRAINT "GuideSection_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "name" TEXT NOT NULL,
    "positioning" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comparison" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "quickResult" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "reviewedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ComparisonRow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" INTEGER NOT NULL,
    "feature" TEXT NOT NULL,
    "optionA" TEXT NOT NULL,
    "optionB" TEXT NOT NULL,
    "comparisonId" TEXT NOT NULL,
    CONSTRAINT "ComparisonRow_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "Comparison" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "accessDate" DATETIME NOT NULL,
    "sourceType" TEXT NOT NULL,
    "language" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TermSource" (
    "termId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    PRIMARY KEY ("termId", "sourceId"),
    CONSTRAINT "TermSource_termId_fkey" FOREIGN KEY ("termId") REFERENCES "TechnologyTerm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TermSource_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GuideSource" (
    "guideId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    PRIMARY KEY ("guideId", "sourceId"),
    CONSTRAINT "GuideSource_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GuideSource_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "categoryId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductTechnology" (
    "productId" TEXT NOT NULL,
    "termId" TEXT NOT NULL,

    PRIMARY KEY ("productId", "termId"),
    CONSTRAINT "ProductTechnology_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductTechnology_termId_fkey" FOREIGN KEY ("termId") REFERENCES "TechnologyTerm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PriceBreakdown" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "priceFactorId" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "estimateMin" REAL,
    "estimateMax" REAL,
    CONSTRAINT "PriceBreakdown_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PriceBreakdown_priceFactorId_fkey" FOREIGN KEY ("priceFactorId") REFERENCES "PriceFactor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Visual" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kind" TEXT NOT NULL,
    "src" TEXT,
    "alt" TEXT NOT NULL,
    "diagramKey" TEXT,
    "categoryId" TEXT,
    "termId" TEXT,
    CONSTRAINT "Visual_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Visual_termId_fkey" FOREIGN KEY ("termId") REFERENCES "TechnologyTerm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_locale_slug_key" ON "Category"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "TechnologyTerm_locale_slug_key" ON "TechnologyTerm"("locale", "slug");

-- CreateIndex
CREATE INDEX "TermAdvantage_termId_idx" ON "TermAdvantage"("termId");

-- CreateIndex
CREATE INDEX "TermDisadvantage_termId_idx" ON "TermDisadvantage"("termId");

-- CreateIndex
CREATE INDEX "TermAlternative_termId_idx" ON "TermAlternative"("termId");

-- CreateIndex
CREATE INDEX "TermMisunderstanding_termId_idx" ON "TermMisunderstanding"("termId");

-- CreateIndex
CREATE INDEX "CategoryTerm_termId_idx" ON "CategoryTerm"("termId");

-- CreateIndex
CREATE UNIQUE INDEX "PriceFactor_locale_slug_key" ON "PriceFactor"("locale", "slug");

-- CreateIndex
CREATE INDEX "CategoryPriceFactor_priceFactorId_idx" ON "CategoryPriceFactor"("priceFactorId");

-- CreateIndex
CREATE UNIQUE INDEX "Guide_locale_slug_key" ON "Guide"("locale", "slug");

-- CreateIndex
CREATE INDEX "GuideSection_guideId_idx" ON "GuideSection"("guideId");

-- CreateIndex
CREATE UNIQUE INDEX "GuideSection_guideId_position_key" ON "GuideSection"("guideId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_locale_slug_key" ON "Brand"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Comparison_locale_slug_key" ON "Comparison"("locale", "slug");

-- CreateIndex
CREATE INDEX "ComparisonRow_comparisonId_idx" ON "ComparisonRow"("comparisonId");

-- CreateIndex
CREATE UNIQUE INDEX "ComparisonRow_comparisonId_position_key" ON "ComparisonRow"("comparisonId", "position");

-- CreateIndex
CREATE INDEX "TermSource_sourceId_idx" ON "TermSource"("sourceId");

-- CreateIndex
CREATE INDEX "GuideSource_sourceId_idx" ON "GuideSource"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_locale_slug_key" ON "Product"("locale", "slug");

-- CreateIndex
CREATE INDEX "ProductTechnology_termId_idx" ON "ProductTechnology"("termId");

-- CreateIndex
CREATE INDEX "PriceBreakdown_productId_idx" ON "PriceBreakdown"("productId");

-- CreateIndex
CREATE INDEX "PriceBreakdown_priceFactorId_idx" ON "PriceBreakdown"("priceFactorId");

-- CreateIndex
CREATE INDEX "Visual_categoryId_idx" ON "Visual"("categoryId");

-- CreateIndex
CREATE INDEX "Visual_termId_idx" ON "Visual"("termId");
