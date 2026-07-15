-- AlterTable
ALTER TABLE "User" ADD COLUMN     "selectedProjectId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_selectedProjectId_fkey" FOREIGN KEY ("selectedProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
