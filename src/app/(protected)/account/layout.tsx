
// src/app/(protected)/account/layout.tsx
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { Metadata } from "next";
import FixedBackgroundHome from "@/components/home/FixedBackgroundHome";
import Container from "@/components/Container/Container";
import AccountNavigation from "@/components/account/AccountNavigation/AccountNavigation";

// 🔹 1. Метадата теперь живет прямо здесь
export const metadata: Metadata = {
  title: "Account | MTG Store",
  description: "Manage your MTG account, view orders, and update settings.",
};

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  // 🔹 2. Получаем сессию один раз (чтобы достать имя и email)
  const session = await getServerSession(authConfig);

  // Обратите внимание: никаких проверок на if (!session) redirect()!
  // За нас это уже сделал middleware.ts

  return (
    <>
      <FixedBackgroundHome />
      <main className="relative z-10 min-h-screen bg-[#eff2f8]/50">
        <Container className="py-10">
            
            {/* 🔹 3. Ставим восклицательный знак (session!), 
                говоря TypeScript: "Я клянусь, сессия тут точно есть" */}
            <AccountNavigation user={session!.user} />
            
            <div className="mt-8">
              {children}
            </div>
            
        </Container>
      </main>
    </>
  );
}