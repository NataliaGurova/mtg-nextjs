
// components/AddToCartSection/AddToCartSection.tsx
      
// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Loader2, ShoppingBag, Minus, Plus } from "lucide-react";
// import { DbCard } from "@/types/types";
// import { useCartStore } from "@/store/cartStore";
// import { toast } from "sonner";

// type Props = {
//   card: DbCard;
//   stock?: number; // Сделал опциональным, т.к. теперь мы опираемся напрямую на card.quantity
//   disabled?: boolean;
// };

// const AddToCartSection = ({ card, disabled }: Props) => {
//   const [isReserving, setIsReserving] = useState(false);
//   const [qty, setQty] = useState(1);
  
//   const addToCart = useCartStore((store) => store.addToCart);
//   // 🔹 1. Достаем все товары из корзины
//   const cartItems = useCartStore((store) => store.items);

//   // 🔹 2. Ищем, сколько ТАКИХ карт уже лежит в корзине
//   const itemInCart = cartItems.find((i) => i.id === card._id.toString());
//   const inCartQty = itemInCart?.quantity || 0;

//   // // 🔹 3. Вычисляем ЖЕСТКИЙ ЛИМИТ: (Всего в базе) минус (Уже в корзине)
//   // const maxAvailableToAdd = card.quantity - inCartQty;

//   // // 🔹 4. Защита: если счетчик qty больше, чем осталось доступно, сбрасываем его
//   // useEffect(() => {
//   //   if (qty > maxAvailableToAdd && maxAvailableToAdd > 0) {
//   //     setQty(maxAvailableToAdd);
//   //   }
//   // }, [maxAvailableToAdd, qty]);

//   // // Флаг полной блокировки (если закончились в базе ИЛИ мы уже всё положили в корзину)
//   // const isCompletelyOutOfStock = disabled || maxAvailableToAdd <= 0;

//   // 🔹 3. ИСПРАВЛЕННАЯ МАТЕМАТИКА ОСТАТКОВ
//   const serverAvailable = card.availableQty ?? card.quantity;
//   const maxAllowedInCart = Math.min(card.quantity, inCartQty + serverAvailable);
//   const maxAvailableToAdd = maxAllowedInCart - inCartQty;

//   // 🔹 4. Защита: если счетчик qty больше, чем осталось доступно, сбрасываем его
//   useEffect(() => {
//     if (qty > maxAvailableToAdd && maxAvailableToAdd > 0) {
//       setQty(maxAvailableToAdd);
//     }
//   }, [maxAvailableToAdd, qty]);

//   // Флаг полной блокировки
//   const isCompletelyOutOfStock = disabled || maxAvailableToAdd <= 0;

//   const inc = () => {
//     // Теперь + не дает выбрать больше, чем реально можно добавить
//     if (qty < maxAvailableToAdd) setQty(qty + 1);
//   };

//   const dec = () => {
//     if (qty > 1) setQty(qty - 1);
//   };

//   const handleAdd = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isCompletelyOutOfStock) return;

//     setIsReserving(true);

//     try {
//       const isSuccess = await addToCart({
//         id: card._id.toString(),
//         scryfallId: card.scryfall_id,
//         name: card.name,
//         set_name: card.set_name,
//         image: card.faces?.[0]?.images?.normal || "",
//         price: card.prices,
//         quantity: qty,
//         stock: maxAllowedInCart, // 👈 ПЕРЕДАЕМ ПРАВИЛЬНЫЙ ЛИМИТ
//         condition: card.condition,
//         language: card.lang,
//         foil: card.foilType ?? null,
//       });

//       if (!isSuccess) {
//       //   toast.success(`Added ${qty} to cart & reserved!`);
//       //   setQty(1);
//       // } else {
//         toast.error("Could not reserve card");
//       }
//     } catch (error) {
//       toast.error("Something went wrong: " + (error as Error).message);
//     } finally {
//       setIsReserving(false);
//     }
//   };

//   return (
//     <div className="flex items-center gap-4">
//       {/* 🔹 Если добавить больше ничего нельзя, прячем счетчик вообще */}
//       {!isCompletelyOutOfStock && (
//         <div className="flex items-center border rounded-[4px]">
//           <button
//             type="button"
//             className="px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             onClick={dec}
//             disabled={qty <= 1}
//           >
//             <Minus size={16} />
//           </button>
          
//           <span className="px-4 w-[46px] select-none text-center">{qty}</span>
          
//           <button
//             type="button"
//             className="px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             onClick={inc}
//             // 🔹 Блокируем плюс, если достигли жесткого лимита
//             disabled={qty >= maxAvailableToAdd}
//           >
//             <Plus size={16} />
//           </button>
//         </div>
//       )}

//       <Button
//         variant="more"
//         onClick={handleAdd}
//         disabled={isCompletelyOutOfStock || isReserving}
//         className={isCompletelyOutOfStock ? "opacity-50 cursor-not-allowed w-[220px] ml-36" : "w-[220px]"}
//       >
//         {isReserving ? (
//           <Loader2 className="animate-spin" size={18} />
//         ) : isCompletelyOutOfStock ? (
//           "Out of Stock"
//         ) : (
//           <>
//             Add to Cart
//             <ShoppingBag className="ml-2" size={18} />
//           </>
//         )}
//       </Button>
//     </div>
//   );
// };

// export default AddToCartSection;


"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag, Minus, Plus } from "lucide-react"; 
import { DbCard } from "@/types/types";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import css from "./AddToCartSection.module.css";

type Props = {
  card: DbCard;
  stock?: number; 
  disabled?: boolean;
};

const AddToCartSection = ({ card, disabled }: Props) => {
  const [isReserving, setIsReserving] = useState(false);
  const [qty, setQty] = useState(1); 
  
  const addToCart = useCartStore((store) => store.addToCart);
  const cartItems = useCartStore((store) => store.items);

  const itemInCart = cartItems.find((i) => i.id === card._id.toString());
  const inCartQty = itemInCart?.quantity || 0;

  const serverAvailable = card.availableQty ?? card.quantity;
  const maxAllowedInCart = Math.min(card.quantity, inCartQty + serverAvailable);
  const maxAvailableToAdd = maxAllowedInCart - inCartQty;

  useEffect(() => {
    if (qty > maxAvailableToAdd && maxAvailableToAdd > 0) {
      setQty(maxAvailableToAdd);
    }
  }, [maxAvailableToAdd, qty]);

  const isCompletelyOutOfStock = disabled || maxAvailableToAdd <= 0;

  const inc = () => {
    if (qty < maxAvailableToAdd) setQty(qty + 1);
  };

  const dec = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCompletelyOutOfStock) return;

    setIsReserving(true); 

    try {
      const isSuccess = await addToCart({
        id: card._id.toString(),
        scryfallId: card.scryfall_id,
        name: card.name,
        set_name: card.set_name,
        image: card.faces?.[0]?.images?.normal || "", 
        price: card.prices,
        quantity: qty, 
        stock: maxAllowedInCart,
        condition: card.condition,
        language: card.lang,
        foil: card.foilType ?? null,
      });

      if (!isSuccess) {
        toast.error("Could not reserve card");
      }
    } catch (error) {
      toast.error("Something went wrong: " + (error as Error).message);
    } finally {
      setIsReserving(false); 
    }
  };

  return (
    <div className={css.container}>
      
      {!isCompletelyOutOfStock && (
        <div className={css.qtyWrapper}>
          <button 
            type="button" 
            className={css.qtyBtn} 
            onClick={dec}
            disabled={qty <= 1} 
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          
          <span className={css.qtyNumber}>{qty}</span>
          
          <button
            type="button"
            className={css.qtyBtn}
            onClick={inc}
            disabled={qty >= maxAvailableToAdd} 
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      )}

      {/* Передаем стили в компонент Button. margin-left: auto всё выровняет! */}
      <Button
        variant="more"
        onClick={handleAdd}
        disabled={isCompletelyOutOfStock || isReserving} 
        className={css.submitBtn}
      >
        {isReserving ? (
          <Loader2 className="animate-spin" size={18} />
        ) : isCompletelyOutOfStock ? (
          "Out of Stock"
        ) : (
          <>
            Add to Cart
            <ShoppingBag className="ml-2" size={18} />
          </>
        )}
      </Button>

    </div>
  );
};

export default AddToCartSection;