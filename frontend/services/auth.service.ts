import { type SignUpType } from "../../shared/schemas/signup";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function SignUpApiService(user: SignUpType) {
  const res = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: user }),
    credentials: "include",
  });
  return res;
}

export async function SignOutApiService() {
  const res = await fetch(`${baseUrl}/auth/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return res;
}

export async function TempApiRefresh() {
  try {
    const res = await fetch(`${baseUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      console.log("Refresh succesfull");
    }else{
      console.log("Refresh unsuccesfull");
    }
    return res;
  } catch (e) {
    console.log("Error while refreshing")
  }
}
