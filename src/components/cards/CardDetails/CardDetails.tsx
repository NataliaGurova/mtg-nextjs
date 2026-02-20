

import { DbCard} from "@/types/types";


import css from "./CardDetails.module.css";
import { AddToCartSection } from "../AddToCartSection/AddToCartSection";
import SetIcon from "@/components/SetIcon/SetIcon";

import ImageCard from "@/components/ImageCard/ImageCard";
import Container from "@/components/Container/Container";



// interface CardDetailsProps {
//   card: DbCard;
//   frontFace?: Face;
// }
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


// const CardDetails = ({ card }: CardDetailsProps) => {
//   console.log(card.faces);

//   return (
//     <Container className={css.cardDetailsContainer}>

      
//       {/* IMAGE */}
//       <ImageCard
//         name={card.name}
//         faces={card.faces}
//         isFoil={card.isFoil}
//         width={325}
//         height={453}
//         flipButtonPosition={{
//           top: 410,
//           right: 138,
//           width: 50,
//           height: 50,
//         }}
// />


//       {/* INFO */}
//       <div className={css.cardDetails}>
//         {/* {card.isFoil &&
//           <p className={css.foils}>
//             {card.foilType.charAt(0).toUpperCase() + card.foilType.slice(1)}
//           </p>
//         } */}
//         {card.isFoil && card.foilType && (
//           <p className={css.foils}>
//             {card.foilType}
//           </p>
//         )}
//         <div className={css.nameCard}>
//           <h2 className={css.title}>{card.name}</h2>

//         </div>

// {/* SET ICON */}
// <div className=" flex items-center justify-start gap-2 mb-2">
//   <SetIcon
//     setCode={card.set}
//     setName={card.set_name}
//   />
//         <h3 className={css.set}>{card.set_name}</h3>
// </div>

//         {/* LEGALITIES */}
//         <div>
//           <b>Legalities:</b>
//           <ul className={css.format}>
//             {Object.entries(card.legalities)
//               .filter(([format]) =>
//               ALLOWED_FORMATS.includes(format as AllowedFormat)
//             )
//             .map(([format, status]) => (
//                 <li
//                   key={format}
//                   className={css[legalityClasses[status]]}
//                   title={status}
//                   >
//                   {format.charAt(0).toUpperCase() + format.slice(1)}
//                 </li>
//               ))}

//           </ul>
//         </div>

//         <div className={css.priceBox}>
          
          
//           {/* <p>{card.condition}</p> */}
//           <p title="Language">{card.lang.toUpperCase()}</p>
//           <div><strong>{card.condition}</strong><span>({card.quantity})</span></div>
//           <div className={css.conditionPrice}>
//         <strong className={css.price}>{card.prices} грн</strong>
//           </div>
//         <AddToCartSection
//           cardId={card._id.toString()}
//           stock={card.quantity}
//           />
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default CardDetails;



const CardDetails = ({ cards }: CardDetailsProps) => {
  const mainCard = cards[0]; // общая информация

  // const frontFace = mainCard.faces?.find(
  //   (face) => face.side === "front"
  // );

  return (
    <Container className={css.cardDetailsContainer}>

      {/* IMAGE — 1 раз */}
      <ImageCard
        name={mainCard.name}
        faces={mainCard.faces}
        isFoil={false}
        width={325}
        height={453}
        flipButtonPosition={{
          top: 410,
          right: 138,
          width: 50,
          height: 50,
        }}
      />


    {/* IMAGE */}
      {/* <ImageCard
        name={card.name}
        faces={card.faces}
        isFoil={card.isFoil}
        width={325}
        height={453}
        flipButtonPosition={{
          top: 410,
          right: 138,
          width: 50,
          height: 50,
        }}
/> */}

      <div className={css.cardDetails}>

        {/* NAME — 1 раз */}
        <h2 className={css.title}>{mainCard.name}</h2>

        {/* SET — 1 раз */}
        <div className="flex items-center gap-2 mb-2">
          <SetIcon
            setCode={mainCard.set}
            setName={mainCard.set_name}
          />
          <h3 className={css.set}>{mainCard.set_name}</h3>
        </div>

        {/* LEGALITIES — 1 раз */}
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

        {/* ВАРИАНТЫ КАРТ */}
        <div className={css.variant}>

          {/* {cards.map((card) => ( */}
          {cards.map((card) => {
            const cardId = card._id.toString(); // гарантируем string

            return (
              <div key={cardId} className={css.priceBox}>
              
                <p title="Language">
                  {card.lang.toUpperCase()}
                </p>

                {card.isFoil && card.foilType ? (
                  <div className={css.foils}>
                    {card.foilType}
                  </div>
                ) :
                  <div className={css.nonfoils}>
                  </div>}
                  

                <div>
                  <strong>{card.condition}</strong>
                  <span> ({card.quantity})</span>
                </div>


                <strong className={css.price}>
                  {card.prices} ₴
                </strong>

                <AddToCartSection
                  cardId={card._id}
                  stock={card.quantity}
                />

              </div>
            )
          })}
        </div>
      </div>
    </Container>
  );
};

export default CardDetails;



{/* {card.isFoil && card.foilType && (
  <span className={css.foils}>
  {card.foilType}
  </span>
)} */}

{/* <strong className={css.price}>
  {card.prices ? (
    <>
      <span className={css.newPrice}>
        124 ₴
      </span>
      <span className={css.oldPrice}>
        {card.prices} ₴
      </span>
    </>
  ) : (
    <span>{card.prices} ₴</span>
  )}
</strong> */}