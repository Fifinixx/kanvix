"use client";

import { SignOutApiService, SignUpApiService } from "@/services/auth.service";
import { useState, useEffect } from "react";
import { type SignUpType, SignUpSchema } from "../../shared/schemas/signup";
import { fromZodError } from "zod-validation-error";
import { toast } from "sonner";


export function useUserRegistration() {
  const emptyUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }
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
      const formattedErrors:Partial<Record<keyof SignUpType, string>>= errors.details.reduce(
        (acc, err) => {
          const field = err.path[0] as keyof SignUpType;
          acc[field] = err.message;
          return acc;
        },
         {} as Partial<Record<keyof SignUpType, string>> ,
      );
      setError(formattedErrors);
      toast.error("Invalid inputs");
      return;
    }
    try {
      setLoading(true);
      const signup = await SignUpApiService(userInputs);
      if (!signup.ok) {
        toast.error("Error while fetching response");
        setLoading(false);
      }
    } catch (e:any) {
      toast.error(e.message || "Error while fetching response");
    } finally {
      setLoading(false);
    }
  }


  return { userInputs, handleInputChange, handleSignUp, loading, error };
}
