/*
  Warnings:

  - Added the required column `fuelCostLoaded` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuelCostUnloaded` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "fuelCostLoaded" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fuelCostUnloaded" DOUBLE PRECISION NOT NULL;
