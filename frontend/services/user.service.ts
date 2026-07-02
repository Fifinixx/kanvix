export async function FetchUserApiService(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
    credentials: "include",
  });
  return res;
}

export async function FetchNotificationApiService(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/notifications`,
    {
      credentials: "include",
    },
  );
  return res;
}

export async function UpdateNotificationsApiService(id:string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/notifications`,
    {
      method: "PATCH",
      body: JSON.stringify({
        data: { id },
      }),
      credentials:"include"
    },
  );
  return res;
}
