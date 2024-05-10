/*
  Warnings:

  - You are about to drop the `Citizen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CitizenToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Citizen";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CitizenToUser";
PRAGMA foreign_keys=on;
