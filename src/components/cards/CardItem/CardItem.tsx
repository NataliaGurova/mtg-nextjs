
"use client";

import css from "./CardItem.module.css";
import { ShoppingBag } from "lucide-react";
import { DbCard } from "@/types/types";
import { Button } from "@/components/ui/button";
import CardFlipper from "@/components/CardFlipper/CardFlipper";
import { useCartStore } from "@/store/cartStore";

interface CardItemProps {
  card: DbCard;
}

const CardItem = ({ card }: CardItemProps) => {
  const frontImage = card.faces?.[0]?.images?.normal || "";
  const backImage = card.faces?.[1]?.images?.normal;

  const addToCart = useCartStore((store) => store.addToCart);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: card._id.toString(),
      name: card.name,
      set_name: card.set_name,
      image: frontImage, // фронт карточки
      price: card.prices,
      quantity: 1, // можно потом сделать выбор кол-ва
      stock: card.quantity,
      condition: card.condition,
      language: card.lang,
      foil: card.foilType ?? null,
    });
  };

  return (
    <div className={css.itemCard}>
      {frontImage && (
        <CardFlipper
          frontImage={frontImage}
          backImage={backImage}
          width={220}
          height={310}
          isFoil={card.isFoil}
          flipButtonPosition={{ top: 274, right: 90 }}
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
            onClick={handleAdd} // <-- добавление в корзину
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


