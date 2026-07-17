import { prisma } from "../../lib/prisma";
import { FetchUserService } from "../user/user.service";
export async function ProjectAddService(
  name: string,
  orgId: string,
  setDefault: boolean,
  userId: string,
) {
  const fetchUser = await FetchUserService(userId);
  const checkMembership = fetchUser?.memberships?.find(
    (org) => org.orgId === orgId,
  );

  if (!checkMembership) return 401;
  const organization = await prisma.organization.findUniqueOrThrow({
    where: { id: orgId },
  });

  const { instertedProject, setProjDefault } = await prisma.$transaction(
    async (tx) => {
      const instertedProject = await tx.project.create({
        data: { name, orgId },
      });
      const setProjDefault = await tx.user.update({
        where: { id: userId },
        data: { selectedProjectId: instertedProject.id },
      });
      return { instertedProject, setProjDefault };
    },
  );
  return instertedProject;
}

export async function ProjectFetchService(userId: string, projId: string) {
  const fetchUser = await FetchUserService(userId);
  const fetchedProject = await prisma.project.findUnique({
    where: { id: projId },
  });
  const checkMembership = fetchUser?.memberships?.find(
    (org) => org.id === fetchedProject?.orgId,
  );

  if (!checkMembership) return 403;

  return fetchedProject;
}
