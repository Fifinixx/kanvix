"use client";

import { useUserAuth } from "@/hooks/useUserAuth";
import { useId } from "@/app/application/context/id-context";
import {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { FetchUserApiService } from "@/services/user.service";
import { customFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { UserType } from "../../../../shared/types";
import { toast } from "sonner";

type UserContextType = {
  user: UserType | null;
  handleSignOut: () => Promise<void>;
  fetchUser: () => Promise<void>;
  loadingUser: boolean;
};

const UserContext = createContext<UserContextType | null>(null);
export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const { handleSignOut } = useUserAuth();
  const [loadingUser, setLoadingUser] = useState(true);
  async function fetchUser() {
    try {
        const res = await customFetch(() => FetchUserApiService());
        if (res === 401) {
          router.replace("/auth");
          return;
        }
        if (!res.ok) {
          const data = await res.json();
          toast.error(data.message || "Error while fetching user");
          return;
        }
        const data = await res.json();
        setUser(data.user);
    } catch (e) {
      console.error(e, "Failed to fetch user!");
    } finally {
      setLoadingUser(false);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, handleSignOut, fetchUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside <UserContextProvider>");
  }
  return context;
}
