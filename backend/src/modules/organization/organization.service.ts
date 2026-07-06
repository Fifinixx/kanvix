import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { v4 as uuidv4 } from "uuid";
export async function OrganizationAddService(
  tx: Prisma.TransactionClient = prisma,
  name: string,
  userId: string,
) {
  const formedOrganization = { name: name, slug: uuidv4(), ownerId: userId };
  const { insertedOrganization, insertedMembership } =
    await prisma.$transaction(async () => {
      const insertedOrganization = await tx.organization.create({
        data: formedOrganization,
      });
      const insertedMembership = await tx.membership.create({
        data: {
          role: "ADMIN" as const,
          userId,
          orgId: insertedOrganization.id,
        },
      });
      return { insertedOrganization, insertedMembership };
    });

  return { insertedOrganization, insertedMembership };
}
