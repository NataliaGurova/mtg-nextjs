
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react"; // Предполагаю, вы используете lucide-react для иконок
import { toast } from "sonner"; // Ваши красивые уведомления из layout.tsx
import css from "./RegisterForm.module.css"; // Проверьте правильность пути к вашему CSS модулю

import { registerSchema, RegisterFormData } from '@/lib/validators/registerSchema';

import { signIn } from "next-auth/react";
// // 🔹 1. Описываем схему валидации через Zod
// const registerSchema = z
//   .object({
//     firstName: z.string().min(2, "Имя должно содержать минимум 2 буквы"),
//     lastName: z.string().min(2, "Фамилия должна содержать минимум 2 буквы"),
//     email: z.string().email("Введите корректный email адрес"),
//     password: z.string().min(6, "Пароль должен быть не короче 6 символов"),
//     repeatPassword: z.string(),
//   })
//   .refine((data) => data.password === data.repeatPassword, {
//     message: "Пароль и подтверждение не совпадают",
//     path: ["repeatPassword"], // Ошибка прикрепится к полю repeatPassword
//   });

// // Вытягиваем тип из схемы
// type RegisterFormValues = z.infer<typeof registerSchema>;

// Вспомогательная функция для заглавной буквы
const capitalize = (value: string) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const RegisterForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 1. Инициализируем react-hook-form
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // Валидировать при каждом вводе
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const toggleVisibility = () => setShowPassword(!showPassword);

  // Вспомогательная функция для переключения фокуса по нажатию Enter
  const focusNext = (fieldName: keyof RegisterFormData | "submit") => 
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Запрещаем стандартную отправку формы
        if (fieldName !== "submit") {
          setFocus(fieldName as keyof RegisterFormData);
        }
      }
    };

  // 🔹 2. Функция отправки данных на сервер
  // const onSubmit = async (data: RegisterFormData) => {
  //   try {
  //     // Отправляем POST запрос на наш API
  //     const res = await fetch("/api/auth/register", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         email: data.email,
  //         password: data.password, // repeatPassword на сервер не шлем
  //       }),
  //     });

  //     const result = await res.json();

  //     if (!res.ok) {
  //       // Если сервер вернул ошибку (например, email занят), показываем тост
  //       toast.error(result.message || "Ошибка при регистрации");
  //       return;
  //     }

  //     // Если всё успешно
  //     toast.success("Аккаунт успешно создан! Теперь вы можете войти.");
      
  //     // Перенаправляем на страницу логина
  //     // router.push("/login"); 
  //     router.push("/account"); 

  //   } catch (error) {
  //     console.error("Registration error:", error);
  //     toast.error("Произошла непредвиденная ошибка");
  //   }
  // };
  const onSubmit = async (data: RegisterFormData) => {
    try {
      // 1. Сначала создаем аккаунт в базе
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password, 
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Ошибка при регистрации");
        return;
      }

      toast.success("Аккаунт создан! Выполняем вход...");

      // 2. Сразу же логиним пользователя (без перезагрузки страницы)
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Отключаем автоматический редирект NextAuth, мы сделаем его сами
      });

      if (signInResult?.error) {
        // Если по какой-то причине логин не удался, отправляем на страницу входа
        toast.error("Не удалось выполнить авто-вход");
        router.push("/login");
        return;
      }

      // 3. Если всё прошло отлично, кидаем пользователя в аккаунт!
      router.push("/account"); // 👈 Укажите здесь правильный путь к странице профиля
      router.refresh(); // Принудительно обновляем кэш Next.js, чтобы Navbar увидел, что мы залогинены

    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Произошла непредвиденная ошибка");
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Register a New account</h1>

      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        {/* FIRST NAME */}
        <label className={css.label}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="First name"
                className={css.input}
                onChange={(e) => field.onChange(capitalize(e.target.value))}
                onKeyDown={focusNext("lastName")}
              />
            )}
          />
        </label>
        <div className={css.error}>
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        {/* LAST NAME */}
        <label className={css.label}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Last name"
                className={css.input}
                onChange={(e) => field.onChange(capitalize(e.target.value))}
                onKeyDown={focusNext("email")}
              />
            )}
          />
        </label>
        <div className={css.error}>
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

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
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </label>
        <div className={css.error}>
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {/* REPEAT PASSWORD */}
        <label className={css.label}>
          <div className={css.passwordContainer}>
            <Controller
              name="repeatPassword"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Repeat Password"
                  className={css.input}
                  type={showPassword ? "text" : "password"}
                  onKeyDown={focusNext("submit")}
                />
              )}
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className={css.toggleButton}
              aria-label="Toggle Password Visibility"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
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
