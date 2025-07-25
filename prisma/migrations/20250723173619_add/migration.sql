/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `googleId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleId" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Game_owner_idx" ON "Game"("owner");

-- CreateIndex
CREATE INDEX "Game_createdDate_idx" ON "Game"("createdDate");

-- CreateIndex
CREATE INDEX "Game_lastUpdatedDate_idx" ON "Game"("lastUpdatedDate");

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE INDEX "User_googleId_idx" ON "User"("googleId");
