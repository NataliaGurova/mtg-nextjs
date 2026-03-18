
import { CartItem } from "@/types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// export type CartItem = {
//   id: string;
//   name: string;
//   set_name: string;
//   image: string;
//   price: number;
//   quantity: number;
//   stock: number;
//   condition: string;
//   language: string;
//   foil: string | null;
// };

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  lastAdded: CartItem | null;

  setCartOpen: (open: boolean) => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;

  updateQuantity: (item: CartItem, quantity: number) => void;
};


// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       isOpen: false,
//       lastAdded: null,

//       setCartOpen: (open) => set({ isOpen: open }),
//       closeCart: () => set({ isOpen: false }),

//       addToCart: (item) => {
//         // const existing = get().items.find((i) => i.id === item.id);
//         // const itemsWithout = get().items.filter((i) => i.id !== item.id);
//         const isSameItem = (a: CartItem, b: CartItem) =>
//           a.id === b.id &&
//           a.condition === b.condition &&
//           a.language === b.language &&
//           a.foil === b.foil;
        
//         const existing = get().items.find((i) => isSameItem(i, item));
//         if (existing && existing.quantity >= item.stock) {
//           return; // ❌ больше добавить нельзя
//         }

//         const itemsWithout = get().items.filter((i) => !isSameItem(i, item));





//         const qtyToAdd = existing
//           ? Math.min(existing.quantity + item.quantity, item.stock)
//           : Math.min(item.quantity, item.stock);

//         const newItem = { ...item, quantity: qtyToAdd };

//         set({
//           items: [newItem, ...itemsWithout], // последний сверху
//           lastAdded: newItem,
//           isOpen: true,
//         });
//       },

//       removeFromCart: (id) =>
//         set((state) => ({
//           items: state.items.filter((i) => i.id !== id),
//         })),
//     }),
//     { name: "mtg-cart-storage" }
//   )
// );

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAdded: null,

      setCartOpen: (open) => set({ isOpen: open }),
      closeCart: () => set({ isOpen: false }),

      addToCart: (item) => {
        const existing = get().items.find((i) => i.id === item.id);

        if (existing && existing.quantity >= item.stock) {
          return;
        }
        
        const itemsWithout = get().items.filter((i) => i.id !== item.id);
        
        const qtyToAdd = existing
          ? Math.min(existing.quantity + item.quantity, item.stock)
          : Math.min(item.quantity, item.stock);
        
        const newItem = { ...item, quantity: qtyToAdd };
        
        set({
          items: [newItem, ...itemsWithout],
          lastAdded: newItem,
          isOpen: true,
        });
      },

      // ✅ ВОТ НОВЫЙ МЕТОД
      updateQuantity: (item, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: Math.max(1, Math.min(quantity, i.stock)),
                }
              : i
          ),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
    }),
    { name: "mtg-cart-storage" }
  )
);
