// "use client";

// import { SessionProvider } from "next-auth/react";

// export const Providers = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   return <SessionProvider>{children}</SessionProvider>;
// };


// src/components/auth/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import CartSync from "../cart/CartSync";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CartSync /> {/* 👈 Ставим сюда */}
      {/* Если у вас тут были другие провайдеры (например Redux/Theme), оставляйте их внутри */}
      {children}
    </SessionProvider>
  );
};