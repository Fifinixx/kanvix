export async function FetchUserApiService(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
    credentials: "include",
  });
  return res;
}

export async function FetchNotificationsApiService(userId: string) {
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
      credentials:"include"
    },
  );
  return res;
}

