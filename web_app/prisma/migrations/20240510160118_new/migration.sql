-- CreateTable
CREATE TABLE "Contractor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tin" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "salary" REAL NOT NULL,
    "wasteVolume" REAL NOT NULL,
    "termination" DATETIME,
    "wardNumber" TEXT NOT NULL,
    "stsId" TEXT,
    CONSTRAINT "Contractor_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Workforce" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "designation" TEXT NOT NULL,
    "joiningDate" DATETIME NOT NULL,
    "salary" REAL NOT NULL,
    "contact" TEXT NOT NULL,
    "termination" DATETIME,
    "sTSId" TEXT,
    CONSTRAINT "Workforce_sTSId_fkey" FOREIGN KEY ("sTSId") REFERENCES "STS" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "password" TEXT NOT NULL,
    "resetToken" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT,
    "contact" TEXT,
    "contractCompany" TEXT,
    "accessLevel" TEXT,
    "roleId" TEXT NOT NULL,
    "workforceId" TEXT,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_workforceId_fkey" FOREIGN KEY ("workforceId") REFERENCES "Workforce" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "emailVerified", "id", "name", "password", "resetToken", "roleId") SELECT "email", "emailVerified", "id", "name", "password", "resetToken", "roleId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_VehicleRoute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME,
    "distance" REAL NOT NULL,
    "duration" REAL NOT NULL,
    "stsId" TEXT,
    "landFillId" TEXT,
    "workforceId" TEXT,
    CONSTRAINT "VehicleRoute_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "VehicleRoute_landFillId_fkey" FOREIGN KEY ("landFillId") REFERENCES "LandFill" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "VehicleRoute_workforceId_fkey" FOREIGN KEY ("workforceId") REFERENCES "Workforce" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_VehicleRoute" ("distance", "duration", "id", "landFillId", "stsId", "timestamp") SELECT "distance", "duration", "id", "landFillId", "stsId", "timestamp" FROM "VehicleRoute";
DROP TABLE "VehicleRoute";
ALTER TABLE "new_VehicleRoute" RENAME TO "VehicleRoute";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_tin_key" ON "Contractor"("tin");
