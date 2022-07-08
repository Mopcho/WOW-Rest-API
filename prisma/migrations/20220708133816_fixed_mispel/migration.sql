/*
  Warnings:

  - The values [Horder] on the enum `Faction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Faction_new" AS ENUM ('Alliance', 'Horde');
ALTER TABLE "Player" ALTER COLUMN "faction" TYPE "Faction_new" USING ("faction"::text::"Faction_new");
ALTER TYPE "Faction" RENAME TO "Faction_old";
ALTER TYPE "Faction_new" RENAME TO "Faction";
DROP TYPE "Faction_old";
COMMIT;
