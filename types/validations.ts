import { z } from "zod";

const RegisterSchema = z.object({
  email: z.email().min(3, "Email must not be less than 3 characters"),
  username: z.string().min(3, "Username must not be less than 3 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((val) => /[A-Z]/.test(val), "Must include an uppercase letter")
    .refine((val) => /[0-9]/.test(val), "Must include a number")
    .refine(
      (val) => /[^A-Za-z0-9]/.test(val),
      "Must include a special character",
    ),
});

const LoginSchema = z.object({
  email: z.email().min(3, "Email must not be lesss than 3 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((val) => /[A-Z]/.test(val), "Must include an uppercase letter")
    .refine((val) => /[0-9]/.test(val), "Must include a number")
    .refine(
      (val) => /[^A-Za-z0-9]/.test(val),
      "Must include a special character",
    ),
});

export { RegisterSchema, LoginSchema };
