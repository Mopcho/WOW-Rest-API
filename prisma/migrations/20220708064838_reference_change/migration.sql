/*
  Warnings:

  - You are about to drop the column `playerId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_playerId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "playerId";

-- CreateTable
CREATE TABLE "_ItemToPlayer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToPlayer_AB_unique" ON "_ItemToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToPlayer_B_index" ON "_ItemToPlayer"("B");

-- AddForeignKey
ALTER TABLE "_ItemToPlayer" ADD CONSTRAINT "_ItemToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToPlayer" ADD CONSTRAINT "_ItemToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
