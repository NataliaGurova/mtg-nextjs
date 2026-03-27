
// "use client";

// import { useState } from "react";
// import { ShoppingBag, Minus, Plus } from "lucide-react";

// import { Button } from "@/components/ui/button";

// type Props = {
//   cardId: string;
//   stock: number;
// };


// const AddToCartSection = ({ cardId, stock }: Props) => {

//   const [qty, setQty] = useState(1);

//   const dec = () => setQty((v) => Math.max(1, v - 1));
//   const inc = () => setQty((v) => Math.min(stock, v + 1));

//   const handleAdd = () => {
//     console.log("ADD TO CART", { cardId, qty });
//   };

//   return (
//     <div className="flex items-center gap-4">
      
//       {/* QTY */}
//       <div className="flex items-center border rounded-[4px]">
//         <button
//           type="button"
//           className="px-3 py-2"
//           onClick={dec}
//         >
//           <Minus size={16} />
//         </button>

//         <span className="px-4 w-[46px] select-none text-end">{qty}</span>

//         <button
//           type="button"
//           className="px-3 py-2"
//           onClick={inc}
//           disabled={qty >= stock}
//         >
//           <Plus size={16} />
//         </button>
//       </div>

//       {/* ADD */}
//       <Button
//         variant="more"
//         className="w-[220px]"
//         onClick={handleAdd}
//         disabled={stock === 0}
//       >
//         <ShoppingBag size={18} />
//         Add to cart
//       </Button>
//     </div>
//   );
// };

// export default AddToCartSection;

// ==========================================================

// "use client";

// import { useState } from "react";
// import { ShoppingBag, Minus, Plus } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { useCartStore } from "@/store/cartStore";
// // import { CardListItem } from "@/types/cards";
// import { DbCard } from "@/types/types";

// // type Props = {
// //   cardId: string;
// //   stock: number;
// // };

// interface AddToCartButtonProps {
//   card: DbCard;
//   stock: number;
// }

// const AddToCartSection = ({ card, stock }: AddToCartButtonProps) => {
//   const [qty, setQty] = useState(1);

//   // const frontImage = card.faces?.[0]?.images?.normal || "";
//   // const backImage = card.faces?.[1]?.images?.normal;

//   const addToCart = useCartStore((state) => state.addToCart);
//   const setCartOpen = useCartStore((store) => store.setCartOpen);

//   const dec = () => setQty((v) => Math.max(1, v - 1));
//   const inc = () => setQty((v) => Math.min(stock, v + 1));

//   const handleAdd = () => {
//     addToCart({
//       id: card._id.toString(),
//       name: card.name,
//       set_name: card.set_name,
//       image: card.faces?.[0]?.images?.small ?? "",
//       price: card.prices,
//       quantity: qty,
//       stock: stock,
//       condition: card.condition,
//       language: card.lang,
//       foil: card.foilType ?? null,
//     });
//     setCartOpen(true);
//   };


//   return (
//     <div className="flex items-center gap-4">
      
//       {/* QTY */}
//       <div className="flex items-center border rounded-[4px]">
//         <button
//           type="button"
//           className="px-3 py-2"
//           onClick={dec}
//         >
//           <Minus size={16} />
//         </button>

//         <span className="px-4 w-[46px] select-none text-end">
//           {qty}
//         </span>

//         <button
//           type="button"
//           className="px-3 py-2"
//           onClick={inc}
//           disabled={qty >= stock}
//         >
//           <Plus size={16} />
//         </button>
//       </div>

//       {/* ADD */}
//       <Button
//         variant="more"
//         className="w-[220px]"
//         onClick={handleAdd}
//         disabled={stock === 0}
//       >
//         <ShoppingBag size={18} />
//         Add to cart
//       </Button>
//     </div>
//   );
// };

// export default AddToCartSection;




// components/AddToCartSection/AddToCartSection.tsx
// "use client"

// import { useState } from "react"
// import { ShoppingBag, Minus, Plus } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useCartStore } from "@/store/cartStore"
// import { DbCard } from "@/types/types"

// interface AddToCartProps {
  //   card: DbCard
  //   stock: number
  //   disabled?: boolean; // Добавляем опциональный проп для отключения кнопки
  // }
  
  // const AddToCartSection = ({ card, stock, disabled }: AddToCartProps) => {
    //   const [qty, setQty] = useState(1)
    //   // const [showAuthModal, setShowAuthModal] = useState(false)
    
    //   const addToCart = useCartStore((state) => state.addToCart)
    
    //   const dec = () => setQty((v) => Math.max(1, v - 1))
    //   const inc = () => setQty((v) => Math.min(stock, v + 1))
    
    //   const handleAdd = () => {
      //     addToCart(
        //       {
          //         id: card._id.toString(),
          //         scryfallId: card.scryfall_id,
          //         name: card.name,
          //         set_name: card.set_name,
          //         image: card.faces?.[0]?.images?.small ?? "",
          //         price: card.prices,
          //         quantity: qty,
//         stock,
//         condition: card.condition,
//         language: card.lang,
//         foil: card.foilType ?? null,
//       },
//       // () => setShowAuthModal(true)  // ← вызывается при 401
//     )
//   }

//   return (
  //     <div className="flex items-center gap-4">
  //       <div className="flex items-center border rounded-[4px]">
  //         <button type="button" className="px-3 py-2" onClick={dec}>
  //           <Minus size={16} />
  //         </button>
  //         <span className="px-4 w-[46px] select-none text-end">{qty}</span>
  //         <button
  //           type="button"
  //           className="px-3 py-2"
  //           onClick={inc}
  //           disabled={qty >= stock}
  //         >
  //           <Plus size={16} />
  //         </button>
  //       </div>
  
  //       <Button
  //       onClick={handleAdd}
  //       disabled={disabled || isReserving} // Блокируем, если нет в наличии ИЛИ идет загрузка
  //       className={disabled ? "opacity-50 cursor-not-allowed" : ""}
  //     >
  //       {disabled ? "Max in Cart" : "Add to Cart"}
  //     </Button>
  
  //       {/* <Button
  //         variant="more"
  //         className="w-[220px]"
  //         onClick={handleAdd}
  //         disabled={stock === 0}
  //       >
  //         <ShoppingBag size={18} />
  //         Add to cart
  //       </Button> */}
  //     </div>
  //   )
  // }
  
  // export default AddToCartSection
  
  // "use client";
  
  // import { useState } from "react";
  // import { Button } from "@/components/ui/button";
  // // 🔹 Добавили импорт Minus и Plus
  // import { Loader2, ShoppingBag, Minus, Plus } from "lucide-react"; 
  // import { DbCard } from "@/types/types";
  // import { useCartStore } from "@/store/cartStore";
  // import { toast } from "sonner";
  
  // type Props = {
    //   card: DbCard;
    //   stock: number; // Сюда лучше передавать именно ДОСТУПНЫЙ остаток (availableQty из родителя)
    //   disabled?: boolean;
    // };
    
    // const AddToCartSection = ({ card, stock, disabled }: Props) => {
      //   const [isReserving, setIsReserving] = useState(false);
      
      //   // 🔹 Добавляем локальное состояние для счетчика (по умолчанию 1)
      //   const [qty, setQty] = useState(1); 
      
      //   const addToCart = useCartStore((store) => store.addToCart);
      
//   // 🔹 Функции для кнопок + и -
//   const inc = () => {
//     if (qty < stock) setQty(qty + 1);
//   };

//   const dec = () => {
  //     if (qty > 1) setQty(qty - 1);
  //   };
  
  //   const handleAdd = async (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    
    //     if (disabled) return;
    
    //     setIsReserving(true); 
    
    //     try {
      //       const isSuccess = await addToCart({
        //         id: card._id.toString(),
        //         scryfallId: card.scryfall_id,
        //         name: card.name,
        //         set_name: card.set_name,
        //         image: card.faces?.[0]?.images?.normal || "", 
        //         price: card.prices,
        //         quantity: qty, // 🔹 Передаем выбранное количество, а не жесткую "1"
        //         stock: card.quantity, // В стор передаем абсолютный сток из базы
        //         condition: card.condition,
        //         language: card.lang,
        //         foil: card.foilType ?? null,
        //       });
        
        //       if (isSuccess) {
          //         toast.success(`Added ${qty} to cart & reserved!`);
          //         setQty(1); // 🔹 Сбрасываем счетчик обратно на 1 после успешного добавления
          //       } else {
            //         toast.error("Could not reserve card");
            //       }
            //     } catch (error) {
              //       toast.error("Something went wrong");
              //     } finally {
                //       setIsReserving(false); 
                //     }
                //   };
                
                //   return (
                  //     <div className="flex items-center gap-4">
                  //       {/* 🔹 Скрываем счетчик, если карт больше нет */}
                  //       {!disabled && (
                    //         <div className="flex items-center border rounded-[4px]">
                    //           <button 
                    //             type="button" 
                    //             className="px-3 py-2 disabled:opacity-50" 
                    //             onClick={dec}
                    //             disabled={qty <= 1} // Блокируем минус, если уже 1
                    //           >
                    //             <Minus size={16} />
                    //           </button>
                    //           <span className="px-4 w-[46px] select-none text-center">{qty}</span>
                    //           <button
                    //             type="button"
                    //             className="px-3 py-2 disabled:opacity-50"
                    //             onClick={inc}
                    //             disabled={qty >= stock} // Блокируем плюс, если достигли максимума
                    //           >
                    //             <Plus size={16} />
                    //           </button>
                    //         </div>
                    //       )}
                    
                    //       <Button
                    //         variant="more"
//         onClick={handleAdd}
//         disabled={disabled || isReserving} 
//         className={disabled ? "opacity-50 cursor-not-allowed w-[220px] ml-36" : "w-[220px]"}
//       >
//         {isReserving ? (
  //           <Loader2 className="animate-spin" size={18} />
  //         ) : disabled ? (
    //           "Max in Cart"
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
      
      
// components/AddToCartSection/AddToCartSection.tsx
      
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag, Minus, Plus } from "lucide-react"; 
import { DbCard } from "@/types/types";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

type Props = {
  card: DbCard;
  stock?: number; // Сделал опциональным, т.к. теперь мы опираемся напрямую на card.quantity
  disabled?: boolean;
};

const AddToCartSection = ({ card, disabled }: Props) => {
  const [isReserving, setIsReserving] = useState(false);
  const [qty, setQty] = useState(1); 
  
  const addToCart = useCartStore((store) => store.addToCart);
  // 🔹 1. Достаем все товары из корзины
  const cartItems = useCartStore((store) => store.items);

  // 🔹 2. Ищем, сколько ТАКИХ карт уже лежит в корзине
  const itemInCart = cartItems.find((i) => i.id === card._id.toString());
  const inCartQty = itemInCart?.quantity || 0;

  // 🔹 3. Вычисляем ЖЕСТКИЙ ЛИМИТ: (Всего в базе) минус (Уже в корзине)
  const maxAvailableToAdd = card.quantity - inCartQty;

  // 🔹 4. Защита: если счетчик qty больше, чем осталось доступно, сбрасываем его
  useEffect(() => {
    if (qty > maxAvailableToAdd && maxAvailableToAdd > 0) {
      setQty(maxAvailableToAdd);
    }
  }, [maxAvailableToAdd, qty]);

  // Флаг полной блокировки (если закончились в базе ИЛИ мы уже всё положили в корзину)
  const isCompletelyOutOfStock = disabled || maxAvailableToAdd <= 0;

  const inc = () => {
    // Теперь + не дает выбрать больше, чем реально можно добавить
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
        stock: card.quantity, // В стор передаем абсолютный сток из базы
        condition: card.condition,
        language: card.lang,
        foil: card.foilType ?? null,
      });

      if (!isSuccess) {
      //   toast.success(`Added ${qty} to cart & reserved!`);
      //   setQty(1); 
      // } else {
        toast.error("Could not reserve card");
      }
    } catch (error) {
      toast.error("Something went wrong: " + (error as Error).message);
    } finally {
      setIsReserving(false); 
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* 🔹 Если добавить больше ничего нельзя, прячем счетчик вообще */}
      {!isCompletelyOutOfStock && (
        <div className="flex items-center border rounded-[4px]">
          <button 
            type="button" 
            className="px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={dec}
            disabled={qty <= 1} 
          >
            <Minus size={16} />
          </button>
          
          <span className="px-4 w-[46px] select-none text-center">{qty}</span>
          
          <button
            type="button"
            className="px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={inc}
            // 🔹 Блокируем плюс, если достигли жесткого лимита
            disabled={qty >= maxAvailableToAdd} 
          >
            <Plus size={16} />
          </button>
        </div>
      )}

      <Button
        variant="more"
        onClick={handleAdd}
        disabled={isCompletelyOutOfStock || isReserving} 
        className={isCompletelyOutOfStock ? "opacity-50 cursor-not-allowed w-[220px] ml-36" : "w-[220px]"}
      >
        {isReserving ? (
          <Loader2 className="animate-spin" size={18} />
        ) : isCompletelyOutOfStock ? (
          "Max in Cart"
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