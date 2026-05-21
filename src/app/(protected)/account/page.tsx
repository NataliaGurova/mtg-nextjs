// src/app/(protected)/account/page.tsx
import { redirect } from "next/navigation";

export default function AccountPage() {
  // Просто перенаправляем пользователя на первую вкладку
  redirect("/account/profile");
}

