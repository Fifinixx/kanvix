"use client";

import { useState } from "react";
import SignInForm from "@/components/auth/signin";
import SignUpForm from "@/components/auth/signup";
import BrandPanel from "@/components/auth/brandPanel";
import { useUserAuth } from "@/hooks/useUserAuth";


export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
    const authHook =
    useUserAuth();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
        <BrandPanel />
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          {mode === "signin" ? (
            <SignInForm authHook={authHook} onSwitch={() => setMode("signup")} />
          ) : (
            <SignUpForm authHook={authHook} onSwitch={() => setMode("signin")} />
          )}
        </div>
      </div>
    </div>
  );
}
