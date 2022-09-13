/*
  Warnings:

  - You are about to drop the column `userId` on the `Hobbies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_HobbiesToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_HobbiesToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Hobbies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_HobbiesToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hobbies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL
);
INSERT INTO "new_Hobbies" ("active", "id", "image", "name") SELECT "active", "id", "image", "name" FROM "Hobbies";
DROP TABLE "Hobbies";
ALTER TABLE "new_Hobbies" RENAME TO "Hobbies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_HobbiesToUsers_AB_unique" ON "_HobbiesToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_HobbiesToUsers_B_index" ON "_HobbiesToUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
