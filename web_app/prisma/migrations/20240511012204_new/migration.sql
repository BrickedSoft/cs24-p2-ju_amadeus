-- CreateTable
CREATE TABLE "CollectionPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "areaOfCollection" TEXT,
    "startTime" DATETIME,
    "durationForCollection" REAL,
    "numberOfLabors" INTEGER,
    "numberOfVans" INTEGER,
    "expectedWasteWeight" REAL,
    "userId" TEXT,
    CONSTRAINT "CollectionPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
