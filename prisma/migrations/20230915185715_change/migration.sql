-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "likes" INTEGER NOT NULL,
    "description" TEXT,
    "cooking_order" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "ingredients" TEXT NOT NULL,
    "image" TEXT,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("cooking_order", "created_at", "description", "difficulty", "id", "image", "ingredients", "likes", "userId") SELECT "cooking_order", "created_at", "description", "difficulty", "id", "image", "ingredients", "likes", "userId" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
