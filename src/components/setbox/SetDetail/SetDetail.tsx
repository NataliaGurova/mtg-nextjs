// import Image from "next/image";
// import css from "./SetDetail.module.css";
// import SetIcon from "@/components/SetIcon/SetIcon";


// interface SetDetailProps {
//   setCode: string;
//   setName: string;
//   description?: string;
//   price: number;
//   isFoil: boolean;
//   imageUrl?: string;
// }

// const SetDetail = ({ setCode, setName, description, price, isFoil, imageUrl }: SetDetailProps) => {
//   const formattedPrice = price.toLocaleString("uk-UA");
//   const hasCustomArt = !!imageUrl;

//    // Данные из Scryfall
// //   const scryfallData = await fetchScryfallSet(set);

// //   const formattedPrice = item.prices.toLocaleString("uk-UA");
// //   const setbinderUrl = `https://setbinder.com/sets/${item.set}`;

// //   // Форматируем дату релиза
// //   const releaseDate = scryfallData?.released_at
// //     ? new Date(scryfallData.released_at).toLocaleDateString("uk-UA", {
// //         day: "numeric",
// //         month: "long",
// //         year: "numeric",
// //       })
// //     : null;

// //   const setTypeLabel = scryfallData?.set_type
// //     ? (SET_TYPE_LABELS[scryfallData.set_type] ?? scryfallData.set_type)
// //     : null;

//   return (
//     <div className={css.pageContainer}>
      
//       {/* ЛЕВАЯ КОЛОНКА: Изображение */}
//       <section className={css.imageSection}>
//         {hasCustomArt ? (
//           <img
//             src={imageUrl}
//             alt={`${setName} art`}
//             className={css.artImage}
//           />
//         ) : (
//           <div className={css.chestFallback}>
//             <Image
//               src="/mtg/Chest_tr.png"
//               alt={`${setName} chest`}
//               width={500}
//               height={300}
//               priority
//             />
//           </div>
//         )}
//       </section>

//       {/* ПРАВАЯ КОЛОНКА: Информация о сете */}
//       <section className={css.infoSection}>
        
//         <div className={css.header}>
//           <div className={css.titleWrapper}>
//             <SetIcon setCode={setCode} theme="bronze" size={48} />
//             <h1 className={css.title}>{setName}</h1>
//           </div>
//         </div>

//         {description && (
//           <p className={css.description}>
//             {description}
//           </p>
//         )}

//         <div className={css.priceCard}>
//           <div className={css.priceRow}>
//             <p className={css.price}>{formattedPrice} ₴</p>
//             {isFoil && <span className={css.foilBadge}>Foil</span>}
//           </div>
          
//           <button className={css.buyButton}>
//             Добавить в корзину
//           </button>
//         </div>

//       </section>
      
//     </div>
//   );
// };

// export default SetDetail;


import Image from "next/image";
import css from "./SetDetail.module.css";
import SetIcon from "@/components/SetIcon/SetIcon"; 
import { Button } from "@/components/ui/button";
import { ExternalLink, ImageIcon, ShoppingBag } from "lucide-react";

interface SetDetailProps {
  setCode: string;
  setName: string;
  description?: string;
  price: number;
  isFoil: boolean;
  imageUrl?: string;
  releaseDate?: string; // 🔹 Новое поле
  mainSetSize?: number;   // 🔹 Новое поле
  scryfallRaw?: Record<string, unknown> | null;
}

const SetDetail = ({ setCode, setName, description, price, isFoil, imageUrl, releaseDate, mainSetSize }: SetDetailProps) => {
  const formattedPrice = price.toLocaleString("uk-UA");
  const hasCustomArt = !!imageUrl;

  // 🔹 Формуємо динамічне посилання на альбом
  const internalAlbumUrl = `/fullsets/${setCode.toLowerCase()}/album?size=${mainSetSize}&name=${encodeURIComponent(setName)}`;
  // const albumUrl = `https://setbinder.com/sets/${setCode.toLowerCase()}`;
  // const gathererUrl = `https://gatherer.wizards.com/sets/${setCode.toUpperCase()}`;

  return (
    <div className={css.pageContainer}>
      
      {/* ЛЕВАЯ КОЛОНКА */}
      <section className={css.imageSection}>
        {hasCustomArt ? (
          <Image
            src={imageUrl}
            alt={`${setName} art`}
            className={css.artImage}
            width={536}
            height={335}
          />
        ) : (
          <div className={css.chestFallback}>
            <Image
              src="/mtg/Chest_tr.png"
              alt={`${setName} chest`}
              width={500}
              height={300}
              priority
            />
          </div>
        )}
      </section>

      {/* ПРАВАЯ КОЛОНКА */}
      <section className={css.infoSection}>
        
        <div className={css.header}>
          <div className={css.titleWrapper}>
            <SetIcon setCode={setCode} theme="bronze" size={48} />
            <h1 className={css.title}>{setName}</h1>
          </div>
          {isFoil && <span className={css.foil}>Foil</span>}
        </div>

        {description && (
          <p className={css.description}>
            {description}
          </p>
        )}


        {/* Наша собственная страница альбома */}
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

        {/* 🔹 БЛОК ДАННЫХ СО SCRYFALL 🔹 */}
        {(releaseDate || mainSetSize) && (
          <div className={css.statsBox}>
            {releaseDate && (
              <div className={css.statRow}>
                <span className={css.statLabel}>Дата релізу: </span>
                <span className={css.statValue}>{releaseDate}</span>
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

        {/* БЛОК ЦЕНЫ И ПОКУПКИ */}
        <div className={css.priceCard}>
          <div className={css.priceRow}>
            <p className={css.price}>{formattedPrice} ₴</p>
          </div>
          <Button variant="more" className={css.buyButton}>
            Додати у кошик
            <ShoppingBag className="ml-2" size={18} />
          </Button>
        </div>

      </section>
      
    </div>
  );
};

export default SetDetail;




{/* 🔹 ПОСИЛАННЯ НА АЛЬБОМ 🔹 */}
{/* <a 
  href={albumUrl} 
  target="_blank" 
  rel="noopener noreferrer" 
  className={css.albumLink}
>
  Переглянути альбом на Setbinder
  <ExternalLink size={16} />
</a> */}

{/* 🔹 БЛОК ССЫЛОК (Setbinder & Gatherer) 🔹 */}
{/* <div className={css.linksBlock}>
  <a 
    href={albumUrl} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={css.externalLink}
  >
    Переглянути альбом на Setbinder
    <ExternalLink size={16} />
  </a>
  <a 
    href={gathererUrl} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={css.externalLink}
  >
    Дивитися на Gatherer (Wizards)
    <ExternalLink size={16} />
  </a>
</div> */}