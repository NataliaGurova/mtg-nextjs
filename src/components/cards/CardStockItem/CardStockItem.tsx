// import { DbCard } from "@/types/types";
// import css from "./CardStockItem.module.css";
// import AddToCartSection from "../cards/AddToCartSection/AddToCartSection";

// type Props = {
//   card: DbCard;
// };

// const CardStockItem = ({ card }: Props) => {
//   const cardId = card._id.toString();

//   return (
//     <div key={cardId} className={css.priceBox}>
      
//       <p title="Language">
//         {card.lang.toUpperCase()}
//       </p>

//       {card.isFoil && card.foilType ? (
//         <div className={css.foils}>
//           {card.foilType}
//         </div>
//       ) : (
//         <div className={css.nonfoils}></div>
//       )}

//       <div>
//         <strong>{card.condition}</strong>
//         <span> ({card.quantity})</span>
//       </div>

//       <strong className={css.price}>
//         {card.prices} ₴
//       </strong>

//       <AddToCartSection
//         card={card}
//         stock={card.quantity}
//       />

//     </div>
//   );
// };

// export default CardStockItem;


// import { DbCard } from "@/types/types";
// // import { CartItem } from "@/types/cart";
// import css from "./CardStockItem.module.css";
// import AddToCartSection from "../AddToCartSection/AddToCartSection";
// import { CartItem } from "@/types/cart";

// type Props = {
//   card: DbCard | CartItem;
// };

// const CardStockItem = ({ card }: Props) => {

//   const isDbCard = "_id" in card;

//   // const id = isDbCard ? card._id.toString() : card.id;

//   const lang = isDbCard ? card.lang : card.language;
//   const foilType = isDbCard ? card.foilType : card.foil;
//   const isFoil = isDbCard ? card.isFoil : !!card.foil;
//   const condition = card.condition;
//   const quantity = card.quantity;
//   const price = isDbCard ? card.prices : card.price;

//   return (
//     <div className={css.priceBox}>
      
//       <p title="Language">
//         {lang.toUpperCase()}
//       </p>

//       {isFoil && foilType ? (
//         <div className={css.foils}>
//           {foilType}
//         </div>
//       ) : (
//         <div className={css.nonfoils}></div>
//       )}

//       <div>
//         <strong>{condition}</strong>
//         <span> ({quantity})</span>
//       </div>

//       <strong className={css.price}>
//         {price} ₴
//       </strong>

//       {isDbCard && (
//         <AddToCartSection
//           card={card}
//           stock={card.quantity}
//         />
//       )}

//     </div>
//   );
// };

// export default CardStockItem;

"use client";

import { DbCard } from "@/types/types";
import { CartItem } from "@/types/cart";
import css from "./CardStockItem.module.css";
import AddToCartSection from "../AddToCartSection/AddToCartSection";
// 🔹 Импортируем ваш стор
import { useCartStore } from "@/store/cartStore";

type Props = {
  card: DbCard | CartItem;
};

const CardStockItem = ({ card }: Props) => {
  const isDbCard = "_id" in card;
  const id = isDbCard ? card._id.toString() : card.id;

  // 🔹 1. Достаем корзину и ищем, есть ли уже эта карта у пользователя
  const cartItems = useCartStore((state) => state.items);
  const itemInCart = cartItems.find((item) => item.id === id);
  
  // Сколько таких карт уже лежит в корзине (если нет, то 0)
  const qtyInCart = itemInCart ? itemInCart.quantity : 0;

  const lang = isDbCard ? card.lang : card.language;
  const foilType = isDbCard ? card.foilType : card.foil;
  const isFoil = isDbCard ? card.isFoil : !!card.foil;
  const condition = card.condition;
  const price = isDbCard ? card.prices : card.price;
  
  // 🔹 2. Считаем ДОСТУПНЫЙ остаток
  const totalStock = card.availableQty ?? card.quantity; 
  const availableQty = totalStock - qtyInCart;
  
  // Если доступно 0 или меньше (защита от багов)
  const isOutOfStock = availableQty <= 0;

  return (
    <div className={css.priceBox}>
      <p title="Language">{lang.toUpperCase()}</p>

      {isFoil && foilType ? (
        <div className={css.foils}>{foilType}</div>
      ) : (
        <div className={css.nonfoils}></div>
      )}

      <div>
        <strong>{condition}</strong>
        {/* 🔹 3. Показываем реактивный остаток */}
        <span> ({availableQty})</span>
      </div>

      <strong className={css.price}>{price} ₴</strong>

      {isDbCard && (
        <AddToCartSection
          card={card}
          stock={totalStock}
          // 🔹 4. Передаем флаг в кнопку, чтобы она заблокировалась
          disabled={isOutOfStock} 
        />
      )}
    </div>
  );
};

export default CardStockItem;