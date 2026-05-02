// 'use client'

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React from 'react'
// import { Heart } from "lucide-react";
// import clsx from 'clsx';

// const FavoriteBtn = () => {
//   const pathname = usePathname();
//   const isActive = pathname === '/favorite';

//   return (
//     <Link
//       href="/favorite"
//       className={clsx(
//         "relative group border-b-[2px] pb-1 transition-colors",
//         isActive ? "text-nav-yellow border-nav-yellow" : "border-transparent hover:border-main-text"
//       )}
//       title="Wishlist"
//     >
//       <Heart className="w-5 h-5 transition-colors" />

//       <span
//         className="
//           absolute -top-1 -right-3 w-5 h-5 text-xs flex items-center justify-center
//           rounded-full bg-dark-green text-light-grey
//           hoverEffect transform group-hover:scale-110 group-hover:bg-green-600
//         "
//       >
//         12
//       </span>
//     </Link>
//   )
// }

// export default FavoriteBtn;

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Heart } from "lucide-react";
// import clsx from "clsx";
// import css from "./WishlistIcon.module.css";

// const WishlistIcon = () => {
//   const pathname = usePathname();
//   const isActive = pathname === "/favorite";

//   return (
//     <Link
//       href="/favorite"
//       className={clsx(css.wrapper, isActive ? css.active : css.default)}
//       title="Wishlist"
//     >
//       <Heart className={css.icon} />
//       <span className={css.badge}>12</span>
//     </Link>
//   );
// };

// export default WishlistIcon;

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useWishlistStore } from "@/store/wishlistStore";
import { getWishlistIds } from "@/app/actions/wishlist";
import css from "./WishlistIcon.module.css";

const WishlistIcon = () => {
  const pathname = usePathname();
  const { status } = useSession(); 
  
  // 1. Меняем URL на актуальный
  const isActive = pathname === "/account/wishlist"; 
  
  // 2. Достаем динамическое количество товаров из стора
  const items = useWishlistStore((state) => state.items);
  const setItems = useWishlistStore((state) => state.setItems);
  const count = items.length;

  useEffect(() => {
    if (status === "authenticated") {
      getWishlistIds().then(setItems);
    } else if (status === "unauthenticated") {
      setItems([]);
    }
  }, [status, setItems]);

  return (
    <Link
      href="/account/wishlist" // Меняем ссылку здесь
      className={clsx(css.wrapper, isActive ? css.active : css.default)}
      title="Wishlist"
    >
      <Heart className={css.icon} />
      {/* 3. Показываем бейджик, только если есть товары, и выводим реальную цифру count */}
      {count > 0 && <span className={css.badge}>{count}</span>}
    </Link>
  );
};

export default WishlistIcon;


