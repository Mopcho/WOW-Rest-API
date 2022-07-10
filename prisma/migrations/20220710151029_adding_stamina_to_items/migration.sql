/*
  Warnings:

  - Added the required column `stamina` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "stamina" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "totalHealth" INTEGER NOT NULL DEFAULT 100;
