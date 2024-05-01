-- CreateTable
CREATE TABLE "VehicleRoute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME,
    "distance" REAL NOT NULL,
    "duration" REAL NOT NULL,
    "stsId" TEXT,
    "landFillId" TEXT,
    CONSTRAINT "VehicleRoute_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "VehicleRoute_landFillId_fkey" FOREIGN KEY ("landFillId") REFERENCES "LandFill" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
