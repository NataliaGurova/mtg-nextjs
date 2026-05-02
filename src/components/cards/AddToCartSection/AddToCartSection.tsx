
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
// };

// const AddToCartSection = ({ card, disabled }: Props) => {
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
  
  
//   // 🔹 2. Выносим вашу логику добавления в отдельную функцию
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
  
//   // 🔹 3. Обновляем handleAdd, чтобы он сначала проверял localStorage
//   const handleAdd = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (isCompletelyOutOfStock) return;
    
//     // Проверяем, стоит ли галочка "Больше не показывать"
//     // Используем window, чтобы избежать ошибок SSR в Next.js
//     const isHidden = typeof window !== "undefined" ? localStorage.getItem("hideReservationInfo") : null;
    
//     if (!isHidden) {
//       // Если галочки нет — открываем окно и ПРЕРЫВАЕМ процесс
//       setIsModalOpen(true);
//       return;
//     }
    
//     // Если галочка стоит — сразу запускаем вашу логику
//     processAddToCart();
//   };
  
  
  
//   return (
//     <div className={css.container}>
      
//       {!isCompletelyOutOfStock && (
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

//       {/* Передаем стили в компонент Button. margin-left: auto всё выровняет! */}
//       <Button
//         variant="more"
//         onClick={handleAdd}
//         disabled={isCompletelyOutOfStock || isReserving}
//         className={css.submitBtn}
//         >
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


//       {/* <>
//     <div className={css.container}>
//     <Button onClick={handleAdd}>Add to Cart</Button>
//     </div> */}

//     <ReservationInfoModal
//       isOpen={isModalOpen}
//       onClose={() => {
//         setIsModalOpen(false);
//         processAddToCart(); // Добавляем в корзину ПОСЛЕ закрытия модалки
//       }}
//       />
//   {/* </> */}

      
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
import { ReservationInfoModal } from "@/components/cart/ReservationInfoModal/ReservationInfoModal";

type Props = {
  card: DbCard;
  stock?: number; 
  disabled?: boolean;
  // 🔹 НОВЫЕ ПРОПСЫ ДЛЯ УНИВЕРСАЛЬНОСТИ
  showQuantity?: boolean; 
  buttonVariant?: "more" | "loadMore" | "default" | "outline"; // Добавьте сюда ваши варианты кнопок
  buttonClassName?: string;
};

const AddToCartSection = ({ 
  card, 
  disabled, 
  showQuantity = true, // По умолчанию счетчик показывается
  buttonVariant = "more", 
  buttonClassName 
}: Props) => {
  const [isReserving, setIsReserving] = useState(false);
  const [qty, setQty] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
  
  const processAddToCart = async () => {
    setIsReserving(true); 
    
    try {
      const isSuccess = await addToCart({
        id: card._id.toString(),
        scryfallId: card.scryfall_id,
        name: card.name,
        set_name: card.set_name,
        image: card.faces?.[0]?.images?.normal || "", 
        price: card.prices,
        // Если счетчик скрыт, qty всегда будет равно 1, что нам и нужно!
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
  
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCompletelyOutOfStock) return;
    
    const isHidden = typeof window !== "undefined" ? localStorage.getItem("hideReservationInfo") : null;
    
    if (!isHidden) {
      setIsModalOpen(true);
      return;
    }
    
    processAddToCart();
  };
  
  return (
    // Если мы скрываем счетчик, нам не нужен flex-контейнер с отступами, 
    // кнопка просто займет свое место
    <div className={showQuantity ? css.container : "w-full flex justify-center"}>
      
      {/* 🔹 Рендерим счетчик ТОЛЬКО если showQuantity === true */}
      {showQuantity && !isCompletelyOutOfStock && (
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

      {/* 🔹 Подставляем кастомные классы и варианты, если они переданы */}
      <Button
        variant={buttonVariant}
        onClick={handleAdd}
        disabled={isCompletelyOutOfStock || isReserving} 
        className={buttonClassName || css.submitBtn}
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

      {/* 🔹 Наша кнопка Wishlist (абсолютно спозиционирована) */}
              {/* <WishlistButton 
                        cardId={card._id.toString()} 
                        variant="responsive" 
                      /> */}

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

  // const handleAdd = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   if (isCompletelyOutOfStock) return;

  //   setIsReserving(true); 

  //   try {
  //     const isSuccess = await addToCart({
  //       id: card._id.toString(),
  //       scryfallId: card.scryfall_id,
  //       name: card.name,
  //       set_name: card.set_name,
  //       image: card.faces?.[0]?.images?.normal || "", 
  //       price: card.prices,
  //       quantity: qty, 
  //       stock: maxAllowedInCart,
  //       condition: card.condition,
  //       language: card.lang,
  //       foil: card.foilType ?? null,
  //     });

  //     if (!isSuccess) {
  //       toast.error("Could not reserve card");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong: " + (error as Error).message);
  //   } finally {
  //     setIsReserving(false); 
  //   }
  // };
  
  