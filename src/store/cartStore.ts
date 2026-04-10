
//store/cartStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, DbPopulatedCartItem } from "@/types/cart";
import { useAuthModalStore } from "./authModalStore";
import { reserveCard, removeReservation } from "@/app/actions/cart";
import { CART_RESERVATION_MS } from "@/lib/constants/constants";

interface CartStore {
  // Базовые состояния
  items: CartItem[];
  isOpen: boolean;
  lastAdded: CartItem | null;
  expireAt: number | null;
  
  // UI методы
  setCartOpen: (open: boolean) => void;
  closeCart: () => void;
  isExpired: () => boolean;
  
  // Методы управления товарами
  addToCart: (item: CartItem) => Promise<boolean>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  
  // 🔹 Методы синхронизации с Базой Данных
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
      
      // Проверка истечения таймера резерва
      isExpired: () => {
        const { expireAt } = get();
        return expireAt !== null && Date.now() > expireAt;
      },

      setCartOpen: (open) => set({ isOpen: open }),
      closeCart: () => set({ isOpen: false }),
      
      // 🔹 1. ЗАГРУЗКА ИЗ БД (вызывается при логине через CartSync)
      fetchFromServer: async () => {
        try {
          const res = await fetch("/api/cart");
          
          // Если пользователь не авторизован, сервер вернет 401. 
          // В этом случае просто выходим, оставляя корзину пустой или из LocalStorage.
          if (!res.ok) return;
      
          const data = await res.json();
          
          if (data.items && Array.isArray(data.items)) {
            const mappedItems: CartItem[] = data.items
              .map((dbItem: DbPopulatedCartItem) => {
                const card = dbItem.cardId;
                
                // Проверка на случай, если карта была удалена из базы, 
                // но ссылка в корзине осталась
                if (!card) return null;
      
                // Логика извлечения картинки:
                // У твоих карт (даже обычных) данные лежат в массиве faces.
                const imageUrl = 
                  card.faces?.[0]?.images?.normal || 
                  card.faces?.[0]?.images?.small || 
                  // card.images?.normal || 
                  "";
      
                return {
                  id: card._id,
                  scryfallId: card.scryfall_id,
                  name: card.name,
                  set_name: card.set_name,
                  image: imageUrl,
                  price: card.prices || 0,
                  quantity: dbItem.quantity,    // Кол-во, которое выбрал юзер
                  stock: card.quantity || 0,    // Остаток на складе из модели Card
                  condition: card.condition || "NM",
                  language: card.lang || "en",
                  foil: card.foilType === "nonfoil" ? null : card.foilType,
                };
              })
              // Явно указываем типы для фильтра, чтобы убрать ошибку 'item' implicitly has an 'any' type
              .filter((item: CartItem | null): item is CartItem => item !== null);
      
            set({ items: mappedItems });
          }
        } catch (error) {
          console.error("Критическая ошибка при синхронизации корзины с БД:", error);
        }
      },
      
      // 🔹 2. СОХРАНЕНИЕ В БД (вызывается после каждого изменения)
      syncWithServer: async () => {
        try {
          const itemsToSync = get().items.map((i) => ({
            cardId: i.id,
            quantity: i.quantity,
          }));
          
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: itemsToSync }),
          });
        } catch (error) {
          console.error("Ошибка синхронизации корзины:", error);
        }
      },
      
      // 🔹 3. ДОБАВЛЕНИЕ ТОВАРА
      addToCart: async (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        
        // Проверка лимитов (stock)
        if (existing && existing.quantity >= item.stock) return false;
        
        const qtyToAdd = existing
        ? Math.min(existing.quantity + item.quantity, item.stock)
        : Math.min(item.quantity, item.stock);
        
        // Пытаемся зарезервировать на сервере
        const result = await reserveCard(item.id, item.quantity);
        
        // Если сервер запретил (например, не авторизован)
        if (!result.success) {
          if (
            result.error?.includes("войдите") || 
            result.error?.includes("авторизован")
          ) {
            useAuthModalStore.getState().open(); // Показываем модалку логина
          } else {
            console.error("Ошибка резервации:", result.error);
          }
          return false; // Блокируем добавление
        }

        const newItem = { ...item, quantity: qtyToAdd };
        const itemsWithout = get().items.filter((i) => i.id !== item.id);
        
        // Обновляем UI
        set({
          items: [newItem, ...itemsWithout],
          lastAdded: newItem,
          isOpen: true,
          expireAt: get().expireAt ?? Date.now() + CART_RESERVATION_MS,
        });
        
        // Тихо отправляем новый массив в базу
        get().syncWithServer();
        
        return true;
      },
      
      // 🔹 4. УДАЛЕНИЕ ТОВАРА
      removeFromCart: async (id: string) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;
        
        // Оптимистично убираем из UI
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
        if (get().items.length === 0) set({ expireAt: null });
        
        // Снимаем резерв
        const result = await removeReservation(id);
        if (!result.success) {
          console.error("Ошибка при удалении резерва:", result.error);
        }

        // Обновляем базу
        get().syncWithServer();
      },
      
      // 🔹 5. ИЗМЕНЕНИЕ КОЛИЧЕСТВА
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
    
    // 🔹 6. ОЧИСТКА КОРЗИНЫ (при ручном удалении всех товаров юзером)
    clearCart: () => {
      set({ items: [], expireAt: null });
      get().syncWithServer();
    },
  }),
  
  // Настройки persist (сохранение в LocalStorage для скорости)
  { 
    name: "mtg-cart-storage",
    // Опционально: можно не сохранять isOpen и lastAdded в кэш
    partialize: (state) => ({ 
      items: state.items, 
        expireAt: state.expireAt 
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