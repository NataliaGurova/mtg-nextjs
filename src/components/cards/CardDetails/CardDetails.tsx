
import { DbCard} from "@/types/types";

import css from "./CardDetails.module.css";

import Container from "@/components/Container/Container";
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
  const mainCard = cards[0]; // общая информация


  return (
    <Container className={css.cardDetailsContainer}>


      {/* IMAGE */}
      {mainCard.faces && (
        <CardFlipper
        frontImage={mainCard.faces[0].images.normal}
        
        // Если есть вторая сторона — передаем backImage и flipButtonPosition
        {...(mainCard.faces.length > 1
          ? {
            backImage: mainCard.faces[1].images.normal,
            flipButtonPosition: { top: 410, right: 138, width: 50, height: 50 },
          }
          : {})}
          
          width={325}
          height={453}
          isFoil={mainCard.isFoil}
          />
        )}


      <div className={css.cardDetails}>

        {/* NAME */}
        <h2 className={css.title}>{mainCard.name}</h2>

        {/* SET */}
        <div className="flex items-center gap-2 mb-2">
          <SetIcon
            setCode={mainCard.set}
            setName={mainCard.set_name}
            />
          <h3 className={css.set}>{mainCard.set_name}</h3>
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

        {/* ВАРИАНТЫ КАРТ */}
        <div className={css.variant}>
            {cards.map((card) => (    
              <CardStockItem                
              key={card._id.toString()}                
              card={card}                
              />              
            ))}
          

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
  
  

  
  
  
  
  
  
  {/* {cards.map((card) => {
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
          card={card}
          stock={card.quantity}
          />
          
          </div>
        )
      })} */}



      
      {/* <ImageCard
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
      /> */}
            {/* {frontImage && (
        <CardFlipper
          frontImage={frontImage}
          backImage={backImage}
          // width={325}
          // height={453}
          width={220}
          height={310}
          isFoil={card.isFoil}
          flipButtonPosition={{
            top: 274,
            right: 90,
          }}
        /> */}