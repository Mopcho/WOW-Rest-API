/*
  Warnings:

  - Added the required column `price` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gold` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loses` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wins` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "gold" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "loses" INTEGER NOT NULL,
ADD COLUMN     "wins" INTEGER NOT NULL;
