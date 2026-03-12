
import css from "./CardItem.module.css";
import { ShoppingBag } from "lucide-react";

import { DbCard } from "@/types/types";
import { Button } from "@/components/ui/button";
import CardFlipper from "@/components/CardFlipper/CardFlipper";

interface CardItemProps {
  card: DbCard;
}

const CardItem = ({ card }: CardItemProps) => {
  const frontImage = card.faces?.[0]?.images?.normal || "";
  const backImage = card.faces?.[1]?.images?.normal; // если есть back


  
  return (
    <div className={css.itemCard}>

      {/* <ImageCard
  name={card.name}
  faces={card.faces}
  isFoil={card.isFoil}
  width={220}
  height={310}
  flipButtonPosition={{
    top: 274,
    right: 90,
  }}
/> */}

      {/* ✅ Вставляем флипер */}
      {frontImage && (
        <CardFlipper
          frontImage={frontImage}
          backImage={backImage}
          width={220}
          height={310}
          isFoil={card.isFoil}
          flipButtonPosition={{
            top: 274,
            right: 90,
          }}
        />
      )}

      <h3 className={css.text} title={card.name}>
        {card.name}
      </h3>

      <div className={css.bottomSection}>
        {card.isFoil && <p className={css.foilType}>{card.foilType}</p>}
        <div className={css.info}>
          <p>{card.condition}</p>
          <p>{card.prices} ₴</p>
        </div>

        <div className={css.cart}>        
          <Button
            variant="loadMore"
            className="w-[220px]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
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


