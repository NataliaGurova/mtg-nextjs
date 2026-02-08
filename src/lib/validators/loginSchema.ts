import { z } from "zod";

const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegExp = /^(?=.*[A-Z]).{8,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "This field is required")
    .regex(emailRegExp, "Invalid email address"),

  password: z
    .string()
    .min(8, "Must be at least 8 characters long")
    .regex(passwordRegExp, "Contain at least 1 uppercase letter"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
