
// import Image from "next/image";
// import css from "./SetItem.module.css";
// import SetIcon from "@/components/SetIcon/SetIcon";
// import AddToCartSection from "@/components/cards/AddToCartSection/AddToCartSection";
// import WishlistButton from "@/components/WishlistButton/WishlistButton";

// // Описываем, какие данные принимает карточка
// interface SetItemProps {
//   setCode: string;
//   setName: string;
//   isFoil: boolean;
//   price: number;
// }

// const SetItem = ({ setCode, setName, isFoil, price }: SetItemProps) => {
//   // Форматируем цену (добавит пробелы: 45000 -> 45 000)
//   const formattedPrice = price.toLocaleString("uk-UA");

//   return (
//     <div className={css.wrapper}>
      
//       {/* --- ВЕРХНЯЯ ЧАСТЬ: Сундук с табличкой --- */}
//       <div className={css.chestContainer}>
//         {/* <Image
//           src="/mtg/Chest_foil.png"
//           alt={`${setName} chest`}
//           width={320}
//           height={200}
//           priority
//         /> */}
//         {isFoil ? (
//             <Image
//           src="/mtg/Chest_foil11.png"
//           alt={`${setName} chest`}
//           width={320}
//           height={200}
//           priority
//         />):
//           (
//             <Image
//           src="/mtg/Chest_nonfoil11.png"
//           alt={`${setName} chest`}
//           width={320}
//           height={200}
//           priority
//         />
//           )}
        
//         {/* Иконка */}
//         <div className={css.iconWrapper}>
//           {/* Передаем код сета в иконку */}
//           <SetIcon setCode={setCode} theme="bronze" size={36} />
//         </div>
          
//         {/* Текст на табличке */}
//         <div className={css.textWrapper}>
//           {/* Делаем код сета заглавными буквами */}
//           <p className={css.setText}>
//             {setCode.toUpperCase()}
//           </p>
//         </div>
//       </div>

//       {/* --- НИЖНЯЯ ЧАСТЬ: Название и Цена --- */}
//       <div className={css.infoContainer}>
//         <h2 className={css.title}>
//           {setName}
//           {/* Показываем значок Foil только если isFoil === true */}
//         </h2>
//         <div className={css.foilPrice}>
//           {isFoil && (
//             <span className={css.foil}>
//               Foil
//             </span>
//           )}
//         <p className={css.price}>
//           {formattedPrice} ₴
//         </p>
//         </div>
//       </div>

//       <div className={css.cartWishlist}>
//                 <AddToCartSection
//                   mode="fullset"
//                   fullsetItem={cartItem}
//                   showQuantity={false}
//                   buttonClassName={css.buyButton}
//                   />
//                 <WishlistButton
//                   cardId={cartItem.id} // Передаем "fullset_who"
//                   variant="responsive"
//                   />
//               </div>
      
//     </div>
//   );
// };

// export default SetItem;

import Image from "next/image";
import css from "./SetItem.module.css";
import SetIcon from "@/components/SetIcon/SetIcon";
import AddToCartSection from "@/components/cards/AddToCartSection/AddToCartSection";
import WishlistButton from "@/components/WishlistButton/WishlistButton";

// Описываем, какие данные принимает карточка
interface SetItemProps {
  setCode: string;
  setName: string;
  isFoil: boolean;
  price: number;
}

const SetItem = ({ setCode, setName, isFoil, price }: SetItemProps) => {
  // Форматируем цену (добавит пробелы: 45000 -> 45 000)
  const formattedPrice = price.toLocaleString("uk-UA");

  // 🔹 СОЗДАЕМ ОБЪЕКТ ТОВАРА ДЛЯ КОРЗИНЫ И ВИШЛИСТА
  const cartItem = {
    id: `fullset_${setCode.toLowerCase()}`,
    scryfallId: "", 
    name: setName,
    set_name: setName,
    // Подтягиваем правильную картинку сундука в зависимости от Foil/Non-foil
    image: isFoil ? "/mtg/Chest_foil11.png" : "/mtg/Chest_nonfoil11.png",
    price: price,
    quantity: 1,
    stock: 1,
    condition: "NM",
    language: "en",
    foil: isFoil ? "foil" : null,
    type: "fullset" as const,
  };

  return (
    <div className={css.wrapper}>
      
      {/* --- ВЕРХНЯЯ ЧАСТЬ: Сундук с табличкой --- */}
      <div className={css.chestContainer}>
        {isFoil ? (
          <Image
            src="/sets/Chest_foil11.png"
            alt={`${setName} chest foil`}
            width={320}
            height={200}
            priority
          />
        ) : (
          <Image
            src="/sets/Chest_nonfoil11.png"
            alt={`${setName} chest`}
            width={320}
            height={200}
            priority
          />
        )}
        
        {/* Иконка */}
        <div className={css.iconWrapper}>
          <SetIcon setCode={setCode} theme="bronze" size={36} />
        </div>
          
        {/* Текст на табличке */}
        <div className={css.textWrapper}>
          <p className={css.setText}>
            {setCode.toUpperCase()}
          </p>
        </div>
      </div>

      {/* --- НИЖНЯЯ ЧАСТЬ: Название и Цена --- */}
      <div className={css.infoContainer}>
        <h2 className={css.title}>
          {setName}
        </h2>
        <div className={css.foilPrice}>
          {isFoil && (
            <span className={css.foil}>
              Foil
            </span>
          )}
          <p className={css.price}>
            {formattedPrice} ₴
          </p>
        </div>

      {/* --- КНОПКИ: Купить и В избранное --- */}
      <div className={css.cartWishlist}>
        <AddToCartSection
          mode="fullset"
          fullsetItem={cartItem}
          showQuantity={false}
          buttonVariant="loadMore"
          buttonClassName={css.buyButton}
          />
        <WishlistButton
          cardId={cartItem.id} // Передаст например "fullset_who"
          variant="responsive"
          />
      </div>
          </div>
      
    </div>
  );
};

export default SetItem;