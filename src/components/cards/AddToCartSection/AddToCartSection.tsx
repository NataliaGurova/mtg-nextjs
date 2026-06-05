// src/components/cards/AddToCartSection/AddToCartSection.tsx 

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Loader2, ShoppingBag, Minus, Plus } from "lucide-react"; 
// import { DbCard } from "@/types/types";
// import { useCartStore } from "@/store/cartStore";
// import { toast } from "sonner";
// import css from "./AddToCartSection.module.css";
// import { ReservationInfoModal } from "@/components/cart/ReservationInfoModal/ReservationInfoModal";

// type Props = {
//   card: DbCard;
//   stock?: number; 
//   disabled?: boolean;
//   // 🔹 НОВЫЕ ПРОПСЫ ДЛЯ УНИВЕРСАЛЬНОСТИ
//   showQuantity?: boolean; 
//   buttonVariant?: "more" | "loadMore" | "default" | "outline"; // Добавьте сюда ваши варианты кнопок
//   buttonClassName?: string;
// };

// const AddToCartSection = ({ 
//   card, 
//   disabled, 
//   showQuantity = true, // По умолчанию счетчик показывается
//   buttonVariant = "more", 
//   buttonClassName 
// }: Props) => {
//   const [isReserving, setIsReserving] = useState(false);
//   const [qty, setQty] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   const addToCart = useCartStore((store) => store.addToCart);
//   const cartItems = useCartStore((store) => store.items);

//   const itemInCart = cartItems.find((i) => i.id === card._id.toString());
//   const inCartQty = itemInCart?.quantity || 0;

//   const serverAvailable = card.availableQty ?? card.quantity;
//   const maxAllowedInCart = Math.min(card.quantity, inCartQty + serverAvailable);
//   const maxAvailableToAdd = maxAllowedInCart - inCartQty;

//   useEffect(() => {
//     if (qty > maxAvailableToAdd && maxAvailableToAdd > 0) {
//       setQty(maxAvailableToAdd);
//     }
//   }, [maxAvailableToAdd, qty]);

//   const isCompletelyOutOfStock = disabled || maxAvailableToAdd <= 0;

//   const inc = () => {
//     if (qty < maxAvailableToAdd) setQty(qty + 1);
//   };

//   const dec = () => {
//     if (qty > 1) setQty(qty - 1);
//   };
  
//   const processAddToCart = async () => {
//     setIsReserving(true); 
    
//     try {
//       const isSuccess = await addToCart({
//         id: card._id.toString(),
//         scryfallId: card.scryfall_id,
//         name: card.name,
//         set_name: card.set_name,
//         image: card.faces?.[0]?.images?.normal || "", 
//         price: card.prices,
//         // Если счетчик скрыт, qty всегда будет равно 1, что нам и нужно!
//         quantity: qty, 
//         stock: maxAllowedInCart,
//         condition: card.condition,
//         language: card.lang,
//         foil: card.foilType ?? null,
//       });
      
//       if (!isSuccess) {
//         toast.error("Could not reserve card");
//       }
//     } catch (error) {
//       toast.error("Something went wrong: " + (error as Error).message);
//     } finally {
//       setIsReserving(false); 
//     }
//   };
  
//   const handleAdd = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (isCompletelyOutOfStock) return;
    
//     const isHidden = typeof window !== "undefined" ? localStorage.getItem("hideReservationInfo") : null;
    
//     if (!isHidden) {
//       setIsModalOpen(true);
//       return;
//     }
    
//     processAddToCart();
//   };
  
//   return (
//     // Если мы скрываем счетчик, нам не нужен flex-контейнер с отступами, 
//     // кнопка просто займет свое место
//     <div className={showQuantity ? css.container : "w-full flex justify-center"}>
      
//       {/* 🔹 Рендерим счетчик ТОЛЬКО если showQuantity === true */}
//       {showQuantity && !isCompletelyOutOfStock && (
//         <div className={css.qtyWrapper}>
//           <button 
//             type="button" 
//             className={css.qtyBtn} 
//             onClick={dec}
//             disabled={qty <= 1} 
//             aria-label="Decrease quantity"
//             >
//             <Minus size={16} />
//           </button>
          
//           <span className={css.qtyNumber}>{qty}</span>
          
//           <button
//             type="button"
//             className={css.qtyBtn}
//             onClick={inc}
//             disabled={qty >= maxAvailableToAdd} 
//             aria-label="Increase quantity"
//           >
//             <Plus size={16} />
//           </button>
//         </div>
//       )}

//       {/* 🔹 Подставляем кастомные классы и варианты, если они переданы */}
//       <Button
//         variant={buttonVariant}
//         onClick={handleAdd}
//         disabled={isCompletelyOutOfStock || isReserving} 
//         className={buttonClassName || css.submitBtn}
//       >
//         {isReserving ? (
//           <Loader2 className="animate-spin" size={18} />
//         ) : isCompletelyOutOfStock ? (
//           "Немає в наявності"
//         ) : (
//           <>
//             Додати у кошик
//             <ShoppingBag className="ml-2" size={18} />
//           </>
//         )}
//       </Button>

//       <ReservationInfoModal 
//         isOpen={isModalOpen} 
//         onClose={() => {
//           setIsModalOpen(false);
//           processAddToCart();
//         }} 
//       />
//     </div>
//   );
// };

// export default AddToCartSection;


// src/components/cards/AddToCartSection/AddToCartSection.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag, Minus, Plus, Check } from "lucide-react";

import { DbCard } from "@/types/types";
import { CartItem } from "@/types/cart";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import css from "./AddToCartSection.module.css";
import { ReservationInfoModal } from "@/components/cart/ReservationInfoModal/ReservationInfoModal";

// ─────────────────────────────────────────────
// Два режими: звичайна карта або фулсет
// ─────────────────────────────────────────────
type CardMode = {
  mode?: "card";
  card: DbCard;
  // fullset-пропси не потрібні
  fullsetItem?: never;
};

type FullsetMode = {
  mode: "fullset";
  fullsetItem: CartItem;
  // card не потрібна
  card?: never;
};

type BaseProps = {
  disabled?: boolean;
  showQuantity?: boolean;
  buttonVariant?: "more" | "loadMore" | "default" | "outline";
  buttonClassName?: string;
  // 🔹 Зовнішній розрахований залишок (наприклад, totalStock по всіх варіантах).
  //    Якщо передано — перевизначає card.quantity як верхню межу.
  stock?: number;
};

type Props = BaseProps & (CardMode | FullsetMode);

// ─────────────────────────────────────────────

const AddToCartSection = ({
  mode = "card",
  card,
  fullsetItem,
  disabled,
  showQuantity = true,
  buttonVariant = "more",
  buttonClassName,
  stock,
}: Props) => {
  const [isReserving, setIsReserving] = useState(false);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCart = useCartStore((store) => store.addToCart);
  const cartItems = useCartStore((store) => store.items);

  // ── Обчислення доступної кількості ──────────
  // Для фулсету — stock приходить напряму з fullsetItem
  const itemId = mode === "fullset"
    ? fullsetItem!.id
    : card!._id.toString();

  const itemInCart = cartItems.find((i) => i.id === itemId);
  const inCartQty = itemInCart?.quantity || 0;

  const maxAllowedInCart = mode === "fullset"
    ? fullsetItem!.stock                                          // фулсет: stock з fullsetItem
    : Math.min(
        stock ?? card!.quantity,                                  // 🔹 stock пропс або card.quantity
        inCartQty + (card!.availableQty ?? stock ?? card!.quantity)
      );

  const maxAvailableToAdd = maxAllowedInCart - inCartQty;

  useEffect(() => {
    if (qty > maxAvailableToAdd && maxAvailableToAdd > 0) {
      setQty(maxAvailableToAdd);
    }
  }, [maxAvailableToAdd, qty]);

  const isCompletelyOutOfStock = disabled || maxAvailableToAdd <= 0;

  const inc = () => { if (qty < maxAvailableToAdd) setQty(qty + 1); };
  const dec = () => { if (qty > 1) setQty(qty - 1); };

  // ── Формування CartItem для addToCart ────────
  const buildCartItem = (): CartItem => {
    if (mode === "fullset") {
      return { ...fullsetItem!, quantity: qty };
    }

    return {
      id: card!._id.toString(),
      scryfallId: card!.scryfall_id,
      name: card!.name,
      set_name: card!.set_name,
      image: card!.faces?.[0]?.images?.normal || "",
      price: card!.prices,
      quantity: qty,
      stock: maxAllowedInCart,
      condition: card!.condition,
      language: card!.lang,
      foil: card!.foilType ?? null,
    };
  };

  // ── Додавання ────────────────────────────────
  const processAddToCart = async () => {
    setIsReserving(true);

    try {
      const isSuccess = await addToCart(buildCartItem());

      if (!isSuccess) {
        toast.error("Could not reserve item");
      } else {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    } catch (error) {
      toast.error("Something went wrong: " + (error as Error).message);
    } finally {
      setIsReserving(false);
    }
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCompletelyOutOfStock) return;

    const isHidden =
      typeof window !== "undefined"
        ? localStorage.getItem("hideReservationInfo")
        : null;

    // Для фулсету модалку з інфо про резерв також показуємо
    if (!isHidden) {
      setIsModalOpen(true);
      return;
    }

    processAddToCart();
  };

  // ── Лейбл кнопки ────────────────────────────
  const buttonLabel = () => {
    if (isReserving) return <Loader2 className="animate-spin" size={18} />;
    if (isCompletelyOutOfStock) return "Немає в наявності";
    if (added) return (
      <>
        <Check className="mr-2" size={18} />
        Додано ✓
      </>
    );
    return (
      <>
        Додати у кошик
        <ShoppingBag className="ml-2" size={18} />
      </>
    );
  };

  // ── Рендер ───────────────────────────────────
  return (
    <div className={showQuantity ? css.container : "w-full flex justify-center"}>

      {/* Лічильник — тільки для карт або якщо явно увімкнено для фулсету */}
      {showQuantity && !isCompletelyOutOfStock && mode === "card" && (
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

      <Button
        variant={buttonVariant}
        onClick={handleAdd}
        disabled={isCompletelyOutOfStock || isReserving || added}
        className={buttonClassName || css.submitBtn}
      >
        {buttonLabel()}
      </Button>

      <ReservationInfoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          processAddToCart();
        }}
      />
    </div>
  );
};

export default AddToCartSection;