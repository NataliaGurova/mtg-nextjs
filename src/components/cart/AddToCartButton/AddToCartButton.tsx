"use client";

import { useState } from "react";
import { ShoppingBag, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/cart";

interface AddToCartButtonProps {
  item: CartItem;
  className?: string;
  label?: string;
}

export const AddToCartButton = ({
  item,
  className,
  label = "Додати у кошик",
}: AddToCartButtonProps) => {
  const { addToCart, items } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const isInCart = items.some((i) => i.id === item.id);
  const isOutOfStock = item.stock <= 0;

  const handleClick = async () => {
    if (loading || isOutOfStock) return;

    setLoading(true);
    const success = await addToCart(item);
    setLoading(false);

    if (success) {
      setAdded(true);
      // Через 2 секунди повертаємо початковий стан кнопки
      setTimeout(() => setAdded(false), 2000);
    }
  };

  // --- Стан: немає в наявності ---
  if (isOutOfStock) {
    return (
      <Button variant="outline" className={className} disabled>
        Немає в наявності
      </Button>
    );
  }

  // --- Стан: завантаження ---
  if (loading) {
    return (
      <Button variant="more" className={className} disabled>
        <Loader2 className="mr-2 animate-spin" size={18} />
        Резервуємо...
      </Button>
    );
  }

  // --- Стан: щойно додано ---
  if (added) {
    return (
      <Button variant="more" className={className} disabled>
        <Check className="mr-2" size={18} />
        Додано ✓
      </Button>
    );
  }

  // --- Стан: вже є в кошику (але можна ще додати) ---
  return (
    <Button variant="more" className={className} onClick={handleClick}>
      {isInCart ? (
        <>
          <ShoppingBag className="mr-2" size={18} />
          Додати ще
        </>
      ) : (
        <>
          {label}
          <ShoppingBag className="ml-2" size={18} />
        </>
      )}
    </Button>
  );
};