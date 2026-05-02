import { create } from 'zustand';

interface WishlistStore {
  items: string[]; // Здесь будут лежать ID карточек
  setItems: (items: string[]) => void;
  toggleItem: (id: string) => void;
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  toggleItem: (id) => set((state) => {
    // Если ID уже есть - удаляем, если нет - добавляем
    const exists = state.items.includes(id);
    if (exists) {
      return { items: state.items.filter(item => item !== id) };
    } else {
      return { items: [...state.items, id] };
    }
  })
}));