// src/components/setbox/SetAlbum/CardSlot/CardSlot.tsx

"use client";

import Image from "next/image";
import css from "./CardSlot.module.css";

interface CardSlotProps {
  setCode: string;
  cardNumber: number;
}

const CardSlot = ({
  setCode,
  cardNumber,
}: CardSlotProps) => {
  const scryfallImgUrl = `https://api.scryfall.com/cards/${setCode.toLowerCase()}/${cardNumber}?format=image&version=normal`;

  return (
    // <div className={css.cardSlotWrapper}>
    
    <div className={css.cardSlot}>
      <Image
        src={scryfallImgUrl}
        alt={`Card #${cardNumber}`}
        className={css.cardImage}
        // width={223} 
        // height={310}
        width={195} 
        height={272}
        loading="lazy"
      />

    </div>
    // </div>
  );
};

export default CardSlot;


// import css from "../AlbumPage.module.css";

// interface CardSlotProps {
//   setCode: string;
//   cardNumber: number;
// }

// export const CardSlot = ({ setCode, cardNumber }: CardSlotProps) => {
//   const scryfallImgUrl = `https://api.scryfall.com/cards/${setCode.toLowerCase()}/${cardNumber}?format=image&version=normal`;

//   return (
//     <div className={css.cardSlot}>
//       <Image
//         src={scryfallImgUrl}
//         alt={`Card #${cardNumber}`}
//         className={css.cardImage}
//         width={223} 
//         height={310}
//         loading="lazy"
//       />
//       <div className={css.cardBadge}>#{cardNumber}</div>
//     </div>
//   );
// };