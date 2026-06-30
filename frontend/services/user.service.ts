export async function UpdateNotificationService({
  notificationId,
  read,
}: {
  notificationId: string;
  read: boolean;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/notification`,
    {
      method: "PATCH",
      body: JSON.stringify({
        data: { notificationId, read },
      }),
    },
  );
  return res;
}

export async function FetchUserService(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
    credentials: "include",
  });
  return res;
}
