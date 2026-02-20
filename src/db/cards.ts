

// export const getAllCards = async () => {
  //   await connectDB();
  //   const cards = await Card.find().lean();
  //   return JSON.parse(JSON.stringify(cards)); // важный фикс для RSC
  // };
  
  
  // db/cards.ts
// ------------1----------------------------
// import { DbCard } from "@/types/types";
// import { connectDB } from "./db";
// import Card from "./models/Card";
// import { Types } from "mongoose";



// const PAGE_SIZE = 20;

// export const getCardsPage = async (cursor?: string) => {
//   await connectDB();

//   const query = cursor
//     ? { _id: { $lt: new Types.ObjectId(cursor) } }
//     : {};

//   const cards = await Card.find(query)
//     .sort({ _id: -1 })
//     .limit(PAGE_SIZE + 1)
//     .lean();

//   const hasMore = cards.length > PAGE_SIZE;
//   const items = hasMore ? cards.slice(0, PAGE_SIZE) : cards;

//   const nextCursor = hasMore
//     ? String(items[items.length - 1]._id)
//     : null;

//   return {
//     items: JSON.parse(JSON.stringify(items)),
//     nextCursor,
//   };
// };




// export const getCardsByScryfallId = async (
//   scryfall_id: string
// ): Promise<DbCard[]> => {
//   await connectDB();
  
//   const cards = await Card.find({ scryfall_id: scryfall_id })
//   .lean<DbCard[]>();
  
//   return cards.map(card => ({
//     ...card,
//     _id: card._id.toString(),
//   }));
// };
// ------------конец--------------------


// export const getCardById = async (
//   id: string
// ): Promise<DbCard | null> => {
//   if (!Types.ObjectId.isValid(id)) return null;

//   await connectDB();

//   const card = await Card.findById(id).lean<DbCard>();

//   return card;
// };

import { Types } from "mongoose";
import Card from "./models/Card";
import { connectDB } from "./db";
import { DbCard } from "@/types/types";

const PAGE_SIZE = 20;

// Пагинация
export const getCardsPaginated = async (
  cursor?: string
): Promise<{ items: DbCard[]; nextCursor: string | null }> => {
  await connectDB();

  const query = cursor ? { _id: { $lt: new Types.ObjectId(cursor) } } : {};

  const cards = await Card.find(query)
    .sort({ _id: -1 })
    .limit(PAGE_SIZE + 1)
    .lean();

  const hasMore = cards.length > PAGE_SIZE;
  const itemsRaw = hasMore ? cards.slice(0, PAGE_SIZE) : cards;

  const items: DbCard[] = itemsRaw.map(card => ({
    ...card,
    _id: card._id.toString(),
  }));

  const nextCursor = hasMore ? items[items.length - 1]._id : null;

  return { items, nextCursor };
};

// По scryfall_id
export const getCardsByScryfallId = async (
  scryfall_id: string
): Promise<DbCard[]> => {
  await connectDB();

  const cards = await Card.find({ scryfall_id }).lean();

  return cards.map(card => ({
    ...card,
    _id: card._id.toString(),
  }));
};