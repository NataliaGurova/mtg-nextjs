import { Face } from "./types";

export type Condition = "NM" | "LP" | "HP";

export interface CardListItem {
  _id: string;
  scryfall_id: string;
  name: string;
  faces?: Face[];
  imageUrl: string;
  isFoil: boolean;
  foilType: string;
  condition: Condition;
  prices: number;
  quantity: number;
}
