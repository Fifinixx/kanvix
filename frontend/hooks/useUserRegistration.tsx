"use client";

import { SignOutApiService, SignUpApiService } from "@/services/auth.service";
import { useState, useEffect } from "react";
import { type SignUpType, SignUpSchema } from "../../shared/schemas/signup";
import { fromZodError } from "zod-validation-error";
import { toast } from "sonner";

export function useUserRegistration() {
  const [userInputs, setUserInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<SignUpType | {}>({});
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSignUp() {
    const parseUser = SignUpSchema.safeParse(userInputs);
    if (!parseUser.success) {
      const errors = fromZodError(parseUser.error);
      const formattedErrors = errors.details.reduce(
        (acc, err) => {
          const field = err.path[0] as string;
          acc[field] = err.message;
          return acc;
        },
        {} as Record<string, string>,
      );
      setError(prev => ({...formattedErrors}));
      toast.error("Invalid inputs");
      return;
    }
    try {
      setLoading(true);
      console.log(userInputs)
      const signup = await SignUpApiService(userInputs);
      if (!signup.ok) {
        toast.error("Error while fetching response");
        setLoading(false);
      }
    } catch (e) {
      console.log("Fetch failed");
    } finally {
      setLoading(false);
    }
  }


  return { userInputs, handleInputChange, handleSignUp, loading, error };
}
