export async function OrganizationAddApiService(name: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/organization/add`,
    {
      headers:{
        "Content-Type":"Application/json"
      },
      method: "POST",
      body: JSON.stringify({ data: { name } }),
      credentials: "include",
    },
    
  );
  return res;
}
