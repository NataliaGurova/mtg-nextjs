

import Image from "next/image";
import css from "./SetItem.module.css";
import SetIcon from "@/components/SetIcon/SetIcon";
import AddToCartSection from "@/components/cards/AddToCartSection/AddToCartSection";
import WishlistButton from "@/components/WishlistButton/WishlistButton";

interface SetItemProps {
  setCode: string;
  setName: string;
  isFoil: boolean;
  price: number;
  imageUrl?: string; // 🔹 реальне фото сету з JSON
  lang?: string;     // 🔹 мова з JSON
}

const SetItem = ({ setCode, setName, isFoil, price, imageUrl, lang = "en" }: SetItemProps) => {
  const formattedPrice = price.toLocaleString("uk-UA");

  const cartItem = {
    id: `fullset_${setCode.toLowerCase()}`,
    scryfallId: "",
    name: setName,
    set_name: setName,
    // 🔹 Якщо є реальне фото — використовуємо його, інакше сундук
    image: imageUrl || (isFoil ? "/sets/Chest_foil11.png" : "/sets/Chest_nonfoil11.png"),
    price,
    quantity: 1,
    stock: 1,
    language: lang,
    foil: isFoil ? "foil" : null,
    type: "fullset" as const,
  };

  // Зображення для самої картки SetItem (сундук залишається)
  const chestSrc = isFoil ? "/sets/Chest_foil11.png" : "/sets/Chest_nonfoil11.png";

  return (
    <div className={css.wrapper}>

      {/* ВЕРХНЯ ЧАСТИНА: Сундук з табличкою */}
      <div className={css.chestContainer}>
        <Image
          src={chestSrc}
          alt={`${setName} chest`}
          width={320}
          height={200}
          priority
        />

        <div className={css.iconWrapper}>
          <SetIcon setCode={setCode} theme="bronze" size={36} />
        </div>

        <div className={css.textWrapper}>
          <p className={css.setText}>
            {setCode.toUpperCase()}
          </p>
        </div>
      </div>

      {/* НИЖНЯ ЧАСТИНА: Назва і Ціна */}
      <div className={css.infoContainer}>
        <h2 className={css.title}>{setName}</h2>
        <div className={css.foilPrice}>
          {isFoil && <span className={css.foil}>Foil</span>}
          <p className={css.price}>{formattedPrice} ₴</p>
        </div>

        {/* КНОПКИ */}
        <div className={css.cartWishlist}>
          <AddToCartSection
            mode="fullset"
            fullsetItem={cartItem}
            showQuantity={false}
            buttonVariant="loadMore"
            buttonClassName={css.buyButton}
          />
          <WishlistButton
            cardId={cartItem.id}
            variant="responsive"
          />
        </div>
      </div>

    </div>
  );
};

export default SetItem;