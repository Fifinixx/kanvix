import { type SignUpType } from "../../shared/schemas/signup";
import { type SignInType } from "../../shared/schemas/signin";
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

export async function SignInApiService(user:SignInType){
   const res = await fetch(`${baseUrl}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({ data: user }),
    credentials: "include",
  });
  return res;
}

export async function Me() {
  const res = await fetch(`${baseUrl}/auth/me`, {
    method: "GET",
    credentials: "include",
  });
  return res;
}


