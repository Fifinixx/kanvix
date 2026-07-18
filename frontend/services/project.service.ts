export async function ProjectAddApiService(orgId: string, name: string, setDefault?:string) {
  const res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/add`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ data: { orgId, name, setDefault: setDefault === "true" && setDefault } }),
    credentials: "include",
  });
  return res;
}

export async function ProjectFetchApiService(projId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/project/${projId}`,
    {
      credentials: "include",
    },
  );
  return res;
}

export async function ProjectSwitchApiService(projId:string){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`, {
    method:"PATCH",
    headers:{
      "Content-Type":"Application/json"
    },
    body: JSON.stringify({data:{projId}}),
    credentials:"include"
  })

  return res;
}
