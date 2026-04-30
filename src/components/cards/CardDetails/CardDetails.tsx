
// import { DbCard} from "@/types/types";

// import css from "./CardDetails.module.css";

// // import Container from "@/components/Container/Container";
// import SetIcon from "@/components/SetIcon/SetIcon";
// import CardFlipper from "@/components/CardFlipper/CardFlipper";
// import CardStockItem from "@/components/cards/CardStockItem/CardStockItem";



// interface CardDetailsProps {
//   cards: DbCard[];
// }

// const legalityClasses = {
//   legal: "legal",
//   not_legal: "notLegal",
//   banned: "banned",
//   restricted: "restricted",
// } as const;

// const ALLOWED_FORMATS = [
//   "standard",
//   "pioneer",
//   "modern",
//   "legacy",
//   "pauper",
//   "vintage",
//   "commander",
//   "premodern",
// ] as const;

// type AllowedFormat = typeof ALLOWED_FORMATS[number];



// const CardDetails = ({ cards }: CardDetailsProps) => {
//   const mainCard = cards[0]; // общая информация


//   return (
//     <div className={css.cardDetailsContainer}>

//       <div className={css.cardDetailsWrapper}>


// {/* Контейнер для изображений */}
// <div className={css.imgContainer}>
//   {mainCard.faces && (
//     <>
//       {/* 1. ВЕРСИЯ ДЛЯ МОБИЛОК И ДЕСКТОПОВ (325x453) */}
//       {/* Скрываем на планшетах (md), показываем на мобилках и десктопах (lg) */}
//       {/* <div className="md:hidden lg:block"> */}
//       <div className={css.imgLarge}>
//         <CardFlipper
//           frontImage={mainCard.faces[0].images.normal}
//           backImage={mainCard.faces.length > 1 ? mainCard.faces[1].images.normal : undefined}
//           width={325}
//           height={453}
//           isFoil={mainCard.isFoil}
//           flipButtonPosition={{ top: 410, right: 137, width: 50, height: 50 }}
//         />
//       </div>

//       {/* 2. ВЕРСИЯ ДЛЯ ТАБЛЕТОК (280x390) */}
//       {/* Показываем только на md (768px - 1024px), скрываем на десктопах (lg) */}
//       {/* <div className="hidden md:block lg:hidden"> */}
//       <div className={css.imgSmall}>
//         <CardFlipper
//           frontImage={mainCard.faces[0].images.normal}
//           backImage={mainCard.faces.length > 1 ? mainCard.faces[1].images.normal : undefined}
//           width={280}
//           height={390}
//           isFoil={mainCard.isFoil}
//           /* Координаты рассчитаны под размер 280x390 */
//           flipButtonPosition={{ top: 352, right: 117, width: 46, height: 46 }}
//         />
//       </div>
//     </>
//   )}
// </div>


//       <div className={css.cardDetails}>

//         {/* NAME */}
//         {/* <h2 className={css.title}>{mainCard.name}</h2> */}
//         {/* NAME */}
//         <h2 className={css.title}>
//         {/* Разбиваем имя на массив [Лицо, Обратная сторона] */}
//           {(() => {
//             const nameParts = mainCard.name.split(" // ");
//             return (
//               <>
//                 {/* Выводим первую часть: "Aang, Swift Savior" */}
//                 {nameParts[0]}

//                 {/* Если есть вторая часть, выводим её в специальном span */}
//                 {nameParts[1] && (
//                   <span className={css.backName}>
//                     {" // "}{nameParts[1]}
//                   </span>
//                 )}
//               </>
//             );
//           })()}
//         </h2>

//         {/* SET */}
//         <div className="flex items-center gap-2 mb-2">
//           <SetIcon
//             setCode={mainCard.set}
//             setName={mainCard.set_name}
//             />
//           <h3 className={css.set}>{mainCard.set_name} # {mainCard.collector_number}</h3>
//         </div>

//         {/* ARTIST */}
//         <div className={css.artist}><b>Artist:</b> {mainCard.artist}</div>

//         {/* LEGALITIES */}
//         <div className={css.legalities}>
//           <b>Legalities</b>
//           <ul className={css.format}>
//             {Object.entries(mainCard.legalities)
//               .filter(([format]) =>
//                 ALLOWED_FORMATS.includes(format as AllowedFormat)
//             )
//             .map(([format, status]) => (
//               <li
//               key={format}
//               className={css[legalityClasses[status]]}
//               title={status}
//               >
//                   {format.charAt(0).toUpperCase() + format.slice(1)}
//                 </li>
//               ))}
//           </ul>
//         </div>

//         {/* ВАРИАНТЫ КАРТ для десктопа */}
//         <div className={css.variantDesktop}>
//             {cards.map((card) => (    
//               <CardStockItem                
//               key={card._id.toString()}                
//               card={card}                
//               />              
//             ))}
//         </div>
//       </div>
        
//           </div>

//         {/* ВАРИАНТЫ КАРТ */}
//         <div className={css.variant}>
//             {cards.map((card) => (    
//               <CardStockItem                
//               key={card._id.toString()}                
//               card={card}                
//               />              
//             ))}
//         </div>


//     </div>
//   );
// };

// export default CardDetails;

import { DbCard } from "@/types/types";
import css from "./CardDetails.module.css";

import SetIcon from "@/components/SetIcon/SetIcon";
import CardFlipper from "@/components/CardFlipper/CardFlipper";
import CardStockItem from "@/components/cards/CardStockItem/CardStockItem";

interface CardDetailsProps {
  cards: DbCard[];
}

const legalityClasses = {
  legal: "legal",
  not_legal: "notLegal",
  banned: "banned",
  restricted: "restricted",
} as const;

const ALLOWED_FORMATS = [
  "standard",
  "pioneer",
  "modern",
  "legacy",
  "pauper",
  "vintage",
  "commander",
  "premodern",
] as const;

type AllowedFormat = typeof ALLOWED_FORMATS[number];

const CardDetails = ({ cards }: CardDetailsProps) => {
  const mainCard = cards[0];

  const nameParts = mainCard.name.split(" // ");

  return (
    <div className={css.cardDetailsContainer}>
      <div className={css.cardDetailsWrapper}>
        {/* IMAGE */}
        <div className={css.imgContainer}>
          {mainCard.faces && (
            <>
              <div className={css.imgLarge}>
                <CardFlipper
                  frontImage={mainCard.faces[0].images.normal}
                  backImage={
                    mainCard.faces.length > 1
                      ? mainCard.faces[1].images.normal
                      : undefined
                  }
                  width={325}
                  height={453}
                  isFoil={mainCard.isFoil}
                  flipButtonPosition={{
                    top: 404,
                    right: 137,
                    width: 50,
                    height: 50,
                  }}
                />
              </div>

              <div className={css.imgSmall}>
                <CardFlipper
                  frontImage={mainCard.faces[0].images.normal}
                  backImage={
                    mainCard.faces.length > 1
                      ? mainCard.faces[1].images.normal
                      : undefined
                  }
                  width={280}
                  height={390}
                  isFoil={mainCard.isFoil}
                  flipButtonPosition={{
                    top: 352,
                    right: 117,
                    width: 46,
                    height: 46,
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* DETAILS */}
        <div className={css.cardDetails}>

          {/* NAME */}
          <h2 className={css.title}>
            {nameParts[0]}
            {nameParts[1] && (
              <span className={css.backName}>
                {" // "}
                {nameParts[1]}
              </span>
            )}
          </h2>

          {/* SET */}
          <div className="flex items-center gap-2 mb-2">
            <SetIcon
              setCode={mainCard.set}
              setName={mainCard.set_name}
            />
            <h3 className={css.set}>
              {mainCard.set_name} # {mainCard.collector_number}
            </h3>
          </div>

          {/* ARTIST */}
          <div className={css.artist}>
            <b>Artist:</b> {mainCard.artist}
          </div>

          {/* LEGALITIES */}
          <div className={css.legalities}>
            <b>Legalities</b>
            <ul className={css.format}>
              {Object.entries(mainCard.legalities)
                .filter(([format]) =>
                  ALLOWED_FORMATS.includes(format as AllowedFormat)
                )
                .map(([format, status]) => (
                  <li
                    key={format}
                    className={css[legalityClasses[status]]}
                    title={status}
                  >
                    {format.charAt(0).toUpperCase() + format.slice(1)}
                  </li>
                ))}
            </ul>
          </div>

          {/* VARIANTS (DESKTOP) */}
          <div className={css.variantDesktop}>
            {cards.map((card) => (
              <CardStockItem
                key={card._id.toString()}
                card={card}
              />
            ))}
          </div>
        </div>
      </div>

      {/* VARIANTS (MOBILE) */}
      <div className={css.variant}>
        {cards.map((card) => (
          <CardStockItem
            key={card._id.toString()}
            card={card}
          />
        ))}
      </div>
    </div>
  );
};

export default CardDetails;