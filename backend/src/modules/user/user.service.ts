import { prisma } from "../../lib/prisma";
export async function FetchUserService(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      passwordHash: true,
      createdAt: true,
    },
  });
  if (!user) {
    return undefined;
  }
  return user;
}

export async function FetchNotificationService(id: string) {
  const fetchedNotifications = await prisma.notification.findMany({
    where: {
      userId: id,
    },
  });
  return fetchedNotifications;
}

export async function UpdateNotificationService(userId: string) {
  const result = await prisma.notification.updateMany({
    where: {
      userId,
      read: false,
    },
    data: {
      read: true,
    },
  });
  return result;
}
