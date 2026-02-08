"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import css from "./ResetPasswordForm.module.css";

const schema = z
  .object({
    password: z.string().min(8, "Min 8 characters"),
    repeatPassword: z.string(),
  })
  .refine(data => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof schema>;

const ResetPasswordForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        password: data.password,
      }),
    });

    if (!res.ok) {
      alert("Token invalid or expired");
      return;
    }

    router.push("/login");
  };

  if (!token) {
    return <p className={css.error}>Invalid reset link</p>;
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Reset password</h1>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.label}>
          <input
            {...register("password")}
            type="password"
            placeholder="New password"
            className={css.input}
          />
        </label>
        <div className={css.error}>
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <label className={css.label}>
          <input
            {...register("repeatPassword")}
            type="password"
            placeholder="Repeat password"
            className={css.input}
          />
        </label>
        <div className={css.error}>
          {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
        </div>

        <input
          type="submit"
          value={isSubmitting ? "Saving..." : "Reset password"}
          className={css.btn}
          disabled={!isValid || isSubmitting}
        />
      </form>
    </div>
  );
};

export default ResetPasswordForm;
