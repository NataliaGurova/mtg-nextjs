// src/components/account/AccountNavigation.tsx

"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./AccountNavigation.module.css"; 

// 1. Описываем, какие поля мы ожидаем получить от сессии пользователя
interface AccountUser {
  id?: string;
  email?: string | null;
  name?: string | null;
  firstName?: string;
  lastName?: string;
}

// 2. Описываем пропсы компонента
interface AccountNavigationProps {
  user: AccountUser;
}

const AccountNavigation = ({ user }: AccountNavigationProps) => {
  const pathname = usePathname();

  const TABS = [
    { name: "Profile", href: "/account/profile" },
    { name: "Wishlist", href: "/account/wishlist" },
    { name: "My Orders", href: "/account/orders" },
    { name: "Addresses", href: "/account/addresses" },
    { name: "Saved Cards", href: "/account/cards" },
  ];

  return (
    <div className={css.headerProfile}>
      <div className={css.welcomeRow}>
        <h1 className={css.title}>
          {/* Welcome to Citadel, {user.firstName || user.name || "Guest"} */}
          Вітаю у Citadel, <span className={css.userName}>{user.firstName || user.name || "Guest"}</span>
        </h1>
        <button onClick={() => signOut({ callbackUrl: "/" })} className={css.logoutBtn}>
          Logout
        </button>
      </div>

      <nav className={css.navMenu}>
        {TABS.map((tab) => {
          const isActive = pathname === tab.href;
          
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`${css.navItem} ${isActive ? css.navItemActive : ""}`}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default AccountNavigation;