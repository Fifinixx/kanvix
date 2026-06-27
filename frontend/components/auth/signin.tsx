"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "../ui/spinner";
import { UserAuthHookType } from "@/hooks/useUserAuth";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.22V7.04H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

export default function SignInForm({
  onSwitch,
  authHook,
}: {
  onSwitch?: () => void;
  authHook: UserAuthHookType;
}) {
  const { userInputs, handleInputChange, handleSignIn, loading, error } =
    authHook;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Log in to your account to continue.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
        className="flex flex-col gap-5"
      >
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={handleInputChange}
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            autoComplete="email"
            required
          />
          {error.email && (
            <span className="text-xs text-destructive">{error.email}</span>
          )}
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            onChange={handleInputChange}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          {error.password && (
            <span className="text-xs text-destructive">{error.password}</span>
          )}
        </div>

        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Spinner /> : "Sign in"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Button variant="outline" type="button" className="w-full gap-2">
        <GoogleIcon />
        Sign in with Google
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
