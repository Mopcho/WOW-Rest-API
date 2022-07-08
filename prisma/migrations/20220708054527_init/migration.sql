-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('Weapon', 'Arrmor');

-- CreateEnum
CREATE TYPE "WeaponType" AS ENUM ('Sword', 'Mace', 'Bow', 'Scepter');

-- CreateEnum
CREATE TYPE "ArrmorType" AS ENUM ('Mail', 'Cloth', 'Plate');

-- CreateEnum
CREATE TYPE "Faction" AS ENUM ('Alliance', 'Horder');

-- CreateEnum
CREATE TYPE "Races" AS ENUM ('Human', 'Dwarf', 'Gnome', 'NighElf', 'Orc', 'Troll', 'Tauren', 'BloodElf');

-- CreateEnum
CREATE TYPE "SkillNames" AS ENUM ('Fishing', 'FirstAid', 'Cooking', 'Blacksmith');

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "faction" "Faction" NOT NULL,
    "race" "Races" NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "weaponType" "WeaponType",
    "physicalDamage" INTEGER,
    "arrmorType" "ArrmorType" NOT NULL,
    "defence" INTEGER,
    "dodge" DOUBLE PRECISION,
    "playerId" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
