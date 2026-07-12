CREATE TABLE "CategoryGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" INTEGER NOT NULL
);

CREATE UNIQUE INDEX "CategoryGroup_locale_slug_key" ON "CategoryGroup"("locale", "slug");

ALTER TABLE "Category" ADD COLUMN "groupId" TEXT REFERENCES "CategoryGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "Category_groupId_idx" ON "Category"("groupId");
