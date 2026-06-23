"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserRegistration } from "@/hooks/useUserRegistration";
import { Spinner } from "../ui/spinner";

export default function SignUpForm() {
  const { userInputs, handleInputChange, handleSignUp, loading } =
    useUserRegistration();
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            value={userInputs.firstName}
            onChange={(e) => handleInputChange(e)}
            name="firstName"
            id="firstName"
            type="text"
            placeholder="John"
            required
            autoComplete="given-name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Doe</Label>
          <Input
            value={userInputs.lastName}
            onChange={(e) => handleInputChange(e)}
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            required
            autoComplete="family-name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            value={userInputs.email}
            onChange={(e) => handleInputChange(e)}
            name="email"
            id="email"
            type="email"
            placeholder="john@example.com"
            required
            autoComplete="email"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            value={userInputs.password}
            onChange={(e) => handleInputChange(e)}
            name="password"
            id="password"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Button
            disabled={loading}
            type="button"
            onClick={handleSignUp}
            className="w-full cursor-pointer"
          >
            {loading ? <Spinner /> : "Sign up"}
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </div>
      </div>
    </form>
  );
}
