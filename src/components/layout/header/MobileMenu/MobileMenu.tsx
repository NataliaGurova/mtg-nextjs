"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignRight, X } from "lucide-react";
import clsx from "clsx";
import { navLinks } from "@/constants/data";
import UserMenu from "../UserMenu/UserMenu";
import css from "./MobileMenu.module.css";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button onClick={toggleMenu} aria-label="Toggle menu" className={css.toggleBtn}>
        {isOpen ? <X className={css.icon} /> : <AlignRight className={css.icon} />}
      </button>

      <div className={clsx(css.sidebar, isOpen ? css.sidebarOpen : css.sidebarClosed)}>
        <div className={css.userSection}>
          <UserMenu />
        </div>

        <nav className={css.nav}>
          {navLinks.map(({ href, label }) => (
            <Link
              href={href}
              key={label}
              onClick={closeMenu}
              className={clsx(
                css.link,
                pathname === href && css.linkActive
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;