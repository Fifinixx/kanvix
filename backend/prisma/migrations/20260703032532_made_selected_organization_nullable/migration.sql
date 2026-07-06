-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_selectedOrganizationId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "selectedOrganizationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_selectedOrganizationId_fkey" FOREIGN KEY ("selectedOrganizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
