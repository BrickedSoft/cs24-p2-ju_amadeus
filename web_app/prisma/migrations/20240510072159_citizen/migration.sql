-- CreateTable
CREATE TABLE "Citizen" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "nationalId" TEXT
);

-- CreateTable
CREATE TABLE "_CitizenToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CitizenToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Citizen" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CitizenToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CitizenToUser_AB_unique" ON "_CitizenToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CitizenToUser_B_index" ON "_CitizenToUser"("B");
