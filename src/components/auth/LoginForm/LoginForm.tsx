'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
// import clsx from "clsx";

import css from "./LoginForm.module.css";
import { LoginFormData, loginSchema } from "@/lib/validators/loginSchema";
import { useRouter } from "next/navigation";
import focusNext from "@/lib/helpers/focusNext";


const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",       // 👈 ВАЖНО
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError("");

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setAuthError("Invalid email or password");
      return;
    }

    // reset();
    router.push("/account");
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Sign in</h1>

      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        {/* EMAIL */}
        <label className={css.label}>
          <input
            {...register("email")}
            placeholder="Email"
            className={css.input}
            onKeyDown={focusNext("password")}
          />
        </label>
        <div className={css.error}>
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* PASSWORD */}
        <label className={css.label}>
          <div className={css.passwordContainer}>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={css.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className={css.toggleButton}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <Eye size={18}/> : <EyeOff size={18} />}
            </button>
          </div>
        </label>

        <div className={css.error}>
          {errors.password && (
            <p>{errors.password.message}</p>
          )}
        </div>

        {/* AUTH ERROR */}
        {authError && <div className={css.error}>{authError}</div>}

        {/* SUBMIT */}
        <input
          className={css.btn}
          type="submit"
          value={isSubmitting ? "Signing in..." : "Log in"}
          disabled={!isValid || isSubmitting}
        />
      </form>

      {/* LINKS */}
      <div className={css.linkSign}>
        <p>Forgotten your password?</p>
        <Link href="/forgot-password" className={css.link}>
          Click here to reset
        </Link>
      </div>
      {/* <p>Please enter the email address you used to sign in to the site and I will send you instructions on how to reset your password.</p> */}

      <div className={css.linkSign}>
        <p>No account?</p>
        <Link href="/register" className={css.link}>
          Register now
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
