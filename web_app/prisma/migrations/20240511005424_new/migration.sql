-- CreateTable
CREATE TABLE "WasteEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wasteVolume" REAL NOT NULL,
    "collectionDate" DATETIME NOT NULL,
    "wasteType" TEXT NOT NULL,
    "vehicleId" TEXT,
    "contractorId" TEXT,
    "stsId" TEXT,
    CONSTRAINT "WasteEntry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "WasteEntry_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "WasteEntry_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
