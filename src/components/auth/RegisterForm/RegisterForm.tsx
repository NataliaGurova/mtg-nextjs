
'use client';

import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';

import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import clsx from 'clsx';

import { Eye, EyeOff } from 'lucide-react';

import css from './RegisterForm.module.css';
import { registerSchema, RegisterFormData } from '@/lib/validators/registerSchema';
import { signIn } from 'next-auth/react';
import focusNext from "@/lib/helpers/focusNext";


const RegisterForm = () => {

  const router = useRouter();
  const pathname = usePathname();
  
  
  const [showPassword, setShowPassword] = useState(false);

  const capitalize = (value: string = "") =>
    value.trimStart().charAt(0).toUpperCase() + value.trimStart().slice(1);

  
  // const capitalize = (value = "") =>
  //   value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

  const toggleVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });
  

  // const onSubmit = async (data: RegisterFormData) => {
  //   console.log('REGISTER DATA:', data);
  //   // 👉 POST /api/auth/register
  // };


const onSubmit = async (data: RegisterFormData) => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    alert(error.message);
    return;
  }

  // 🔑 автологин после регистрации
  await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  router.push("/account");
};


  return (
    <div className={css.container}>
      <h1 className={css.title}>Register a New account</h1>

      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <label className={css.label}>
        <Controller
  name="firstName"
  control={control}
  render={({ field }) => (
    <input
      {...field}
      placeholder="First name"
      className={css.input}
      onChange={(e) => {
        field.onChange(capitalize(e.target.value));
      }}
      onKeyDown={focusNext("lastName")}
    />
  )}
/>
        </label>
        <div className={css.error}>
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <label className={css.label}>
        <Controller
  name="lastName"
  control={control}
  render={({ field }) => (
    <input
      {...field}
      placeholder="Last name"
      className={css.input}
      onChange={(e) => {
        field.onChange(capitalize(e.target.value));
      }}
      onKeyDown={focusNext("email")}
    />
  )}
/>
        </label>
        <div className={css.error}>
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <label className={css.label}>
        <Controller
  name="email"
  control={control}
  render={({ field }) => (
    <input
      {...field}
      placeholder="Email"
      className={css.input}
      onKeyDown={focusNext("password")}
    />
  )}
/>
        </label>
        <div className={css.error}>
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <label className={css.label}>
          <div className={css.passwordContainer}>
            <Controller
  name="password"
  control={control}
  render={({ field }) => (
    <input
      {...field}
      placeholder="Password"
      className={css.input}
      type={showPassword ? 'text' : 'password'}
      onKeyDown={focusNext("repeatPassword")}
    />
  )}
/>
            <button
              type="button"
              onClick={toggleVisibility}
              className={css.toggleButton}
              aria-label="Toggle Password Visibility"
            >
              {showPassword ? <Eye size={18}/> : <EyeOff size={18} />}
            </button>
          </div>
        </label>
        <div className={css.error}>
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <label className={css.label}>
          <div className={css.passwordContainer}>
            {/* <input
              {...register('repeatPassword')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat Password"
              className={css.input}
            /> */}
            <Controller
  name="repeatPassword"
  control={control}
  render={({ field }) => (
    <input
      {...field}
      placeholder="Repeat Password"
      className={css.input}
      type={showPassword ? 'text' : 'password'}
      onKeyDown={focusNext("password")}
    />
  )}
/>
            <button
              type="button"
              onClick={toggleVisibility}
              className={css.toggleButton}
              aria-label="Toggle Password Visibility"
            >
              {showPassword ? <Eye size={18}/> : <EyeOff size={18} />}
            </button>
          </div>
        </label>
        <div className={css.error}>
          {errors.repeatPassword && (
            <p>{errors.repeatPassword.message}</p>
          )}
        </div>

        <input
          className={css.btn}
          type="submit"
          value="Register"
          disabled={!isValid}
        />
      </form>

      <div className={css.linkSign}>
        <p>Already have an account?</p>
        {/* <Link
  href="/login"
  className={clsx(css.link, clientPath === "/login" && css.active)}
>
  Login
</Link> */}

        <Link
          href="/login"
          className={clsx(css.link, pathname === "/login" && css.active)}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
