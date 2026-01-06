

//   {/* Інша інформація */}
//   <div className={css.cardDetails}>
//   <div className={css.nameCard}>
//     <h2>{card.name}
      
//     </h2>
//     <span title="English">{card.lang}</span>
//     {card.foil && (
//       <span className={css.foilBadge} title="Foil">✨<IoSparklesSharp size={20} /></span>
//       )}
//   </div>
// <h3 className={css.set}> {card.set_name}</h3>
// <p><b>Artist:</b> {card.artist}</p>

// <div>
//   <b>Legalities:</b>
//   <ul className={css.format}>
//     {formatsToShow.map((format) => {
//       const status = card.legalities?.[format];
//       if (!status) return null;
//       return (
//         <li
//           key={format}
//           className={css[legalityClasses[status] || "default"]}
//           title={legalityClasses[status]}
//         >
//           {format.charAt(0).toUpperCase() + format.slice(1)}
//         </li>
//       );
//     })}
//   </ul>
// </div>

// "use client";

import { DbCard, Face } from "@/types/types";
// import Image from "next/image";

import css from "./CardDetails.module.css";
import { AddToCartSection } from "../AddToCartSection/AddToCartSection";
import SetIcon from "@/components/SetIcon/SetIcon";
import Container from "@/components/Container/Container";
// import { useState } from "react";
// import { RotateCw } from "lucide-react";
import ImageCard from "@/components/ImageCard/ImageCard";



interface CardDetailsProps {
  card: DbCard;
  frontFace?: Face;
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


const CardDetails = ({ card }: CardDetailsProps) => {
  console.log(card.faces);
  // const [isFlipped, setIsFlipped] = useState(false);

  // const isDoubleFaced = card.faces && card.faces.length > 1;

  // const handleToggleCard = () => {
  //   if (isDoubleFaced) {
  //     setIsFlipped((prev) => !prev);
  //   }
  // };

  return (
    <Container className={css.cardDetailsContainer}>
      {/* IMAGE */}
      {/* <div className={css.imgContainer}>
        {frontFace && (
          <Image
            src={frontFace.imageUrl}
            alt={card.name}
            width={325}
            height={453}
            className={css.imgCard}
            priority
          />
        )}
      </div> */}

      
      {/* IMAGE */}
      <ImageCard
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
/>


      {/* INFO */}
      <div className={css.cardDetails}>        
        {card.isFoil && <p className={css.foils}>{card.foilType.charAt(0).toUpperCase() + card.foilType.slice(1)}</p>}
        <div className={css.nameCard}>
          <h2 className={css.title}>{card.name}</h2>

        </div>

{/* SET ICON */}
<div className=" flex items-center justify-start gap-2 mb-2">
  <SetIcon
    setCode={card.set}
    setName={card.set_name}
  />
        <h3 className={css.set}>{card.set_name}</h3>
</div>


          

        {/* {card.artist && (
          <p>
            <b>Artist:</b> {card.artist}
          </p>
        )} */}

        {/* LEGALITIES */}
        <div>
          <b>Legalities:</b>
          <ul className={css.format}>
            {Object.entries(card.legalities)
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

        <div className={css.priceBox}>
          
          
          {/* <p>{card.condition}</p> */}
          <p title="Language">{card.lang.toUpperCase()}</p>
          <div><strong>{card.condition}</strong><span>({card.quantity})</span></div>
          <div className={css.conditionPrice}>
        <strong className={css.price}>{card.prices} грн</strong>
          </div>
        <AddToCartSection
          cardId={card._id.toString()}
          stock={card.quantity}
          />
        </div>
      </div>
    </Container>
  );
};

export default CardDetails;


      
      {/* IMAGE */}
    //   <div className={css.imgContainer}>
    //   <div
    //     className={`${css.cardInner} ${isFlipped ? css.flipped : ""}`}
    //     onClick={handleToggleCard}
    //   >
        
          
    //     <div className={css.cardFace}>
    //       <Image
    //         src={frontFace?.imageUrl ?? ""}
    //         alt={`${card.name} front`}
    //         width={325}
    //         height={453}
    //         className={css.imgCard}
    //         priority
    //       />

          
    //       {card.isFoil && <div className={css.foilOverlay} />}
    //     </div>

      
        
    //     {isDoubleFaced && card.faces?.[1] && (
    //       <div className={`${css.cardFace} ${css.cardBack}`}>
    //         <Image
    //           src={card.faces[1].imageUrl}
    //           alt={`${card.name} back`}
    //           width={325}
    //           height={453}
    //           className={css.imgCard}
    //         />

            
    //         {card.isFoil && <div className={css.foilOverlay} />}
    //       </div>
    //     )}
    //   </div>

      
        
    //   {isDoubleFaced && (
    //     <button
    //       className={css.flipBtn}
    //       onClick={handleToggleCard}
    //       title="Flip card"
    //     >
    //       <RotateCw className={css.rotate}/>
    //     </button>
    //   )}
    // </div>
