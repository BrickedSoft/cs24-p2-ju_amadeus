-- DropForeignKey
ALTER TABLE "LoginToken" DROP CONSTRAINT "LoginToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "VehicleEntry" DROP CONSTRAINT "VehicleEntry_vehicleId_fkey";

-- AlterTable
ALTER TABLE "LoginToken" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VehicleEntry" ALTER COLUMN "vehicleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "LoginToken" ADD CONSTRAINT "LoginToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleEntry" ADD CONSTRAINT "VehicleEntry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
