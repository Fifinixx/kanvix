"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { customFetch } from "@/lib/api";
import { Me } from "@/services/auth.service";
import ApplicationSkeleton from "./applicationSkeleton";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "authed">("loading");

  useEffect(() => {
    let active = true; // guard against StrictMode double-run / unmount

    (async () => {
      const res = await customFetch(Me);

      if (res === 401) {
        if (active) router.replace("/auth");
        return;
      }

      if (active) setStatus("authed");
    })();

    return () => {
      active = false;
    };
  }, [router]);

  if (status === "loading") return <ApplicationSkeleton />;
  return <>{children}</>;
}
