-- DropForeignKey
ALTER TABLE "VehicleEntry" DROP CONSTRAINT "VehicleEntry_STSId_fkey";

-- DropForeignKey
ALTER TABLE "VehicleEntry" DROP CONSTRAINT "VehicleEntry_landFillId_fkey";

-- AlterTable
ALTER TABLE "VehicleEntry" ALTER COLUMN "STSId" DROP NOT NULL,
ALTER COLUMN "landFillId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "VehicleEntry" ADD CONSTRAINT "VehicleEntry_STSId_fkey" FOREIGN KEY ("STSId") REFERENCES "STS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleEntry" ADD CONSTRAINT "VehicleEntry_landFillId_fkey" FOREIGN KEY ("landFillId") REFERENCES "LandFill"("id") ON DELETE SET NULL ON UPDATE CASCADE;
