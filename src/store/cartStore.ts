// src/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, DbPopulatedCartItem } from "@/types/cart";
import { useAuthModalStore } from "./authModalStore";
import { reserveCard, removeReservation } from "@/app/actions/cart";
import { CART_RESERVATION_MS } from "@/lib/constants/constants";
import setsData from "@/lib/constants/setsData.json";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  lastAdded: CartItem | null;
  expireAt: number | null;

  setCartOpen: (open: boolean) => void;
  closeCart: () => void;
  isExpired: () => boolean;

  addToCart: (item: CartItem) => Promise<boolean>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;

  syncWithServer: () => Promise<void>;
  fetchFromServer: () => Promise<void>;
}

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

      // ─── 1. ЗАВАНТАЖЕННЯ З БД ──────────────────────────────────────────
      fetchFromServer: async () => {
        try {
          const res = await fetch("/api/cart");
          if (!res.ok) return;

          const data = await res.json();
          if (!data.items || !Array.isArray(data.items)) return;

          const mappedItems: CartItem[] = data.items
            .map((serverItem: {
              type: "card" | "fullset";
              cardId?: DbPopulatedCartItem["cardId"];
              fullsetCode?: string;
              quantity: number;
            }) => {
              // 🔹 Фулсет — збагачуємо даними з JSON каталогу
              if (serverItem.type === "fullset" && serverItem.fullsetCode) {
                const code = serverItem.fullsetCode.toLowerCase();
                const setInfo = setsData.find(
                  (s) => s.set.toLowerCase() === code
                );

                return {
                  id: `fullset_${code}`,
                  scryfallId: "",
                  name: setInfo?.set_name ?? code.toUpperCase(),
                  set_name: setInfo?.set_name ?? code.toUpperCase(),
                  image: setInfo?.imageUrl || "/mtg/Chest_tr.png",
                  price: setInfo?.prices ?? 0,
                  quantity: serverItem.quantity,
                  stock: 1,
                  condition: "NM",
                  language: setInfo?.lang ?? "en",
                  foil: setInfo?.isFoil ? "foil" : null,
                  type: "fullset",
                } satisfies CartItem;
              }

              // Звичайна карта
              const card = serverItem.cardId;
              if (!card) return null;

              const imageUrl =
                card.faces?.[0]?.images?.normal ||
                card.faces?.[0]?.images?.small ||
                "";

              return {
                id: card._id,
                scryfallId: card.scryfall_id,
                name: card.name,
                set_name: card.set_name,
                image: imageUrl,
                price: card.prices || 0,
                quantity: serverItem.quantity,
                stock: card.quantity || 0,
                condition: card.condition || "NM",
                language: card.lang || "en",
                foil: card.foilType === "nonfoil" ? null : card.foilType,
              } satisfies CartItem;
            })
            .filter((item: CartItem | null): item is CartItem => item !== null);

          set({ items: mappedItems });
        } catch (error) {
          console.error("Помилка синхронізації корзини:", error);
        }
      },

      // ─── 2. ЗБЕРЕЖЕННЯ В БД ────────────────────────────────────────────
      syncWithServer: async () => {
        try {
          // 🔹 Розділяємо items на карти і фулсети для правильного маппінгу
          const itemsToSync = get().items.map((i) => {
            if (i.type === "fullset") {
              // "fullset_ala" → fullsetCode: "ala"
              const fullsetCode = i.id.replace(/^fullset_/, "");
              return { fullsetCode, quantity: i.quantity };
            }
            return { cardId: i.id, quantity: i.quantity };
          });

          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: itemsToSync }),
          });
        } catch (error) {
          console.error("Помилка збереження корзини:", error);
        }
      },

      // ─── 3. ДОДАВАННЯ ТОВАРУ ───────────────────────────────────────────
      addToCart: async (item) => {
        const existing = get().items.find((i) => i.id === item.id);

        if (existing && existing.quantity >= item.stock) return false;

        const qtyToAdd = existing
          ? Math.min(existing.quantity + item.quantity, item.stock)
          : Math.min(item.quantity, item.stock);

        // 🔹 Фулсети не резервуємо — немає MongoDB _id, резерв не потрібен
        if (item.type !== "fullset") {
          const result = await reserveCard(item.id, item.quantity);

          if (!result.success) {
            if (
              result.error?.includes("войдите") ||
              result.error?.includes("авторизован")
            ) {
              useAuthModalStore.getState().open();
            } else {
              console.error("Помилка резервації:", result.error);
            }
            return false;
          }
        }

        const newItem = { ...item, quantity: qtyToAdd };
        const itemsWithout = get().items.filter((i) => i.id !== item.id);

        set({
          items: [newItem, ...itemsWithout],
          lastAdded: newItem,
          isOpen: true,
          expireAt: get().expireAt ?? Date.now() + CART_RESERVATION_MS,
        });

        get().syncWithServer();

        return true;
      },

      // ─── 4. ВИДАЛЕННЯ ТОВАРУ ───────────────────────────────────────────
      removeFromCart: async (id: string) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;

        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
        if (get().items.length === 0) set({ expireAt: null });

        // 🔹 Фулсети не знімають резерв — його не було
        if (item.type !== "fullset") {
          const result = await removeReservation(id);
          if (!result.success) {
            console.error("Помилка при знятті резерву:", result.error);
          }
        }

        get().syncWithServer();
      },

      // ─── 5. ЗМІНА КІЛЬКОСТІ ────────────────────────────────────────────
      updateQuantity: (item, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
              : i
          ),
        }));

        get().syncWithServer();
      },

      // ─── 6. ОЧИСТКА КОРЗИНИ ────────────────────────────────────────────
      clearCart: () => {
        set({ items: [], expireAt: null });
        get().syncWithServer();
      },
    }),

    {
      name: "mtg-cart-storage",
      partialize: (state) => ({
        items: state.items,
        expireAt: state.expireAt,
      }),
    }
  )
);


// store/cartStore.ts

// import { CartItem } from "@/types/cart";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { useAuthModalStore } from "./authModalStore";
// // 🔹 Импортируем наши Server Actions вместо axios
// import { reserveCard, removeReservation } from "@/app/actions/cart";

// import { CART_RESERVATION_MS } from "@/lib/constants/constants";

// type CartStore = {
//   items: CartItem[];
//   isOpen: boolean;
//   lastAdded: CartItem | null;
//   expireAt: number | null;

//   setCartOpen: (open: boolean) => void;
//   closeCart: () => void;
//   addToCart: (item: CartItem) => Promise<boolean | void>;
//   // addToCart: (item: CartItem, onAuthRequired?: () => void) => Promise<void>;
//   removeFromCart: (id: string) => Promise<void>;
//   updateQuantity: (item: CartItem, quantity: number) => void;
//   clearCart: () => void;
//   isExpired: () => boolean;
// };

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       isOpen: false,
//       lastAdded: null,
//       expireAt: null,

//       isExpired: () => {
//         const { expireAt } = get();
//         return expireAt !== null && Date.now() > expireAt;
//       },

//       setCartOpen: (open) => set({ isOpen: open }),
//       closeCart: () => set({ isOpen: false }),

//       addToCart: async (item) => {
//         const existing = get().items.find((i) => i.id === item.id);
//         if (existing && existing.quantity >= item.stock) return false;

//         const qtyToAdd = existing
//           ? Math.min(existing.quantity + item.quantity, item.stock)
//           : Math.min(item.quantity, item.stock);

//         const newItem = { ...item, quantity: qtyToAdd };
//         const itemsWithout = get().items.filter((i) => i.id !== item.id);

//         // 🔹 1. Делаем запрос в БД через Server Action только здесь!
//         const result = await reserveCard(item.id, item.quantity);

//         if (!result.success) {
//           if (
//             result.error?.includes("войдите") ||
//             result.error?.includes("авторизован")
//           ) {
//             useAuthModalStore.getState().open();
//           } else {
//             console.error("Ошибка резервации:", result.error);
//           }
//           return false; // ❌ Возвращаем false при ошибке
//         }

//         // 🔹 2. Обновляем Zustand (UI)
//         set({
//           items: [newItem, ...itemsWithout],
//           lastAdded: newItem,
//           isOpen: true,
//           // 🔹 Используем общую константу здесь
//           expireAt: get().expireAt ?? Date.now() + CART_RESERVATION_MS,
//           // expireAt: get().expireAt ?? Date.now() + 60 * 60 * 1000,
//         });
        
//         return true; // ✅ Возвращаем true, если всё успешно
//       },


//       removeFromCart: async (id: string) => {
//         const item = get().items.find((i) => i.id === id);
//         if (!item) return;

//         // 🔹 1. Оптимистичное обновление UI (сразу прячем товар из корзины)
//         set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
//         if (get().items.length === 0) set({ expireAt: null });

//         // 🔹 2. Снимаем резерв в базе данных через Server Action
//         const result = await removeReservation(id);
        
//         if (!result.success) {
//           console.error("Ошибка при удалении резерва:", result.error);
//         }
//       },

//       updateQuantity: (item, quantity) => {
//         // Локальное обновление количества
//         set((state) => ({
//           items: state.items.map((i) =>
//             i.id === item.id
//               ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
//               : i
//           ),
//         }));
//       },

//       clearCart: () => set({ items: [], expireAt: null }),
//     }),
//     { name: "mtg-cart-storage" }
//   )
// );