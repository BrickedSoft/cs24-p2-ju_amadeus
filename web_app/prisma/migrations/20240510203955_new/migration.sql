-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "password" TEXT NOT NULL,
    "resetToken" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contact" TEXT,
    "roleId" TEXT NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LoginToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT,
    "userId" TEXT,
    CONSTRAINT "LoginToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "STS" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wardNumber" TEXT NOT NULL,
    "name" TEXT,
    "capacity" REAL,
    "longitude" REAL,
    "latitude" REAL
);

-- CreateTable
CREATE TABLE "LandFill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "longitude" REAL,
    "latitude" REAL
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "capacity" REAL NOT NULL,
    "fuelCostUnloaded" REAL NOT NULL,
    "fuelCostLoaded" REAL NOT NULL,
    "stsId" TEXT,
    CONSTRAINT "Vehicle_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VehicleEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wasteVolume" REAL NOT NULL,
    "arrivalTime" DATETIME NOT NULL,
    "departureTime" DATETIME NOT NULL,
    "vehicleId" TEXT,
    "STSId" TEXT,
    "landFillId" TEXT,
    CONSTRAINT "VehicleEntry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "VehicleEntry_STSId_fkey" FOREIGN KEY ("STSId") REFERENCES "STS" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "VehicleEntry_landFillId_fkey" FOREIGN KEY ("landFillId") REFERENCES "LandFill" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

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
    "wardNumber" TEXT,
    "stsId" TEXT,
    "userId" TEXT,
    CONSTRAINT "Contractor_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Contractor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Workforce" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "designation" TEXT NOT NULL,
    "nid" TEXT NOT NULL,
    "joiningDate" DATETIME NOT NULL,
    "salary" REAL NOT NULL,
    "contact" TEXT NOT NULL,
    "userId" TEXT,
    "contractorId" TEXT,
    CONSTRAINT "Workforce_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Workforce_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IssueReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportType" TEXT,
    "location" TEXT,
    "description" TEXT,
    "userId" TEXT,
    CONSTRAINT "IssueReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LocationPoll" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pollingTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "longitude" REAL,
    "latitude" REAL,
    "userId" TEXT,
    CONSTRAINT "LocationPoll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_STSToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_STSToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "STS" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_STSToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_LandFillToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_LandFillToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "LandFill" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LandFillToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_number_key" ON "Vehicle"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_tin_key" ON "Contractor"("tin");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_userId_key" ON "Contractor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Workforce_nid_key" ON "Workforce"("nid");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON "_PermissionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_STSToUser_AB_unique" ON "_STSToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_STSToUser_B_index" ON "_STSToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LandFillToUser_AB_unique" ON "_LandFillToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LandFillToUser_B_index" ON "_LandFillToUser"("B");
