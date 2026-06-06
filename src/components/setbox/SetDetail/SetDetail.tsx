// src/components/setbox/SetDetail/SetDetail.tsx
import Image from "next/image";
import css from "./SetDetail.module.css";
import SetIcon from "@/components/SetIcon/SetIcon";
import { ExternalLink, ImageIcon } from "lucide-react";
import AddToCartSection from "@/components/cards/AddToCartSection/AddToCartSection";
import WishlistButton from "@/components/WishlistButton/WishlistButton";

interface SetDetailProps {
  set: string;
  set_name: string;
  description?: string;
  prices: number;
  isFoil: boolean;
  imageUrl?: string;
  releaseDate?: string;
  mainCard?: string;
  mainSetSize?: number;
  lang?: string;
}

const SetDetail = ({
  set,
  set_name,
  description,
  prices,
  isFoil,
  imageUrl,
  releaseDate,
  mainSetSize,
  lang = "en",
}: SetDetailProps) => {
  const formattedPrice = prices.toLocaleString("uk-UA");
  const hasCustomArt = !!imageUrl;

  // Превращаем "2023-10-13" в "13 жовтня 2023 р."
  const formattedReleaseDate = releaseDate 
    ? new Date(releaseDate).toLocaleDateString("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) 
    : null;

  const internalAlbumUrl = `/fullsets/${set.toLowerCase()}/album?size=${mainSetSize}&name=${encodeURIComponent(set_name)}`;

  const cartItem = {
    id: `fullset_${set.toLowerCase()}`,
    scryfallId: "",
    name: set_name,
    set_name: set_name,
    // releaseDate: releaseDate,
    image: imageUrl || "/sets/Chest_nonfoil11.png",
    price: prices,
    quantity: 1,
    stock: 1,
    condition: "NM",
    language: lang,
    foil: isFoil ? "foil" : null,
    type: "fullset" as const,
  };

  return (
    <div className={css.pageContainer}>
      <div className={css.content}>
        
        {/* ЛІВА КОЛОНКА (Зображення) */}
        <section className={css.imageSection}>
          {hasCustomArt ? (
            <Image
              src={imageUrl!}
              alt={`${set_name} art`}
              className={css.artImage}
              width={536}
              height={335}
            />
          ) : (
            <div className={css.chestFallback}>
              <Image
                src="/sets/Chest_nonfoil11.png"
                alt={`${set_name} chest`}
                width={320} // Установили базовую ширину
                height={200}
                priority
              />
            </div>
          )}
        </section>

        {/* ПРАВА КОЛОНКА (Інформація) */}
        <section className={css.infoSection}>
          <div className={css.header}>
            <div className={css.titleWrapper}>
              <SetIcon setCode={set} theme="bronze" size={48} />
              <h1 className={css.title}>{set_name}</h1>
            </div>
            {isFoil && <span className={css.foil}>Foil</span>}
          </div>

          {description && (
            <p className={css.description}>{description}</p>
          )}

          <a
            href={internalAlbumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css.externalLink}
          >
            <ImageIcon size={16} />
            Переглянути альбом фулсету
            <ExternalLink size={14} className={css.externalIcon} />
          </a>

          {(releaseDate || mainSetSize) && (
          <div className={css.statsBox}>
            {releaseDate && (
              <div className={css.statRow}>
                <span className={css.statLabel}>Дата релізу: </span>
                <span className={css.statValue}>{formattedReleaseDate}</span> {/* 👈 Меняем здесь */}
              </div>
            )}
            {mainSetSize && (
              <div className={css.statRow}>
                <span className={css.statLabel}>Базових карт: </span>
                <span className={css.statValue}>{mainSetSize} шт.</span>
              </div>
            )}
          </div>
        )}

          {/* Блок цены теперь ВНУТРИ правой колонки! */}
          <div className={css.priceCard}>
            <p className={css.price}>{formattedPrice} ₴</p>

            <div className={css.cartWishlist}>
              <AddToCartSection
                mode="fullset"
                fullsetItem={cartItem}
                showQuantity={false}
                buttonClassName={css.buyButton}
              />
              <WishlistButton
                cardId={cartItem.id}
                variant="responsive"
              />
            </div>
          </div>

        </section>
              </div>
          <div className={css.priceCardTablet}>
            <p className={css.price}>{formattedPrice} ₴</p>

            <div className={css.cartWishlist}>
              <AddToCartSection
                mode="fullset"
                fullsetItem={cartItem}
                showQuantity={false}
                buttonClassName={css.buyButton}
              />
              <WishlistButton
                cardId={cartItem.id}
                variant="transparent"
              />
            </div>
          </div>
    </div>
  );
};

export default SetDetail;

// // src/components/setbox/SetDetail/SetDetail.tsx
// import Image from "next/image";
// import css from "./SetDetail.module.css";
// import SetIcon from "@/components/SetIcon/SetIcon";
// import { ExternalLink, ImageIcon } from "lucide-react";
// import AddToCartSection from "@/components/cards/AddToCartSection/AddToCartSection";
// import WishlistButton from "@/components/WishlistButton/WishlistButton";

// // 1. Приводим интерфейс в точное соответствие с вашим JSON
// interface SetDetailProps {
//   set: string;
//   set_name: string;
//   description?: string;
//   prices: number; // В JSON у вас prices
//   isFoil: boolean;
//   imageUrl?: string;
//   releaseDate?: string;
//   mainCard?: string; // Добавлено из вашего JSON
//   mainSetSize?: number;
//   lang?: string;
// }

// const SetDetail = ({
//   set,
//   set_name,
//   description,
//   prices,
//   isFoil,
//   imageUrl,
//   releaseDate,
//   mainSetSize,
//   lang = "en",
// }: SetDetailProps) => {
//   // 2. Используем правильные переменные из пропсов
//   const formattedPrice = prices.toLocaleString("uk-UA");
//   const hasCustomArt = !!imageUrl;

//   const internalAlbumUrl = `/fullsets/${set.toLowerCase()}/album?size=${mainSetSize}&name=${encodeURIComponent(set_name)}`;

//   // 3. Формируем объект для корзины и вишлиста
//   const cartItem = {
//     id: `fullset_${set.toLowerCase()}`,   // например, "fullset_who"
//     scryfallId: "",
//     name: set_name,
//     set_name: set_name,
//     image: imageUrl || "/mtg/Chest_tr.png",
//     price: prices, // Корзина ожидает price, передаем ему prices из JSON
//     quantity: 1,
//     stock: 1,
//     condition: "NM",
//     language: lang,
//     foil: isFoil ? "foil" : null,
//     type: "fullset" as const,
//   };

//   return (
//     <div className={css.pageContainer}>
// <div className={css.content}>
//       {/* ЛІВА КОЛОНКА */}
//       <section className={css.imageSection}>
//         {hasCustomArt ? (
//           <Image
//             src={imageUrl!}
//             alt={`${set_name} art`}
//             className={css.artImage}
//             width={536}
//             height={335}
//           />
//         ) : (
//           <div className={css.chestFallback}>
//             <Image
//               src="/mtg/Chest_tr.png"
//               alt={`${set_name} chest`}
//               width={500}
//               height={300}
//               priority
//             />
//           </div>
//         )}
//       </section>

//       {/* ПРАВА КОЛОНКА */}
//       <section className={css.infoSection}>

//         <div className={css.header}>
//           <div className={css.titleWrapper}>
//             <SetIcon setCode={set} theme="bronze" size={48} />
//             <h1 className={css.title}>{set_name}</h1>
//           </div>
//           {isFoil && <span className={css.foil}>Foil</span>}
//         </div>

//         {description && (
//           <p className={css.description}>{description}</p>
//         )}

//         <a
//           href={internalAlbumUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className={css.externalLink}
//         >
//           <ImageIcon size={16} />
//           Переглянути альбом фулсету
//           <ExternalLink size={14} className={css.externalIcon} />
//         </a>

//         {(releaseDate || mainSetSize) && (
//           <div className={css.statsBox}>
//             {releaseDate && (
//               <div className={css.statRow}>
//                 <span className={css.statLabel}>Дата релізу: </span>
//                 <span className={css.statValue}>{releaseDate}</span>
//               </div>
//             )}
//             {mainSetSize && (
//               <div className={css.statRow}>
//                 <span className={css.statLabel}>Базових карт: </span>
//                 <span className={css.statValue}>{mainSetSize} шт.</span>
//               </div>
//             )}
//           </div>
//         )}


//       </section>
//       </div>

//           <div className={css.priceCard}>
//             <p className={css.price}>{formattedPrice} ₴</p>

//         <div className={css.cartWishlist}>
//           <AddToCartSection
//             mode="fullset"
//             fullsetItem={cartItem}
//             showQuantity={false}
//             buttonClassName={css.buyButton}
//             />
//           <WishlistButton
//             cardId={cartItem.id} // Передаем "fullset_who"
//             variant="responsive"
//             />
//         </div>
//             </div>
//     </div>
//   );
// };

// export default SetDetail;