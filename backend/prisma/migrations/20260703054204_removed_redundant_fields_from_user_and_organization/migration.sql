/*
  Warnings:

  - You are about to drop the `_JoinedOrganizations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_JoinedOrganizations" DROP CONSTRAINT "_JoinedOrganizations_A_fkey";

-- DropForeignKey
ALTER TABLE "_JoinedOrganizations" DROP CONSTRAINT "_JoinedOrganizations_B_fkey";

-- DropTable
DROP TABLE "_JoinedOrganizations";
