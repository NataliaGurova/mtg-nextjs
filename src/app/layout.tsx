// import { Inter } from "next/font/google";
// import { Cinzel } from "next/font/google";


// export const cinzel = Cinzel({
//   subsets: ["latin"],
//   weight: ["500", "600", "700"],
// });

// export const inter = Inter({ subsets: ['latin'], weight: ["400", "700"] })
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { Suspense } from "react";

import { Providers } from "@/components/auth/Providers";
import { Toaster } from "sonner";
import { AuthRequiredModal } from "@/components/auth/AuthRequiredModal/AuthRequiredModal";
import { CartTimer } from "@/components/cart/CartTimer/CartTimer";



// 2. Настраиваем шрифт
const montserrat = Montserrat({ 
  subsets: ["latin", "cyrillic"], // cyrillic нужен, если у вас есть русский/украинский текст
  display: "swap",
  variable: "--font-montserrat", // Создаем CSS-переменную для Tailwind
  weight: ["400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: {
    default: "Citadel | MTG shop",
    template: "%s | MTG",
    absolute: "",
  },
  description: "Store for Magic: The Gathering cards. Buy cards with ease.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 🔹 1. Вернули flex-классы для футера */}
      <body className={`${montserrat.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Providers>
          <Suspense fallback={null}>
            <Header />
          </Suspense>

          {/* 🔹 2. Main теперь чистый, только для контента */}
          <main className="flex-1 bg-light-grey">
            {children}
          </main>

          {/* 🔹 3. Все глобальные/невидимые штуки лежат отдельно */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            expand={false}
          />
          <CartTimer />
          <AuthRequiredModal />

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
