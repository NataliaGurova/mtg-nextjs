// // import { DbCard } from "@/types/types";
// import { CardListItem, Condition } from "@/types/cards";
// import { DbCard } from "@/types/types";

// const CONDITION_RANK: Record<Condition, number> = {
//   NM: 3,
//   LP: 2,
//   HP: 1,
// };

// export const buildCardList = (cards: DbCard[]): CardListItem[] => {
//   const grouped = new Map<string, DbCard[]>();

//   for (const card of cards) {
//     const group = grouped.get(card.scryfall_id) ?? [];
//     group.push(card);
//     grouped.set(card.scryfall_id, group);
//   }

//   const result: CardListItem[] = [];

//   grouped.forEach(group => {
//     const foilVariants = group.filter(c => c.isFoil);
//     const nonFoilVariants = group.filter(c => !c.isFoil);

//     const processGroup = (variants: DbCard[]) => {
//       if (variants.length === 0) return;

//       const best = variants.reduce((prev, current) =>
//         CONDITION_RANK[current.condition as Condition] >
//         CONDITION_RANK[prev.condition as Condition]
//           ? current
//           : prev
//       );

//       const frontFace = best.faces?.find(f => f.side === "front");
//       if (!frontFace) return;

//       result.push({
//         scryfall_id: best.scryfall_id,
//         name: best.name,
//         imageUrl: frontFace.imageUrl,
//         isFoil: best.isFoil,
//         condition: best.condition,
//         price: best.prices,
//         quantity: best.quantity,
//       });
//     };

//     processGroup(nonFoilVariants);
//     processGroup(foilVariants);
//   });

//   result.sort((a, b) => {
//     if (a.name === b.name) {
//       return Number(a.isFoil) - Number(b.isFoil);
//     }
//     return a.name.localeCompare(b.name);
//   });

//   return result;
// };

import { CardListItem, Condition } from "@/types/cards";
import { DbCard } from "@/types/types";

// Ранжирование по качеству
const CONDITION_RANK: Record<Condition, number> = {
  NM: 3,
  LP: 2,
  HP: 1,
};

/**
 * Строим список карт для отображения в CardList
 */
export const buildCardList = (cards: DbCard[]): CardListItem[] => {
  // Группируем карты по scryfall_id
  const grouped = new Map<string, DbCard[]>();
  cards.forEach(card => {
    const group = grouped.get(card.scryfall_id) ?? [];
    group.push(card);
    grouped.set(card.scryfall_id, group);
  });

  const result: CardListItem[] = [];

  grouped.forEach(group => {
    // Разделяем на foil и non-foil
    const foilVariants = group.filter(c => c.isFoil);
    const nonFoilVariants = group.filter(c => !c.isFoil);

    const processGroup = (variants: DbCard[]) => {
      if (!variants.length) return;

      // Берём карту с лучшим condition
      const best = variants.reduce((prev, curr) =>
        CONDITION_RANK[curr.condition as Condition] >
        CONDITION_RANK[prev.condition as Condition]
          ? curr
          : prev
      );

      // Ищем фронт лицевой стороны
      const frontFace = best.faces?.find(f => f.side === "front");
      if (!frontFace) return;

      result.push({
        _id: best._id,
        scryfall_id: best.scryfall_id,
        name: best.name,
        imageUrl: frontFace.imageUrl,
        isFoil: best.isFoil,
        foilType: best.foilType,
        condition: best.condition,
        prices: best.prices,
        quantity: best.quantity,
      });
    };

    // Сначала non-foil, потом foil
    processGroup(nonFoilVariants);
    processGroup(foilVariants);
  });

  // Сортируем: одинаковые имена рядом, затем по foil
  result.sort((a, b) => {
    if (a.name === b.name) return Number(a.isFoil) - Number(b.isFoil);
    return a.name.localeCompare(b.name);
  });

  return result;
};