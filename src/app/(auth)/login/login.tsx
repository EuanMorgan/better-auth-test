import Link from "next/link";
import { LoginForm } from "~/app/(auth)/login/login-form";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function Login() {
  return (
    <div className="w-full lg:grid h-full lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden text-primary-foreground bg-gradient-to-b from-primary/60 to-primary/50 lg:flex flex-col h-full items-center justify-center">
        <p className="text-2xl font-bold">
          Wow, I guess this auth{" "}
          <span className="underline italic bold animate-[spin_2s_linear_infinite] inline-block">
            is
          </span>{" "}
          <span className="inline-block animate-[pulse_2s_linear_infinite]">
            better
          </span>
        </p>
        <p className="text-[0.7rem] text-primary-foreground">
          Don&apos;t worry because it&apos;ll be deprecated next week
        </p>
      </div>
    </div>
  );
}
