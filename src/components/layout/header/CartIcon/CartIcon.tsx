// в корзине показывать количество товаров, а не количество позиций для header.tsx

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ShoppingBag } from "lucide-react";
// import clsx from "clsx";

// import { useCartStore } from "@/store/cartStore";

// const CartIcon = () => {
//   const pathname = usePathname();
//   const isActive = pathname === "/cart";

//   const { items } = useCartStore();
//   const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <Link
//       href="/cart"
//       className={clsx(
//         "relative group border-b-[2px] pb-1 transition-colors",
//         isActive ? "text-nav-yellow border-nav-yellow" : "border-transparent hover:border-main-text"
//       )}
//       title="Cart"
//     >
//       <ShoppingBag className="w-5 h-5 transition-colors" />

//       <span
//         className="absolute -top-1 -right-3 w-5 h-5 text-xs flex items-center justify-center
//                   rounded-full bg-dark-green text-light-grey
//                   hoverEffect transform group-hover:scale-110 group-hover:bg-green-600"
//       >
//         {totalCount}
//       </span>
//     </Link>
//   );
// };

// export default CartIcon;


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import clsx from "clsx";
import { useCartStore } from "@/store/cartStore";
import css from "./CartIcon.module.css";

const CartIcon = () => {
  const pathname = usePathname();
  const isActive = pathname === "/cart";

  const totalCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <Link
      href="/cart"
      className={clsx(css.wrapper, isActive && css.active)}
      title="Cart"
    >
      <ShoppingBag className={css.icon} />
      {totalCount > 0 && <span className={css.badge}>{totalCount}</span>}
    </Link>
  );
};

export default CartIcon;

