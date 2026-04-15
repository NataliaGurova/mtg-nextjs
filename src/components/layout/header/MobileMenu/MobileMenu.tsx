// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { AlignRight, X } from "lucide-react";
// import clsx from "clsx";
// import { navLinks } from "@/constants/data";
// import UserMenu from "../UserMenu/UserMenu";
// import css from "./MobileMenu.module.css";

// const MobileMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   const toggleMenu = () => setIsOpen((prev) => !prev);
//   const closeMenu = () => setIsOpen(false);

//   return (
//     <>
//       <button onClick={toggleMenu} aria-label="Toggle menu" className={css.toggleBtn}>
//         {isOpen ? <X className={css.icon} /> : <AlignRight className={css.icon} />}
//       </button>

//       <div className={clsx(css.sidebar, isOpen ? css.sidebarOpen : css.sidebarClosed)}>
//         <div className={css.userSection}>
//           <UserMenu />
//         </div>

//         <nav className={css.nav}>
//           {navLinks.map(({ href, label }) => (
//             <Link
//               href={href}
//               key={label}
//               onClick={closeMenu}
//               className={clsx(
//                 css.link,
//                 pathname === href && css.linkActive
//               )}
//             >
//               {label}
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </>
//   );
// };

// export default MobileMenu;

// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { AlignRight, X } from "lucide-react";
// import clsx from "clsx";
// import { navLinks } from "@/constants/data";
// import UserMenu from "../UserMenu/UserMenu";
// import css from "./MobileMenu.module.css";

// const MobileMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   const toggleMenu = () => setIsOpen((prev) => !prev);
//   const closeMenu = () => setIsOpen(false);

//   // 🔒 Блокировка скролла body при открытом меню
//   useEffect(() => {
//     if (isOpen) {
//       // Когда открываем — убираем скролл
//       document.body.style.overflow = "hidden";
//     } else {
//       // Когда закрываем — возвращаем
//       document.body.style.overflow = "unset";
//     }

//     // Очистка (возвращаем скролл, если компонент вдруг размонтируется)
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   return (
//     <>
//       <button onClick={toggleMenu} aria-label="Toggle menu" className={css.toggleBtn}>
//         {isOpen ? <X className={css.icon} /> : <AlignRight className={css.icon} />}
//       </button>

//       <div className={clsx(css.sidebar, isOpen ? css.sidebarOpen : css.sidebarClosed)}>
//         <div className={css.userSection}>
//           <UserMenu />
//         </div>

//         <nav className={css.nav}>
//           {navLinks.map(({ href, label }) => (
//             <Link
//               href={href}
//               key={label}
//               onClick={closeMenu}
//               className={clsx(
//                 css.link,
//                 pathname === href && css.linkActive
//               )}
//             >
//               {label}
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </>
//   );
// };

// export default MobileMenu;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignRight, X } from "lucide-react";
import clsx from "clsx";
import { navLinks } from "@/constants/data";
import UserMenu from "../UserMenu/UserMenu";
import css from "./MobileMenu.module.css";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // 👈 Следим за текущим URL

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // 🔥 1. МАГИЯ ЗАКРЫТИЯ: Если URL изменился, закрываем меню!
  // Это автоматически сработает для Login, Register, Logout и обычных ссылок.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // 🔒 2. Блокировка скролла body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button onClick={toggleMenu} aria-label="Toggle menu" className={css.toggleBtn}>
        {isOpen ? <X className={css.icon} /> : <AlignRight className={css.icon} size={26} />}
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
              // onClick здесь больше не нужен, всё сделает useEffect выше, 
              // но можно оставить для надежности
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