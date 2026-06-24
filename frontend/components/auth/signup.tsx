"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserRegistration } from "@/hooks/useUserRegistration";
import { Spinner } from "../ui/spinner";

export default function SignUpForm() {
  const { userInputs, handleInputChange, handleSignUp, loading, error } =
    useUserRegistration();
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="relative grid gap-2">
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
            className={
              error.firstName
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {error.firstName && (
            <span className="text-xs font-bold text-center text-red-500">
              {error.firstName}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            value={userInputs.lastName}
            onChange={(e) => handleInputChange(e)}
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            required
            autoComplete="family-name"
            className={
              error.lastName
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {error.lastName && (
            <span className="text-xs font-bold text-center text-red-500">
              {error.lastName}
            </span>
          )}
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
            className={
              error.email
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {error.email && (
            <span className="text-xs font-bold text-center text-destructive">
              {error.email}
            </span>
          )}
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
            className={
              error.password
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {error.password && (
            <span className="text-xs font-bold text-center text-red-500">
              {error.password}
            </span>
          )}
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
