"use client";

import { Loader2 } from "lucide-react";
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
import { type SignUpSchema, signUpSchema } from "~/validators/auth.schema";

export function SignUpForm() {
  const form = useForm({
    schema: signUpSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: SignUpSchema) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          toast.success("Account created successfully");
          router.push("/");
        },
        onError: () => {
          toast.error("Failed to create account");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="first-name">First name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="first-name">Last name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="McJavaScript" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="m@example.com" />
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* todo: set up loading button */}
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
