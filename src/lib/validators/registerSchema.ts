// lib/validators/registerSchema.ts
import { z } from 'zod';

const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegExp = /^(?=.*[A-Z]).{8,}$/;
const capitalize = (value: string = "") =>
  value.trim().charAt(0).toUpperCase() + value.trim().slice(1).toLowerCase()


export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, 'Must be at least 2 characters long')
      .transform(capitalize),
    lastName: z
      .string()
      .trim()
      .min(2, 'Must be at least 2 characters long')
      .transform(capitalize),
    email: z
      .string()
      .regex(emailRegExp, 'Invalid email address'),
    password: z
      .string()
      .min(8, 'Must be at least 8 characters long')
      .regex(passwordRegExp, 'Contain at least 1 uppercase letter'),
    repeatPassword: z.string(),
  })
  .refine(data => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'Passwords must match',
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
