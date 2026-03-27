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