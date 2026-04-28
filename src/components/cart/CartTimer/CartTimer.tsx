// // components/CartTimer.tsx
// "use client"
// import { useEffect, useState } from "react"
// import { useCartStore } from "@/store/cartStore"
// import { toast } from "sonner"

// export function CartTimer() {
//   const { expireAt, items, clearCart } = useCartStore()
//   const [remaining, setRemaining] = useState("")

//   useEffect(() => {
//     if (!expireAt || items.length === 0) { setRemaining(""); return }

//     const tick = () => {
//       const diff = expireAt - Date.now()
//       if (diff <= 0) {
//         clearCart()
//         setRemaining("")
//         toast.warning("Время резервации истекло. Корзина очищена.")
//         return
//       }
//       const h = Math.floor(diff / 3600000)
//       const m = Math.floor((diff % 3600000) / 60000)
//       const s = Math.floor((diff % 60000) / 1000)
//       setRemaining(`${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`)
//     }

//     tick()
//     const id = setInterval(tick, 1000)
//     return () => clearInterval(id)
//   }, [expireAt, items.length])

//   if (!remaining) return null

//   return (
//     <span className="text-xs font-medium text-amber-500">
//       🕐 {remaining}
//     </span>
//   )
// }

// components/cart/CartTimer/CartTimer.tsx
"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

export const CartTimer = () => {
  const expireAt = useCartStore((state) => state.expireAt);
  const clearCart = useCartStore((state) => state.clearCart);
  const isExpired = useCartStore((state) => state.isExpired);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    // Если корзина пуста или нет таймера — ничего не делаем
    if (!expireAt || items.length === 0) return;

    // 1. Проверяем сразу при загрузке страницы: если время уже вышло — чистим
    if (isExpired()) {
      clearCart();
      toast.info("Час резерву закінчився, ваш кошик був очищений.");
      return;
    }

    // 2. Если время еще есть, ставим таймер (setTimeout), 
    // который сработает ровно в момент expireAt
    const timeLeft = expireAt - Date.now();

    const timer = setTimeout(() => {
      clearCart();
      toast.info("Час резерву закінчився, ваш кошик був очищений.");
    }, timeLeft);

    // Очищаем таймер при размонтировании компонента
    return () => clearTimeout(timer);
  }, [expireAt, clearCart, isExpired, items.length]);

  // Этот компонент работает в фоне и ничего не рисует на экране
  return null; 
};