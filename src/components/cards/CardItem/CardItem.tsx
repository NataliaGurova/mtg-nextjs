
// "use client";

// import css from "./CardItem.module.css";
// import { ShoppingBag } from "lucide-react";
// import { DbCard } from "@/types/types";
// import { Button } from "@/components/ui/button";
// import CardFlipper from "@/components/CardFlipper/CardFlipper";
// import { useCartStore } from "@/store/cartStore";

// interface CardItemProps {
//   card: DbCard;
// }

// const CardItem = ({ card }: CardItemProps) => {
//   const frontImage = card.faces?.[0]?.images?.normal || "";
//   const backImage = card.faces?.[1]?.images?.normal;

//   const addToCart = useCartStore((store) => store.addToCart);

//   const handleAdd = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     addToCart({
//       id: card._id.toString(),
//       name: card.name,
//       set_name: card.set_name,
//       image: frontImage, // фронт карточки
//       price: card.prices,
//       quantity: 1, // можно потом сделать выбор кол-ва
//       stock: card.quantity,
//       condition: card.condition,
//       language: card.lang,
//       foil: card.foilType ?? null,
//     });
//   };

//   return (
//     <div className={css.itemCard}>
//       {frontImage && (
//         <CardFlipper
//           frontImage={frontImage}
//           backImage={backImage}
//           width={220}
//           height={310}
//           isFoil={card.isFoil}
//           flipButtonPosition={{ top: 274, right: 90 }}
//         />
//       )}

//       <h3 className={css.text} title={card.name}>
//         {card.name}
//       </h3>

//       <div className={css.bottomSection}>
//         {card.isFoil && <p className={css.foilType}>{card.foilType}</p>}

//         <div className={css.info}>
//           <p>{card.condition}</p>
//           <p>{card.prices} ₴</p>
//         </div>

//         <div className={css.cart}>
//           <Button
//             variant="loadMore"
//             className="w-[220px]"
//             onClick={handleAdd} // <-- добавление в корзину
//           >
//             Add to Cart
//             <ShoppingBag size={18} />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardItem;

// // последняя до джемени

// "use client";

// import { useState } from "react";
// import css from "./CardItem.module.css";
// import { ShoppingBag } from "lucide-react";
// import { DbCard } from "@/types/types";
// import { Button } from "@/components/ui/button";
// import CardFlipper from "@/components/CardFlipper/CardFlipper";
// import { useCartStore } from "@/store/cartStore";



// interface CardItemProps {
//   card: DbCard;
// }

// const CardItem = ({ card }: CardItemProps) => {
//   const frontImage = card.faces?.[0]?.images?.normal || "";
//   const backImage = card.faces?.[1]?.images?.normal;


//   const addToCart = useCartStore((store) => store.addToCart);

//   const handleAdd = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     addToCart(
//       {
//         id: card._id.toString(),
//         scryfallId: card.scryfall_id,
//         name: card.name,
//         set_name: card.set_name,
//         image: frontImage,
//         price: card.prices,
//         quantity: 1,
//         stock: card.quantity,
//         condition: card.condition,
//         language: card.lang,
//         foil: card.foilType ?? null,
//       },
//     );
//   };

//   return (
//     <div className={css.itemCard}>
//       {frontImage && (
//         <CardFlipper
//           frontImage={frontImage}
//           backImage={backImage}
//           width={220}
//           height={310}
//           isFoil={card.isFoil}
//           flipButtonPosition={{ top: 274, right: 90 }}
//         />
//       )}

//       <h3 className={css.text} title={card.name}>
//         {card.name}
//       </h3>

//       <div className={css.bottomSection}>
//         {card.isFoil && <p className={css.foilType}>{card.foilType}</p>}

//         <div className={css.info}>
//           <p>{card.condition}</p>
//           <p>{card.prices} ₴</p>
//         </div>

//         <div className={css.cart}>
//           <Button
//             variant="loadMore"
//             className="w-[220px]"
//             onClick={handleAdd} // <-- добавление в корзину
//           >
//             Add to Cart
//             <ShoppingBag size={18} />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardItem;


// "use client";

// import { useState } from "react";
// import css from "./CardItem.module.css";
// // Добавляем Loader2 для индикатора загрузки
// import { ShoppingBag, Loader2 } from "lucide-react";
// import { DbCard } from "@/types/types";
// import { Button } from "@/components/ui/button";
// import CardFlipper from "@/components/CardFlipper/CardFlipper";
// import { useCartStore } from "@/store/cartStore";
// // Импортируем наш серверный экшен
// // import { reserveCard } from "@/app/actions/cart";
// // Импортируем toast для уведомлений
// import { toast } from "sonner";

// interface CardItemProps {
//   card: DbCard;
// }

// const CardItem = ({ card }: CardItemProps) => {
//   // Добавляем состояние загрузки
//   const [isReserving, setIsReserving] = useState(false);
  
//   const frontImage = card.faces?.[0]?.images?.normal || "";
//   const backImage = card.faces?.[1]?.images?.normal;

//   const addToCart = useCartStore((store) => store.addToCart);

//   // Делаем функцию асинхронной
//   const handleAdd = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     setIsReserving(true);

//     try {
//       // Вызываем ТОЛЬКО функцию стора. Она сама сходит в базу данных.
//       const isSuccess = await addToCart({
//         id: card._id.toString(),
//         scryfallId: card.scryfall_id,
//         name: card.name,
//         set_name: card.set_name,
//         image: frontImage,
//         price: card.prices,
//         quantity: 1, // Добавляем строго 1
//         stock: card.quantity,
//         condition: card.condition,
//         language: card.lang,
//         foil: card.foilType ?? null,
//       });

//       // Показываем уведомление только если стор вернул true
//       if (isSuccess) {
//         toast.success("Added to cart & reserved!");
//       } else {
//         toast.error("Could not reserve card");
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     } finally {
//       setIsReserving(false);
//     }
//   };
//   // const handleAdd = async (e: React.MouseEvent) => {
//   //   e.preventDefault();
//   //   e.stopPropagation();

//   //   setIsReserving(true); // Включаем крутилку на кнопке

//   //   try {
//   //     // 1. Пытаемся зарезервировать карту в MongoDB
//   //     const result = await reserveCard(card._id.toString(), 1);

//   //     // Если база ответила ошибкой (например, карт больше нет в наличии)
//   //     if (!result.success) {
//   //       toast.error(result.error);
//   //       return; // Прерываем выполнение, в корзину не добавляем
//   //     }

//   //     // 2. Если транзакция в БД прошла успешно, добавляем в Zustand (UI)
//   //     addToCart({
//   //       id: card._id.toString(),
//   //       scryfallId: card.scryfall_id,
//   //       name: card.name,
//   //       set_name: card.set_name,
//   //       image: frontImage,
//   //       price: card.prices,
//   //       quantity: 1,
//   //       stock: card.quantity,
//   //       condition: card.condition,
//   //       language: card.lang,
//   //       foil: card.foilType ?? null,
//   //     });

//   //     toast.success("Added to cart & reserved!");
//   //   } catch (error) {
//   //     toast.error("Something went wrong");
//   //   } finally {
//   //     setIsReserving(false); // Выключаем крутилку в любом случае
//   //   }
//   // };

//   return (
//     <div className={css.itemCard}>
//       {frontImage && (
//         <CardFlipper
//           frontImage={frontImage}
//           backImage={backImage}
//           width={220}
//           height={310}
//           isFoil={card.isFoil}
//           flipButtonPosition={{ top: 274, right: 90 }}
//         />
//       )}

//       <h3 className={css.text} title={card.name}>
//         {card.name}
//       </h3>

//       <div className={css.bottomSection}>
//         {card.isFoil && <p className={css.foilType}>{card.foilType}</p>}

//         <div className={css.info}>
//           <p>{card.condition}</p>
//           <p>{card.prices} ₴</p>
//         </div>

//         <div className={css.cart}>
//           <Button
//             variant="loadMore"
//             className="w-[220px]"
//             onClick={handleAdd}
//             disabled={isReserving} // Блокируем кнопку во время запроса
//           >
//             {isReserving ? (
//               <Loader2 className="animate-spin" size={18} />
//             ) : (
//               <>
//                 Add to Cart
//                 <ShoppingBag size={18} />
//               </>
//             )}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardItem;

"use client";

import { useState } from "react";
import css from "./CardItem.module.css";
import { DbCard } from "@/types/types";
import { Button } from "@/components/ui/button";
import CardFlipper from "@/components/CardFlipper/CardFlipper";
import { useCartStore } from "@/store/cartStore";

import { toast } from "sonner"; 
import { ShoppingBag, Loader2 } from "lucide-react";
// import { InfinitySpin } from "react-loader-spinner";

interface CardItemProps {
  card: DbCard;
}

const CardItem = ({ card }: CardItemProps) => {
  const [isReserving, setIsReserving] = useState(false); 
  
  const frontImage = card.faces?.[0]?.images?.normal || "";
  const backImage = card.faces?.[1]?.images?.normal;

  // 🔹 1. Достаем стор целиком, чтобы получить и метод добавления, и сами товары
  const cartItems = useCartStore((store) => store.items);
  const addToCart = useCartStore((store) => store.addToCart);

  // 🔹 2. Высчитываем, сколько карт уже в корзине, и блокируем кнопку, если достигли лимита
  const id = card._id.toString();
  const itemInCart = cartItems.find((item) => item.id === id);
  const qtyInCart = itemInCart ? itemInCart.quantity : 0;
  
  const totalStock = card.availableQty ?? card.quantity;
  const availableQty = totalStock - qtyInCart;
  const isOutOfStock = availableQty <= 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Защита от клика, если карт больше нет
    if (isOutOfStock) return;

    setIsReserving(true);

    try {
      const isSuccess = await addToCart({
        id: id,
        scryfallId: card.scryfall_id,
        name: card.name,
        set_name: card.set_name,
        image: frontImage,
        price: card.prices,
        quantity: 1, 
        stock: totalStock, // Передаем абсолютный сток из базы
        condition: card.condition,
        language: card.lang,
        foil: card.foilType ?? null,
      });

      if (!isSuccess) {
      //   toast.success("Added to cart & reserved!");
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
    <div className={css.itemCard}>
      {frontImage && (
        <CardFlipper
          frontImage={frontImage}
          backImage={backImage}
          width={220}
          height={310}
          isFoil={card.isFoil}
          flipButtonPosition={{ top: 274, right: 90 }}
        />
      )}

      <h3 className={css.text} title={card.name}>
        {card.name}
      </h3>

      <div className={css.bottomSection}>
        {card.isFoil && <p className={css.foilType}>{card.foilType}</p>}

        <div className={css.info}>
          <p>{card.condition}</p>
          <p>{card.prices} ₴</p>
        </div>

        <div className={css.cart}>
          <Button
            variant="loadMore"
            // 🔹 3. Меняем стили, если кнопка заблокирована
            className={`w-[220px] ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleAdd}
            // 🔹 4. Блокируем кнопку, если идет загрузка ИЛИ карт больше нет
            disabled={isReserving || isOutOfStock} 
          >
            {isReserving ? (
          //   <InfinitySpin 
          //   width="60" 
          //   color="#4fa94d" // Или любой другой HEX-код (например, "#ffffff" для белого)
          // />
              <Loader2 className="animate-spin" size={18} />
            ) : isOutOfStock ? (
              // 🔹 5. Показываем текст "Max in Cart"
              "Max in Cart"
            ) : (
              <>
                Add to Cart
                <ShoppingBag size={18} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;


