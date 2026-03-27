

// // store/cartStore.ts

// import { CartItem } from "@/types/cart"
// import { create } from "zustand"
// import { persist } from "zustand/middleware"
// import axios, { AxiosError } from "axios"
// import { useAuthModalStore } from "./authModalStore"

// type ApiError = {
//   error: string
// }

// type CartStore = {
//   items: CartItem[]
//   isOpen: boolean
//   lastAdded: CartItem | null
//   expireAt: number | null

//   setCartOpen: (open: boolean) => void
//   closeCart: () => void
//   // addToCart: (item: CartItem) => Promise<void>
//   addToCart: (item: CartItem, onAuthRequired?: () => void) => Promise<void>
//   removeFromCart: (id: string) => Promise<void>
//   // removeFromCart: (id: string, cardId: string, quantity: number) => Promise<void>
//   updateQuantity: (item: CartItem, quantity: number) => void
//   clearCart: () => void
//   isExpired: () => boolean
// }

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       isOpen: false,
//       lastAdded: null,
//       expireAt: null,

//       isExpired: () => {
//         const { expireAt } = get()
//         return expireAt !== null && Date.now() > expireAt
//       },

//       setCartOpen: (open) => set({ isOpen: open }),
//       closeCart: () => set({ isOpen: false }),

//       // store/cartStore.ts
//       addToCart: async (item) => {
//         const existing = get().items.find((i) => i.id === item.id)
//         if (existing && existing.quantity >= item.stock) return
      
//         const qtyToAdd = existing
//           ? Math.min(existing.quantity + item.quantity, item.stock)
//           : Math.min(item.quantity, item.stock)
      
//         const newItem = { ...item, quantity: qtyToAdd }
//         const itemsWithout = get().items.filter((i) => i.id !== item.id)
      
//         try {
//           const { data } = await axios.post<{ expireAt: string }>("/api/cart/reserve", {
//             cardId: item.id,
//             quantity: item.quantity,
//           })
      
//           set({
//             items: [newItem, ...itemsWithout],
//             lastAdded: newItem,
//             isOpen: true,
//             expireAt: get().expireAt ?? new Date(data.expireAt).getTime(),
//           })
//         } catch (err) {
//           const axiosErr = err as AxiosError<ApiError>
      
//           if (axiosErr.response?.status === 401) {
//             useAuthModalStore.getState().open()  // ← вызываем глобально
//             return
//           }
      
//           console.error(axiosErr.response?.data?.error ?? "Ошибка резервации")
//         }
//       },
//       removeFromCart: async (id: string) => {
//         const item = get().items.find((i) => i.id === id)
//   if (!item) return
  
//   set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
  
//   try {
//     await axios.post("/api/cart/release", {
//       cardId: item.id,
//       quantity: item.quantity,
//     })
//   } catch (err) {
//     const axiosErr = err as AxiosError<ApiError>
//     console.error(axiosErr.response?.data?.error ?? "Ошибка при удалении")
//   }
  
//   if (get().items.length === 0) set({ expireAt: null })
//   },

//       updateQuantity: (item, quantity) =>
//         set((state) => ({
//           items: state.items.map((i) =>
//             i.id === item.id
//           ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
//               : i
//           ),
//         })),

//         clearCart: () => set({ items: [], expireAt: null }),
//       }),
//     { name: "mtg-cart-storage" }
//   )
// )
// ======================================================


// addToCart: async (item, onAuthRequired) => {
//   const existing = get().items.find((i) => i.id === item.id)
//   if (existing && existing.quantity >= item.stock) return

//   const qtyToAdd = existing
//     ? Math.min(existing.quantity + item.quantity, item.stock)
//     : Math.min(item.quantity, item.stock)

//   const newItem = { ...item, quantity: qtyToAdd }
//   const itemsWithout = get().items.filter((i) => i.id !== item.id)

//   // Optimistic update
//   set({ items: [newItem, ...itemsWithout], lastAdded: newItem, isOpen: true })

//   try {
//     const { data } = await axios.post<{ expireAt: string }>("/api/cart/reserve", {
//       cardId: item.id,
//       quantity: item.quantity,
//     })
//     if (!get().expireAt) {
//       set({ expireAt: new Date(data.expireAt).getTime() })
//     }
//   } catch (err) {
//     const axiosErr = err as AxiosError<ApiError>

//     if (axiosErr.response?.status === 401) {
//       // Откатываем optimistic update
//       set({ items: itemsWithout, isOpen: false })
//       onAuthRequired?.()
//       return
//     }

//     console.error(axiosErr.response?.data?.error ?? "Ошибка резервации")
//   }
// },

// addToCart: async (item) => {
//   const existing = get().items.find((i) => i.id === item.id)
//   if (existing && existing.quantity >= item.stock) return

//   try {
//     const { data } = await axios.post<{ expireAt: string }>("/api/cart/reserve", {
//       cardId: item.id,
//       quantity: item.quantity,
//     })

//     const qtyToAdd = existing
//       ? Math.min(existing.quantity + item.quantity, item.stock)
//       : Math.min(item.quantity, item.stock)

//     const newItem = { ...item, quantity: qtyToAdd }
//     const itemsWithout = get().items.filter((i) => i.id !== item.id)

//     set({
//       items: [newItem, ...itemsWithout],
//       lastAdded: newItem,
//       isOpen: true,
//       expireAt: get().expireAt ?? new Date(data.expireAt).getTime(),
//     })
//   } catch (err) {
//     const axiosErr = err as AxiosError<ApiError>
//     const msg = axiosErr.response?.data?.error ?? "Ошибка резервации"
//     console.error(msg)
//     // toast.error(msg)
//   }
// },

// removeFromCart: async (id, cardId, quantity) => {
//   set((state) => ({ items: state.items.filter((i) => i.id !== id) }))

//   try {
//     await axios.post("/api/cart/release", { cardId, quantity })
//   } catch (err) {
//     const axiosErr = err as AxiosError<ApiError>
//     console.error(axiosErr.response?.data?.error ?? "Ошибка при удалении")
//   }

//   if (get().items.length === 0) set({ expireAt: null })
// },
// store/cartStore.ts


// store/cartStore.ts

import { CartItem } from "@/types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthModalStore } from "./authModalStore";
// 🔹 Импортируем наши Server Actions вместо axios
import { reserveCard, removeReservation } from "@/app/actions/cart";

import { CART_RESERVATION_MS } from "@/lib/constants/constants";

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  lastAdded: CartItem | null;
  expireAt: number | null;

  setCartOpen: (open: boolean) => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => Promise<boolean | void>;
  // addToCart: (item: CartItem, onAuthRequired?: () => void) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  isExpired: () => boolean;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAdded: null,
      expireAt: null,

      isExpired: () => {
        const { expireAt } = get();
        return expireAt !== null && Date.now() > expireAt;
      },

      setCartOpen: (open) => set({ isOpen: open }),
      closeCart: () => set({ isOpen: false }),

      addToCart: async (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing && existing.quantity >= item.stock) return false;

        const qtyToAdd = existing
          ? Math.min(existing.quantity + item.quantity, item.stock)
          : Math.min(item.quantity, item.stock);

        const newItem = { ...item, quantity: qtyToAdd };
        const itemsWithout = get().items.filter((i) => i.id !== item.id);

        // 🔹 1. Делаем запрос в БД через Server Action только здесь!
        const result = await reserveCard(item.id, item.quantity);

        if (!result.success) {
          if (
            result.error?.includes("войдите") || 
            result.error?.includes("авторизован")
          ) {
            useAuthModalStore.getState().open();
          } else {
            console.error("Ошибка резервации:", result.error);
          }
          return false; // ❌ Возвращаем false при ошибке
        }

        // 🔹 2. Обновляем Zustand (UI)
        set({
          items: [newItem, ...itemsWithout],
          lastAdded: newItem,
          isOpen: true,
          // 🔹 Используем общую константу здесь
          expireAt: get().expireAt ?? Date.now() + CART_RESERVATION_MS,
          // expireAt: get().expireAt ?? Date.now() + 60 * 60 * 1000, 
        });
        
        return true; // ✅ Возвращаем true, если всё успешно
      },

      // addToCart: async (item) => {
      //   const existing = get().items.find((i) => i.id === item.id);
      //   if (existing && existing.quantity >= item.stock) return;

      //   const qtyToAdd = existing
      //     ? Math.min(existing.quantity + item.quantity, item.stock)
      //     : Math.min(item.quantity, item.stock);

      //   const newItem = { ...item, quantity: qtyToAdd };
      //   const itemsWithout = get().items.filter((i) => i.id !== item.id);

      //   // 🔹 1. Делаем запрос в БД через Server Action
      //   const result = await reserveCard(item.id, item.quantity);

      //   // 🚨 ВРЕМЕННЫЙ КОНСОЛЬ ЛОГ ДЛЯ ПРОВЕРКИ 🚨
      //   console.log("ОТВЕТ СЕРВЕРА ПРИ РЕЗЕРВЕ:", result);

      //   if (!result.success) {
      //     // Если сервер сказал, что не авторизован - открываем модалку
      //     if (
      //       result.error?.includes("войдите") || 
      //       result.error?.includes("авторизован")
      //     ) {
      //       useAuthModalStore.getState().open();
      //     } else {
      //       console.error("Ошибка резервации:", result.error);
      //     }
      //     return; // Прерываем добавление в локальный стейт!
      //   }

      //   // 🔹 2. Если всё ок, обновляем Zustand (UI)
      //   set({
      //     items: [newItem, ...itemsWithout],
      //     lastAdded: newItem,
      //     isOpen: true,
      //     // Устанавливаем время протухания локально на 1 час (совпадает с БД)
      //     expireAt: get().expireAt ?? Date.now() + 60 * 60 * 1000, 
      //   });
      // },

      removeFromCart: async (id: string) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;

        // 🔹 1. Оптимистичное обновление UI (сразу прячем товар из корзины)
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
        if (get().items.length === 0) set({ expireAt: null });

        // 🔹 2. Снимаем резерв в базе данных через Server Action
        const result = await removeReservation(id);
        
        if (!result.success) {
          console.error("Ошибка при удалении резерва:", result.error);
        }
      },

      updateQuantity: (item, quantity) => {
        // Локальное обновление количества
        set((state) => ({
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [], expireAt: null }),
    }),
    { name: "mtg-cart-storage" }
  )
);