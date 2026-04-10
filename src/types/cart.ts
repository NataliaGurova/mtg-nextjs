// src/types/cart.ts

export type CartItem = {
  id: string;
  scryfallId: string   // ← добавляем
  name: string;
  set_name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  condition: string;
  language: string;
  foil: string | null;

  availableQty?: number;
};

// Описываем структуру ответа из базы данных (после populate)
export interface DbPopulatedCartItem {
  quantity: number; // Кол-во в корзине
  cardId: {
    _id: string;
    scryfall_id: string; // В базе через подчёркивание
    name: string;
    set_name: string;
    prices: number;      // В базе 'prices'
    quantity: number;    // В базе это 'stock'
    lang: string;        // В базе 'lang'
    condition: string;
    foilType: string;    // В базе "foil" или "nonfoil"
    faces: Array<{
      images?: {
        normal?: string;
        small?: string;
      };
    }>;
  };
}