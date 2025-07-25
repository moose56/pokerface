/*
  Warnings:

  - You are about to drop the column `expiersAt` on the `Session` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "expiersAt",
ADD COLUMN     "expiresAt" INTEGER NOT NULL;
