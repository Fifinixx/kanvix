"use client";

import { useRouter } from "next/navigation";
import {
  SignInApiService,
  SignOutApiService,
  SignUpApiService,
} from "@/services/auth.service";
import { useState, useEffect } from "react";
import { type SignUpType, SignUpSchema } from "../../shared/schemas/signup";
import { type SignInType, SignInSchema } from "../../shared/schemas/signin";
import { fromZodError } from "zod-validation-error";
import { toast } from "sonner";

export function useUserAuth() {
  const router = useRouter();
  const emptyUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [userInputs, setUserInputs] = useState(emptyUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Partial<SignUpType>>(emptyUser);
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSignUp() {
    const parseUser = SignUpSchema.safeParse(userInputs);
    if (!parseUser.success) {
      const errors = fromZodError(parseUser.error);
      const formattedErrors: Partial<Record<keyof SignUpType, string>> =
        errors.details.reduce(
          (acc, err) => {
            const field = err.path[0] as keyof SignUpType;
            acc[field] = err.message;
            return acc;
          },
          {} as Partial<Record<keyof SignUpType, string>>,
        );
      setError(formattedErrors);
      toast.error("Invalid inputs, please try again!");
      return;
    }
    try {
      setLoading(true);
      const signup = await SignUpApiService(userInputs);
      if (!signup.ok) {
        const data = await signup.json();
        toast.error(data.message || "Error while signing up!");
        setLoading(false);
        return;
      }
      toast.success("User registration succesful");
      // Hard navigation: same reason as sign-in — guarantee the freshly-set
      // cross-origin cookies are committed before proxy.ts reads them, and
      // bypass any stale client-router cache entry for /application.
      window.location.assign("/application");
    } catch (e: any) {
      toast.error(e.message || "Error while signing up!");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignIn() {
    const parseUser = SignInSchema.safeParse(userInputs);
    if (!parseUser.success) {
      const errors = fromZodError(parseUser.error);
      const formattedErrors: Partial<Record<keyof SignInType, string>> =
        errors.details.reduce(
          (acc, err) => {
            const field = err.path[0] as keyof SignInType;
            acc[field] = err.message;
            return acc;
          },
          {} as Partial<Record<keyof SignInType, string>>,
        );
      setError(formattedErrors);
      toast.error("Invalid inputs, please try again!");
      return;
    }
    try {
      setLoading(true);
      const signin = await SignInApiService({
        email: userInputs.email,
        password: userInputs.password,
      });
      if (!signin.ok) {
        const data = await signin.json();
        toast.error(data.message || "Error while signing in");
        setLoading(false);
        return;
      }
      toast.success("User signed in!");
      // Hard navigation (not router.push): guarantees the freshly-set
      // cross-origin refreshToken cookie is committed before proxy.ts reads it,
      // and bypasses any stale App Router client cache entry for /application
      // left behind by an earlier proxy redirect.
      //  router.push("/application");
      // router.refresh();
      window.location.assign("/application");
    } catch (e: any) {
      toast.error(e.message || "Error signing in");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      await SignOutApiService();
      router.push("/");
    } catch (e: any) {
      toast.error(e.message || "Error occured while signing out");
    }
  }

  return {
    userInputs,
    handleInputChange,
    handleSignUp,
    loading,
    error,
    handleSignIn,
    handleSignOut,
  };
}

export type UserAuthHookType = ReturnType<typeof useUserAuth>;
