// src/types/cart.ts

export type CartItem = {
  id: string;
  scryfallId: string;
  name: string;
  set_name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  language: string;
  foil: string | null;
  condition?: string; 
  type?: string;
  availableQty?: number;
};

export interface DbPopulatedCartItem {
  quantity: number;
  cardId: {
    _id: string;
    scryfall_id: string;
    name: string;
    set_name: string;
    prices: number;
    quantity: number;
    lang: string;
    condition: string;
    foilType: string;
    faces: Array<{
      images?: {
        normal?: string;
        small?: string;
      };
    }>;
  };
}