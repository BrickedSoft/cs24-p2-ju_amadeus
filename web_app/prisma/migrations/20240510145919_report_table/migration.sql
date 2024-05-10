-- CreateTable
CREATE TABLE "IssueReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportType" TEXT,
    "location" TEXT,
    "description" TEXT,
    "userId" TEXT,
    CONSTRAINT "IssueReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
