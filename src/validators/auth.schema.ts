import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginSchema = z.infer<typeof loginSchema>;
