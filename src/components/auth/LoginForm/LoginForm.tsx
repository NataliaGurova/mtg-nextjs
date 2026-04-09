// 'use client';

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff } from "lucide-react";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// // import clsx from "clsx";

// import css from "./LoginForm.module.css";
// import { LoginFormData, loginSchema } from "@/lib/validators/loginSchema";
// import { useRouter } from "next/navigation";
// import focusNext from "@/lib/helpers/focusNext";


// const LoginForm = () => {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [authError, setAuthError] = useState("");


//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid, isSubmitting },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//     mode: "onChange",       // 👈 ВАЖНО
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     setAuthError("");

//     const res = await signIn("credentials", {
//       email: data.email,
//       password: data.password,
//       redirect: false,
//     });

//     if (res?.error) {
//       setAuthError("Invalid email or password");
//       return;
//     }

//     // reset();
//     router.push("/account");
//   };

//   return (
//     <div className={css.container}>
//       <h1 className={css.title}>Sign in</h1>

//       <form
//         className={css.form}
//         onSubmit={handleSubmit(onSubmit)}
//         autoComplete="off"
//       >
//         {/* EMAIL */}
//         <label className={css.label}>
//           <input
//             {...register("email")}
//             placeholder="Email"
//             className={css.input}
//             onKeyDown={focusNext("password")}
//           />
//         </label>
//         <div className={css.error}>
//           {errors.email && <p>{errors.email.message}</p>}
//         </div>

//         {/* PASSWORD */}
//         <label className={css.label}>
//           <div className={css.passwordContainer}>
//             <input
//               {...register("password")}
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className={css.input}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(v => !v)}
//               className={css.toggleButton}
//               aria-label="Toggle password visibility"
//             >
//               {showPassword ? <Eye size={18}/> : <EyeOff size={18} />}
//             </button>
//           </div>
//         </label>

//         <div className={css.error}>
//           {errors.password && (
//             <p>{errors.password.message}</p>
//           )}
//         </div>

//         {/* AUTH ERROR */}
//         {authError && <div className={css.error}>{authError}</div>}

//         {/* SUBMIT */}
//         <input
//           className={css.btn}
//           type="submit"
//           value={isSubmitting ? "Signing in..." : "Log in"}
//           disabled={!isValid || isSubmitting}
//         />
//       </form>

//       {/* LINKS */}
//       <div className={css.linkSign}>
//         <p>Forgotten your password?</p>
//         <Link href="/forgot-password" className={css.link}>
//           Click here to reset
//         </Link>
//       </div>
//       {/* <p>Please enter the email address you used to sign in to the site and I will send you instructions on how to reset your password.</p> */}

//       <div className={css.linkSign}>
//         <p>No account?</p>
//         <Link href="/register" className={css.link}>
//           Register now
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "@/lib/validators/loginSchema";
import css from "./LoginForm.module.css"; // Можем смело использовать те же стили!

const LoginForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleVisibility = () => setShowPassword(!showPassword);

  const focusNext = (fieldName: keyof LoginFormData | "submit") => 
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (fieldName !== "submit") {
          setFocus(fieldName as keyof LoginFormData);
        }
      }
    };

  // 🔹 Главная функция логина
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Вызываем NextAuth signIn
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Отключаем автоматический редирект, чтобы показать ошибку в toast
      });

      if (res?.error) {
        // Если пароль неверный или юзера нет, NextAuth вернет ошибку (мы настроили это в auth.ts)
        toast.error("Неверный email или пароль");
        return;
      }

      // Если всё успешно
      toast.success("С возвращением!");
      router.push("/account");
      router.refresh(); // Обновляем шапку, чтобы появилась иконка профиля

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Произошла ошибка при входе");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Welcome Back</h1>

      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        {/* EMAIL */}
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
                disabled={isLoading}
              />
            )}
          />
        </label>
        <div className={css.error}>
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* PASSWORD */}
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
                  type={showPassword ? "text" : "password"}
                  onKeyDown={focusNext("submit")}
                  disabled={isLoading}
                />
              )}
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className={css.toggleButton}
              aria-label="Toggle Password Visibility"
              disabled={isLoading}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </label>
        <div className={css.error}>
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {/* Забыли пароль? (Заглушка на будущее) */}
        <div className="flex justify-end mb-4">
          <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Forgot password?
          </Link>
        </div>

        <input
          className={css.btn}
          type="submit"
          value={isLoading ? "Signing in..." : "Login"}
          disabled={!isValid || isLoading}
        />
      </form>

      <div className={css.linkSign}>
        <p>Dont have an account?</p>
        <Link
          href="/register"
          className={clsx(css.link, pathname === "/register" && css.active)}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
