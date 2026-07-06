import { useUserAuth } from "@/hooks/useUserAuth";
import { useId } from "@/app/application/context/context";
import { useEffect, useState } from "react";
import { FetchUserApiService } from "@/services/user.service";
import { customFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { UserType } from "../../shared/types";
import { toast } from "sonner";

export function useUser(){
const router = useRouter();
  const { handleSignOut } = useUserAuth();
  const { id } = useId();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>();
  async function fetchUser() {
    try {
      setLoading(true);
      if (id) {
        const res = await customFetch(() => FetchUserApiService(id));
        if (res === 401) {
          router.replace("/auth");
          setLoading(false);
          return;
        }
        if (!res.ok) {
          const data = await res.json();
          toast.error(data.message || "Error while fetching user");
          setLoading(false);
          return;
        }
        const data = await res.json();
        console.log("Fetched User:", data);
        setUser(data.user);
        setLoading(false);
      }
    } catch (e) {
      console.error(e, "Failed to fetch user!");
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);
  return {handleSignOut, fetchUser, loading, user}
}