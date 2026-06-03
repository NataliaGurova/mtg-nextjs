// // src/components/home/RecentFinds/RecentFinds.tsx
        
import Link from "next/link";
import { connectDB } from "@/db/db";
import Card from "@/db/models/Card";
import { DbCard, Face } from "@/types/types";
import css from "./RecentFinds.module.css";
import { ArrowRight } from "lucide-react";
import CardFlipper from "@/components/CardFlipper/CardFlipper";

async function getRecentCards(): Promise<DbCard[]> {
  try {
    await connectDB();

    const docs = await Card.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .lean<DbCard[]>();

    return docs.map((doc: DbCard) => ({
      ...doc,
      _id: doc._id.toString(),
      set: doc.set?.toString(),
      faces: doc.faces?.map((face: Face) => ({
        side: face.side,
        images: {
          small: face.images?.small,
          normal: face.images?.normal,
        },
      })),
    }));
  } catch (err) {
    console.error("getRecentCards error:", err);
    return [];
  }
}

export default async function RecentFinds() {
  const cards = await getRecentCards();

  return (
    <section className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>Останні знахідки</h2>
        <Link href="/singles" className={css.arrowLink}>
          Переглянути всі <ArrowRight size={18} />
        </Link>
      </div>

      {cards.length === 0 ? (
        <p className={css.empty}>Карток поки немає</p>
      ) : (
        <div className={css.grid}>
          {cards.map((card) => {
            // Достаем картинки для лицевой и задней стороны
            const frontImage = card.faces?.[0]?.images?.normal ?? card.faces?.[0]?.images?.small;
            const backImage = card.faces?.[1]?.images?.normal ?? card.faces?.[1]?.images?.small;

            return (
              <Link
                key={card.scryfall_id}
                href={`/singles/${card.scryfall_id}`}
                className={css.card}
              >
                <div className={css.imageWrapper}>
                  {frontImage ? (
                    <CardFlipper
                      frontImage={frontImage}
                      backImage={backImage}
                      width={220}
                      height={310}
                      isFoil={card.isFoil}
                      flipButtonPosition={{ top: 274, right: 90 }}
                    />
                  ) : (
                    <div className={css.noImage}>No image</div>
                  )}
                </div>

                <div className={css.info}>
                  <p className={css.name}>{card.name}</p>
                  <div className={css.setFoil}>
                    {/* Используем span вместо p для строчных элементов */}
                    <span className={css.set}>
                      {card.set}
                    </span>
                    {card.isFoil && (
                      <span className={css.foil}>foil</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}