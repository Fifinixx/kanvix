export async function OrganizationAddApiService(name: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/organization/add`,
    {
      headers: {
        "Content-Type": "Application/json",
      },
      method: "POST",
      body: JSON.stringify({ data: { name } }),
      credentials: "include",
    },
  );
  return res;
}

export async function OrganizationFetchApiService(orgId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/organization/${orgId}`,
    {
      credentials:"include"
    },
  );
  return res;
}

export async function OrganizationSwitchApiService(orgId:string, userId:string){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/organization/switch`, {
    method:"PATCH",
    headers:{
      "Content-Type":"Application/json"
    },
    body:JSON.stringify({data:{orgId}}),
    credentials:"include"
  });

  return res;
}