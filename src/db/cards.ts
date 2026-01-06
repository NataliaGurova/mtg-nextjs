

// export const getAllCards = async () => {
  //   await connectDB();
  //   const cards = await Card.find().lean();
  //   return JSON.parse(JSON.stringify(cards)); // важный фикс для RSC
  // };
  
  
  // db/cards.ts

import { DbCard } from "@/types/types";
import { connectDB } from "./db";
import Card from "./models/Card";
import { Types } from "mongoose";



const PAGE_SIZE = 20;

export const getCardsPage = async (cursor?: string) => {
  await connectDB();

  const query = cursor
    ? { _id: { $lt: new Types.ObjectId(cursor) } }
    : {};

  const cards = await Card.find(query)
    .sort({ _id: -1 })
    .limit(PAGE_SIZE + 1)
    .lean();

  const hasMore = cards.length > PAGE_SIZE;
  const items = hasMore ? cards.slice(0, PAGE_SIZE) : cards;

  const nextCursor = hasMore
    ? String(items[items.length - 1]._id)
    : null;

  return {
    items: JSON.parse(JSON.stringify(items)),
    nextCursor,
  };
};




export const getCardById = async (
  id: string
): Promise<DbCard | null> => {
  if (!Types.ObjectId.isValid(id)) return null;

  await connectDB();

  const card = await Card.findById(id).lean<DbCard>();

  return card;
};


