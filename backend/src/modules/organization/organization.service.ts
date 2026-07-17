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

export async function OrganizationFetchService(userId: string, orgId: string) {
  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    include: {
      memberships: {
        where: { userId: userId },
      },
      projects:true
    },
  });
  if (!org) {
    return 404;
  }
  if (org.memberships.length === 0) {
    return 403;
  }

  const {memberships, ...fetchedOrganization} = org;

  return fetchedOrganization;
}

export async function OrganizationSwitchService(orgId: string, userId: string) {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { selectedOrganizationId: orgId },
  });

  return updatedUser;
}
