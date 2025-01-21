/*
  Warnings:

  - You are about to drop the column `filePath` on the `Menu` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER,
    "label" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "icon" TEXT DEFAULT '',
    "type" INTEGER NOT NULL,
    "route" TEXT DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 1,
    "component" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Menu" ("createdAt", "id", "name", "parentId", "type", "updatedAt") SELECT "createdAt", "id", "name", "parentId", "type", "updatedAt" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
CREATE UNIQUE INDEX "Menu_name_key" ON "Menu"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
