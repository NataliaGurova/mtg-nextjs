import Card from "@/db/models/Card";
import { connectDB } from "@/db/db";
import { DbCard } from "@/types/types";

export const getCardsByScryfallId = async (
  scryfall_id: string
): Promise<DbCard[]> => {
  await connectDB();

  const cards = await Card.find({ scryfall_id })
    .sort({
      isFoil: 1,
      condition: -1,
      _id: 1,
    })
    .lean();

  return cards.map((card) => ({
    ...card,
    _id: card._id.toString(),
  }));
};