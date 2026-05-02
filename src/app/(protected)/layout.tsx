
// src/app/(protected)/layout.tsx
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";

export const metadata: Metadata = {
  title: "Account | MTG Store",
  description: "Manage your MTG account, view orders, and update settings.",
};

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  console.log("SESSION:", session);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      {children}
    </>
  );
}
