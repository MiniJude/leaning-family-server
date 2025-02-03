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
    "order" INTEGER DEFAULT 1,
    "component" TEXT,
    "hide" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Menu" ("component", "createdAt", "hide", "icon", "id", "label", "name", "order", "parentId", "route", "type", "updatedAt") SELECT "component", "createdAt", "hide", "icon", "id", "label", "name", "order", "parentId", "route", "type", "updatedAt" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
CREATE UNIQUE INDEX "Menu_name_key" ON "Menu"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
