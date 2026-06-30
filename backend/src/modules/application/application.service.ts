import { prisma } from "../../lib/prisma";
export async function OrgranizationsService(userId: string) {
  const orgList = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      memberships: true,
    },
  });
}
