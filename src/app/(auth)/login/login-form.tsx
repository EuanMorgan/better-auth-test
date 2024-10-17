"use client";

import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "~/auth/client";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type LoginSchema, loginSchema } from "~/validators/auth.schema";

export function LoginForm() {
  const form = useForm({
    schema: loginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: LoginSchema) => {
    await authClient.signIn.email(data, {
      onRequest: () => {
        setLoading(true);
      },
      onResponse: () => {
        setLoading(false);
      },
      onSuccess: () => {
        toast.success("Logged in successfully");
        router.push("/");
      },
      onError: () => {
        toast.error("Failed to login");
      },
    });
  };
  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="m@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button type="button" variant="outline" className="w-full">
              Login with Google
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
