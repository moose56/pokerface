-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "owner" INTEGER NOT NULL,
    "document" JSONB NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "lastUpdatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_code_key" ON "Game"("code");
