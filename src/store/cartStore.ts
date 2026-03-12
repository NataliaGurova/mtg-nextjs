// import { create } from "zustand";

// export type CartItem = {
//   id: string;
//   name: string;
//   image: string;
//   quantity: number;
// };

// type CartStore = {
//   items: CartItem[];
//   isOpen: boolean;
//   lastAdded: CartItem | null;

//   addToCart: (item: CartItem) => void;
//   closeModal: () => void;
//   removeFromCart: (id: string) => void;
// };

// export const useCartStore = create<CartStore>((set, get) => ({
//   items: [],
//   isOpen: false,
//   lastAdded: null,

//   addToCart: (item) => {
//     const items = [...get().items];
//     const existing = items.find((i) => i.id === item.id);

//     if (existing) {
//       existing.quantity += 1;
//     } else {
//       items.push(item);
//     }

//     set({
//       items,
//       isOpen: true,
//       lastAdded: item,
//     });
//   },

//   closeModal: () => set({ isOpen: false }),

//   removeFromCart: (id) =>
//     set((state) => ({
//       items: state.items.filter((i) => i.id !== id),
//     })),
// }));


import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  lastAdded: CartItem | null;

  addToCart: (item: CartItem) => void;
  closeModal: () => void;
  removeFromCart: (id: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAdded: null,

      addToCart: (item) => {
        const items = [...get().items];

        const existing = items.find((i) => i.id === item.id);

        if (existing) {
          existing.quantity += item.quantity;
        } else {
          items.push(item);
        }

        set({
          items,
          isOpen: true,
          lastAdded: item,
        });
      },

      closeModal: () => set({ isOpen: false }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
    }),

    {
      name: "mtg-cart-storage", // ключ в localStorage
    }
  )
);