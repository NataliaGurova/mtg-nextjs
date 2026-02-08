"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import css from "./ForgotPasswordForm.module.css";

const schema = z.object({
  email: z.string().email("Invalid email"),
});

type FormData = z.infer<typeof schema>;

const ForgotPasswordForm = () => {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSent(true);
  };

  if (sent) {
    return (
      <div className={css.container}>
        <h1 className={css.title}>Check your email</h1>
        <p className={css.text}>
          If this email exists, we sent a reset link.
        </p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Forgot password</h1>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.label}>
          <input
            {...register("email")}
            placeholder="Email"
            className={css.input}
          />
        </label>

        <div className={css.error}>
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <input
          type="submit"
          value={isSubmitting ? "Sending..." : "Send reset link"}
          className={css.btn}
          disabled={!isValid || isSubmitting}
        />
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
