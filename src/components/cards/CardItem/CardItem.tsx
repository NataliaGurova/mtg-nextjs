
import css from "./CardItem.module.css";
import { ShoppingBag } from "lucide-react";

import { DbCard } from "@/types/types";
import { Button } from "@/components/ui/button";
import ImageCard from "@/components/ImageCard/ImageCard";

interface CardItemProps {
  card: DbCard;
}

const CardItem = ({ card }: CardItemProps) => {
  
  return (
    <div className={css.itemCard}>
      <ImageCard
  name={card.name}
  faces={card.faces}
  isFoil={card.isFoil}
  width={220}
  height={310}
  flipButtonPosition={{
    top: 274,
    right: 90,
  }}
/>

      

      <h3 className={css.text} title={card.name}>
        {card.name}
      </h3>

      <div className={css.bottomSection}>
        {card.isFoil && <p className={css.foilType}>{card.foilType}</p>}
        <div className={css.info}>
          <p>{card.condition}</p>
          <p>{card.prices} грн</p>
        </div>
        <div className={css.cart}>
        
          <Button
            variant="loadMore"
            className="w-[220px]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // handleAdd();
            }}
>
Add to Cart 
            <ShoppingBag size={18} />
</Button>

        </div>
      </div>
    </div>
  );
};

export default CardItem;






// const CardItem = ({ card }) => {
  //   // console.log("set :", card.set, "set_name :", card.set_name);
  
  
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  
  //   const openModal = () => setIsModalOpen(true);
  //   const closeModal = () => setIsModalOpen(false);
  //   const hasCardFaces = Array.isArray(card.card_faces) && card.card_faces.length > 1;
  
  //   // Отримуємо URL зображення
  //   const imageUrl = card.image_uris
  //     ? card.image_uris?.normal || `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(card.name)}`
  //     : card.card_faces[0].image_uris?.normal; // Передня сторона
  
  
  //   return (
    //  <>
    //       {/* Основна картка */}
    //       <div className={css.itemCard} onClick={openModal}>
    //         <img src={imageUrl} alt={card.name} width="210" height="296" className={css.imgCard} />
    //         <b className={css.text}>{card.name}</b>
    //         <div className={css.cart}>
    //           <p>${card.prices.usd}</p>
    //           <button type="button" className={css.btnCart}><BsBasket /></button>
    //         </div>
    //       </div>
    
    //       {/* Модальне вікно */}
    //       <ModalWindow modalIsOpen={isModalOpen} onCloseModal={closeModal}>
    //         <ModalCard card={card} hasCardFaces={hasCardFaces} />
    //       </ModalWindow>
    //     </>
    //   );
    // };
    
    // export default CardItem;
    

// const frontFace = card.faces?.find((face) => face.side === "front");
    
    {/* {frontFace && (
      <Image
      src={frontFace.imageUrl}
      alt={`${card.name} front`}
      width={220}
      height={310}
      className={css.imgCard}
      />
      )} */}