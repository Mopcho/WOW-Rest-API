-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "totalExperience" DOUBLE PRECISION NOT NULL DEFAULT 0;
