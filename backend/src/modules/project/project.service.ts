import { prisma } from "../../lib/prisma";
import { FetchUserService } from "../user/user.service";
import { OrganizationFetchService } from "../organization/organization.service";

export async function ProjectAddService(
  name: string,
  orgId: string,
  setDefault: string,
  userId: string,
) {
  const organization = await OrganizationFetchService(userId, orgId);
  if (organization === 403) return 403;

  const { insertedProject } = await prisma.$transaction(async (tx) => {
    const insertedProject = await tx.project.create({
      data: { name, orgId },
    });
    if (setDefault === "true") {
      await tx.membership.update({
        where: { userId_orgId: { userId, orgId: organization.id } },
        data: { selectedProjectId: insertedProject.id },
      });
    }
    return { insertedProject };
  });
  return insertedProject;
}

export async function ProjectFetchService(userId: string, projId: string) {
  const fetchedUser = await FetchUserService(userId);
  const fetchedProject = await prisma.project.findUniqueOrThrow({
    where: { id: projId },
  });
  const checkMembership = fetchedUser?.memberships?.find(
    (org) => org.orgId === fetchedProject?.orgId,
  );

  if (!checkMembership) return 403;

  return fetchedProject;
}

export async function ProjectSwitchService(userId: string, projId: string) {
  const fetchedProject = await ProjectFetchService(userId, projId);
  if (fetchedProject === 403) return 403;
  await prisma.membership.update({
    where: { userId_orgId: { userId, orgId: fetchedProject.orgId } },
    data: { selectedProjectId: fetchedProject.id },
  });
 
  return fetchedProject;
}
