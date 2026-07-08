
export async function ProjectAddApiService(orgId: string, name:string) {
  const res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/add`, {
    method:"POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ data: { orgId, name } }),
    credentials: "include",
  });
  return res;
}
