// src/components/setbox/SetDetail/SetDetail.tsx
import Image from "next/image";
import css from "./SetDetail.module.css";
import SetIcon from "@/components/SetIcon/SetIcon";
import { ExternalLink, ImageIcon } from "lucide-react";
import AddToCartSection from "@/components/cards/AddToCartSection/AddToCartSection";
import WishlistButton from "@/components/WishlistButton/WishlistButton";

interface SetDetailProps {
  set: string;
  set_name: string;
  description?: string;
  prices: number;
  isFoil: boolean;
  imageUrl?: string;
  releaseDate?: string;
  mainCard?: string;
  mainSetSize?: number;
  lang?: string;
}

const SetDetail = ({
  set,
  set_name,
  description,
  prices,
  isFoil,
  imageUrl,
  releaseDate,
  mainSetSize,
  lang = "en",
}: SetDetailProps) => {
  const formattedPrice = prices.toLocaleString("uk-UA");
  const hasCustomArt = !!imageUrl;

  const formattedReleaseDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const internalAlbumUrl = `/fullsets/${set.toLowerCase()}/album?size=${mainSetSize}&name=${encodeURIComponent(set_name)}`;

  // 🔹 condition прибрано — для фулсетів не потрібно
  const cartItem = {
    id: `fullset_${set.toLowerCase()}`,
    scryfallId: "",
    name: set_name,
    set_name: set_name,
    image: imageUrl || "/sets/Chest_nonfoil11.png",
    price: prices,
    quantity: 1,
    stock: 1,
    language: lang,
    foil: isFoil ? "foil" : null,
    type: "fullset" as const,
  };

  // Кнопки винесені в окрему змінну щоб не дублювати JSX
  const cartWishlistButtons = (variant: "responsive" | "transparent") => (
    <div className={css.cartWishlist}>
      <AddToCartSection
        mode="fullset"
        fullsetItem={cartItem}
        showQuantity={false}
        buttonClassName={css.buyButton}
      />
      <WishlistButton
        cardId={cartItem.id}
        variant={variant}
      />
    </div>
  );

  return (
    <div className={css.pageContainer}>
      <div className={css.content}>

        {/* ЛІВА КОЛОНКА */}
        <section className={css.imageSection}>
          {hasCustomArt ? (
            <Image
              src={imageUrl!}
              alt={`${set_name} art`}
              className={css.artImage}
              width={536}
              height={335}
              unoptimized={imageUrl!.startsWith("https://")}
            />
          ) : (
            <div className={css.chestFallback}>
              <Image
                src="/sets/Chest_nonfoil11.png"
                alt={`${set_name} chest`}
                width={320}
                height={200}
                priority
              />
            </div>
          )}
        </section>

        {/* ПРАВА КОЛОНКА */}
        <section className={css.infoSection}>
          <div className={css.header}>
            <div className={css.titleWrapper}>
              <SetIcon setCode={set} theme="bronze" size={48} />
              <h1 className={css.title}>{set_name}</h1>
            </div>
            {isFoil && <span className={css.foil}>Foil</span>}
          </div>

          {description && (
            <p className={css.description}>{description}</p>
          )}

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

          {(releaseDate || mainSetSize) && (
            <div className={css.statsBox}>
              {releaseDate && (
                <div className={css.statRow}>
                  <span className={css.statLabel}>Дата релізу: </span>
                  <span className={css.statValue}>{formattedReleaseDate}</span>
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

          {/* Десктоп: ціна і кнопки в правій колонці */}
          <div className={css.priceCard}>
            <p className={css.price}>{formattedPrice} ₴</p>
            {cartWishlistButtons("responsive")}
          </div>
        </section>
      </div>

      {/* Планшет/мобайл: ціна і кнопки знизу */}
      <div className={css.priceCardTablet}>
        <p className={css.price}>{formattedPrice} ₴</p>
        {cartWishlistButtons("transparent")}
      </div>
    </div>
  );
};

export default SetDetail;