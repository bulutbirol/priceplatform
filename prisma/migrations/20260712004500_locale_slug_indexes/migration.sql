CREATE UNIQUE INDEX IF NOT EXISTS "Category_locale_slug_key" ON "Category"("locale", "slug");
CREATE UNIQUE INDEX IF NOT EXISTS "TechnologyTerm_locale_slug_key" ON "TechnologyTerm"("locale", "slug");
CREATE UNIQUE INDEX IF NOT EXISTS "PriceFactor_locale_slug_key" ON "PriceFactor"("locale", "slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Guide_locale_slug_key" ON "Guide"("locale", "slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Brand_locale_slug_key" ON "Brand"("locale", "slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Comparison_locale_slug_key" ON "Comparison"("locale", "slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Product_locale_slug_key" ON "Product"("locale", "slug");
