/*
  Warnings:

  - You are about to drop the column `selectedProjectId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_selectedProjectId_fkey";

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "selectedProjectId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "selectedProjectId";

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_selectedProjectId_fkey" FOREIGN KEY ("selectedProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
