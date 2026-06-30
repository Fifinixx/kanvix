import { prisma } from "../../lib/prisma";
export async function UpdateNotificationService(
  notificationId: string,
  read: boolean,
) {
  const updatedNotification = await prisma.notification.update({
    where: { id: notificationId },
    data: { read: read },
  });
  return updatedNotification;
}

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
