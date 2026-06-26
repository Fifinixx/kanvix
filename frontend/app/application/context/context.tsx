"use client";

import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

type UserContextType = {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
};
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType | undefined>(undefined);
  const router = useRouter();
  async function InitialUserFetch() {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) {
        res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
      }
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        router.push("/auth");
        toast.error("You do not have a valid session");
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    InitialUserFetch();
  }, []);
  return <UserContext.Provider value={user}></UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used inside <UserContextProvider>");
  return context;
}
