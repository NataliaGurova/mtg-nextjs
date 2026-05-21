// "use client";

// import { useEffect, useState, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import axios, { isAxiosError } from "axios";
// // import { Oval } from "react-loader-spinner";
// import { CheckCircle, XCircle } from "lucide-react";
// import Loader from "@/components/Loader/Loader";

// // Внутренний компонент с логикой
// function VerifyEmailLogic() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   // Возможные состояния: загрузка, успех, ошибка
//   const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     // Если кто-то просто перешел на /verify-email без токена
//     if (!token) {
//       setStatus("error");
//       setErrorMessage("Токен підтвердження не знайдено у посиланні.");
//       return;
//     }

// const verifyToken = async () => {
//   try {
//     await axios.post("/api/auth/verify-email", { token });
//     setStatus("success");
//   } catch (error: unknown) { // 👈 Используем unknown вместо any (или просто catch (error))
//     setStatus("error");
    
//     // 👈 Проверяем, является ли ошибка ошибкой Axios
//     if (isAxiosError(error)) {
//       setErrorMessage(
//         error.response?.data?.message || "Відбулася неочікувана помилка."
//       );
//     } else if (error instanceof Error) {
//       // Обработка стандартных ошибок JS
//       setErrorMessage(error.message);
//     } else {
//       // Фолбэк для неизвестных ошибок
//       setErrorMessage("Відбулася неочікувана помилка.");
//     }
//   }
// };

//     // const verifyToken = async () => {
//     //   try {
//     //     // Отправляем токен на наш API
//     //     await axios.post("/api/auth/verify-email", { token });
//     //     setStatus("success");
//     //   } catch (error: any) {
//     //     setStatus("error");
//     //     // Извлекаем сообщение об ошибке с бекенда (если оно есть)
//     //     setErrorMessage(
//     //       error.response?.data?.message || "Произошла ошибка при проверке токена."
//     //     );
//     //   }
//     // };

//     // Вызываем функцию проверки только один раз при монтировании компонента
//     verifyToken();
//   }, [token]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      
//       {/* --- СОСТОЯНИЕ: ЗАГРУЗКА --- */}
//       {status === "loading" && (
        
//           <div className="flex flex-col items-center gap-12 pt-4">
//             <Loader />
//             <p className="text-lg mt-10 font-medium text-gray-600 dark:text-gray-300">
//               Перевіряємо ваш email, почекайте...
//             </p>
//           </div>
//       )}

//       {/* --- СОСТОЯНИЕ: УСПЕХ --- */}
//       {status === "success" && (
//         <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
//           <CheckCircle className="w-20 h-20 text-green-600" />
//           <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//             Email успішно підтверджено!
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
//             Ваш аккаунт активовано. Тепер ви можете увійти в систему, використовуючи свої дані.
//           </p>
//           {/* Можно использовать ваш компонент <Button asChild>, если он импортирован, 
//               но здесь использован обычный Link со стилями, близкими к вашей кнопке "more" */}
//           <Link
//             href="/login"
//             className="flex px-6 py-2 rounded-[4px] bg-[#1d5105] text-white hover:bg-light-green hover:scale-105 transition-all shadow-md font-medium"
//           >
//             Увійти в акаунт
//           </Link>
//         </div>
//       )}

//       {/* --- СОСТОЯНИЕ: ОШИБКА --- */}
//       {status === "error" && (
//         <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
//           <XCircle className="w-16 h-16 text-red-500" />
//           <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//             Помилка підтвердження
//           </h2>
//           <p className="text-red-500 font-medium mb-4 max-w-md">
//             {errorMessage}
//           </p>
//           <Link
//             href="/login"
//             className="flex px-[20px] py-[5px] rounded-[4px] border border-[#ccc] bg-[#f0f0f0] text-[#333] hover:bg-gray-200 transition-all font-medium"
//           >
//             Повернутися до сторінки входу
//           </Link>
//         </div>
//       )}
      
//     </div>
//   );
// }

// // Главный компонент страницы
// export default function VerifyEmailPage() {
//   return (
//     <div className="container mx-auto py-12">
//       {/* Обертка Suspense обязательна в Next.js 13+ при использовании useSearchParams().
//         Она показывает fallback-UI до тех пор, пока параметры URL не будут прочитаны на клиенте.
//       */}
//       <Suspense 
//         fallback={
//           <div className="flex justify-center items-center min-h-[60vh]">
//             <Loader />
//           </div>
//         }
//       >
//         <VerifyEmailLogic />
//       </Suspense>
//     </div>
//   );
// }




// // variant B

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { toast } from "sonner";

// type Status = "idle" | "verifying" | "success" | "error" | "already_verified";

// export default function VerifyEmailPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   const [status, setStatus] = useState<Status>("idle");
//   const [errorMessage, setErrorMessage] = useState("");

//   // --- Если в URL есть токен — сразу верифицируем ---
//   useEffect(() => {
//     if (!token) return;

//     const verify = async () => {
//       setStatus("verifying");
//       try {
//         const res = await fetch(`/api/auth/verify-email?token=${token}`);
//         const data = await res.json();

//         if (res.ok) {
//           if (res.status === 200 && data.message?.includes("вже")) {
//             setStatus("already_verified");
//           } else {
//             setStatus("success");
//           }
//           toast.success(data.message);
//           setTimeout(() => router.push("/login"), 2500);
//         } else {
//           setStatus("error");
//           setErrorMessage(data.message || "Невірний або прострочений токен");
//         }
//       } catch {
//         setStatus("error");
//         setErrorMessage("Помилка з'єднання. Спробуйте ще раз.");
//       }
//     };

//     verify();
//   }, [token, router]);

//   // --- Страница «проверьте почту» (без токена в URL) ---
//   if (!token) {
//     return <CheckInboxView />;
//   }

//   // --- Страница обработки токена ---
//   return <TokenVerifyView status={status} errorMessage={errorMessage} />;
// }

// // ─────────────────────────────────────────────
// // Вид 1: «Перевірте пошту» — показывается сразу после регистрации
// // ─────────────────────────────────────────────
// function CheckInboxView() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [cooldown, setCooldown] = useState(0);

//   // Таймер cooldown
//   useEffect(() => {
//     if (cooldown <= 0) return;
//     const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
//     return () => clearTimeout(timer);
//   }, [cooldown]);

//   const handleResend = async () => {
//     if (!email) {
//       toast.error("Введіть ваш email");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/resend-verification", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success(data.message);
//         setCooldown(300); // 5 минут
//       } else if (res.status === 429) {
//         toast.error(data.error);
//         setCooldown(data.retryAfterSeconds ?? 300);
//       } else {
//         toast.error(data.error || "Помилка надсилання");
//       }
//     } catch {
//       toast.error("Помилка з'єднання");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background px-4">
//       <div className="w-full max-w-md text-center space-y-6">

//         {/* Иконка */}
//         <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
//           <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
//           </svg>
//         </div>

//         {/* Заголовок */}
//         <div className="space-y-2">
//           <h1 className="text-2xl font-semibold tracking-tight">Перевірте пошту</h1>
//           <p className="text-muted-foreground text-sm leading-relaxed">
//             Ми надіслали посилання для підтвердження на вашу email-адресу.
//             Перейдіть за посиланням у листі, щоб активувати акаунт.
//           </p>
//         </div>

//         {/* Повторная отправка */}
//         <div className="rounded-xl border bg-card p-5 space-y-3 text-left">
//           <p className="text-sm font-medium">Не отримали лист?</p>
//           <p className="text-xs text-muted-foreground">
//             Перевірте папку «Спам». Якщо листа немає — введіть email і надішліть повторно.
//           </p>
//           <input
//             type="email"
//             placeholder="your@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full rounded-[4px] border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition"
//           />
//           <button
//             onClick={handleResend}
//             disabled={loading || cooldown > 0}
//             className="w-full rounded-[4px] bg-dark-green text-primary-foreground py-2 text-sm font-medium transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading
//               ? "Надсилаємо..."
//               : cooldown > 0
//               ? `Повторити через ${cooldown}с`
//               : "Надіслати повторно"}
//           </button>
//         </div>

//         <a href="/login" className="block text-sm text-muted-foreground hover:text-foreground transition">
//           ← Повернутись до входу
//         </a>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// // Вид 2: обработка токена из URL
// // ─────────────────────────────────────────────
// function TokenVerifyView({
//   status,
//   errorMessage,
// }: {
//   status: Status;
//   errorMessage: string;
// }) {
//   const config = {
//     verifying: {
//       icon: (
//         <svg className="w-8 h-8 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
//           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
//           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//         </svg>
//       ),
//       title: "Перевіряємо токен...",
//       text: "Зачекайте, будь ласка",
//       color: "bg-primary/10",
//     },
//     success: {
//       icon: (
//         <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//           <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: "Email підтверджено!",
//       text: "Переадресовуємо на сторінку входу...",
//       color: "bg-green-500/10",
//     },
//     already_verified: {
//       icon: (
//         <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//           <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: "Email вже підтверджено",
//       text: "Переадресовуємо на сторінку входу...",
//       color: "bg-green-500/10",
//     },
//     error: {
//       icon: (
//         <svg className="w-8 h-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
//         </svg>
//       ),
//       title: "Помилка підтвердження",
//       text: errorMessage,
//       color: "bg-destructive/10",
//     },
//     idle: {
//       icon: null,
//       title: "",
//       text: "",
//       color: "",
//     },
//   };

//   const current = config[status];

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background px-4">
//       <div className="w-full max-w-sm text-center space-y-5">

//         {current.icon && (
//           <div className={`mx-auto w-16 h-16 rounded-2xl ${current.color} flex items-center justify-center`}>
//             {current.icon}
//           </div>
//         )}

//         {current.title && (
//           <div className="space-y-1">
//             <h1 className="text-xl font-semibold">{current.title}</h1>
//             <p className="text-sm text-muted-foreground">{current.text}</p>
//           </div>
//         )}

//         {status === "error" && (
//           <div className="space-y-3 pt-2">
//             <a
//               href="/verify-email"
//               className="block w-full rounded-lg bg-primary text-primary-foreground py-2 text-sm font-medium hover:opacity-90 transition"
//             >
//               Надіслати лист повторно
//             </a>
//             <a href="/login" className="block text-sm text-muted-foreground hover:text-foreground transition">
//               ← Повернутись до входу
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// claude  variant B

"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

type Status = "idle" | "verifying" | "success" | "error" | "already_verified";

// ─────────────────────────────────────────────
// Обёртка — обязательна для useSearchParams в Next.js 15
// ─────────────────────────────────────────────
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <VerifyEmailContent />
    </Suspense>
  );
}

// ─────────────────────────────────────────────
// Fallback пока Suspense грузится
// ─────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

// ─────────────────────────────────────────────
// Основная логика — useSearchParams здесь безопасен
// ─────────────────────────────────────────────
function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      setStatus("verifying");
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          if (data.message?.includes("вже")) {
            setStatus("already_verified");
          } else {
            setStatus("success");
          }
          toast.success(data.message);
          setTimeout(() => router.push("/login"), 2500);
        } else {
          setStatus("error");
          setErrorMessage(data.message || "Невірний або прострочений токен");
        }
      } catch {
        setStatus("error");
        setErrorMessage("Помилка з'єднання. Спробуйте ще раз.");
      }
    };

    verify();
  }, [token, router]);

  if (!token) return <CheckInboxView />;
  return <TokenVerifyView status={status} errorMessage={errorMessage} />;
}

// ─────────────────────────────────────────────
// Вид 1: «Перевірте пошту» — без токена в URL
// ─────────────────────────────────────────────
function CheckInboxView() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email) {
      toast.error("Введіть ваш email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setCooldown(300); // 5 минут
      } else if (res.status === 429) {
        toast.error(data.error);
        setCooldown(data.retryAfterSeconds ?? 300);
      } else {
        toast.error(data.error || "Помилка надсилання");
      }
    } catch {
      toast.error("Помилка з'єднання");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center space-y-6">

        <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Перевірте пошту</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Ми надіслали посилання для підтвердження на вашу email-адресу.
            Перейдіть за посиланням у листі, щоб активувати акаунт.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5 space-y-3 text-left">
          <p className="text-sm font-medium">Не отримали лист?</p>
          <p className="text-xs text-muted-foreground">
            Перевірте папку «Спам». Якщо листа немає — введіть email і надішліть повторно.
          </p>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-[4px] border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
          <button
            onClick={handleResend}
            disabled={loading || cooldown > 0}
            className="w-full rounded-[4px] bg-dark-green text-primary-foreground py-2 text-sm font-medium transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Надсилаємо..."
              : cooldown > 0
              ? `Повторити через ${cooldown}с`
              : "Надіслати повторно"}
          </button>
        </div>

        <a href="/login" className="block text-sm text-muted-foreground hover:text-foreground transition">
          ← Повернутись до входу
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Вид 2: обработка токена из URL
// ─────────────────────────────────────────────
function TokenVerifyView({ status, errorMessage }: { status: Status; errorMessage: string }) {
  const config = {
    verifying: {
      icon: (
        <svg className="w-8 h-8 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ),
      title: "Перевіряємо токен...",
      text: "Зачекайте, будь ласка",
      color: "bg-primary/10",
    },
    success: {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Email підтверджено!",
      text: "Переадресовуємо на сторінку входу...",
      color: "bg-green-500/10",
    },
    already_verified: {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Email вже підтверджено",
      text: "Переадресовуємо на сторінку входу...",
      color: "bg-green-500/10",
    },
    error: {
      icon: (
        <svg className="w-8 h-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      title: "Помилка підтвердження",
      text: errorMessage,
      color: "bg-destructive/10",
    },
    idle: {
      icon: null,
      title: "",
      text: "",
      color: "",
    },
  };

  const current = config[status];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm text-center space-y-5">

        {current.icon && (
          <div className={`mx-auto w-16 h-16 rounded-2xl ${current.color} flex items-center justify-center`}>
            {current.icon}
          </div>
        )}

        {current.title && (
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">{current.title}</h1>
            <p className="text-sm text-muted-foreground">{current.text}</p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-3 pt-2">
            <a
              href="/verify-email"
              className="block w-full rounded-lg bg-primary text-primary-foreground py-2 text-sm font-medium hover:opacity-90 transition"
            >
              Надіслати лист повторно
            </a>
            <a href="/login" className="block text-sm text-muted-foreground hover:text-foreground transition">
              ← Повернутись до входу
            </a>
          </div>
        )}
      </div>
    </div>
  );
}