/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayersOnGames` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Round` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayersOnGames" DROP CONSTRAINT "PlayersOnGames_gameId_fkey";

-- DropForeignKey
ALTER TABLE "PlayersOnGames" DROP CONSTRAINT "PlayersOnGames_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Round" DROP CONSTRAINT "Round_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_playerId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_roundId_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "Player";

-- DropTable
DROP TABLE "PlayersOnGames";

-- DropTable
DROP TABLE "Round";

-- DropTable
DROP TABLE "Score";
