// import { Face } from "./types";
export interface Face {
  side: "front" | "back";
  images: {
    small: string;
    normal: string;
  };
}

export type Condition = "NM" | "LP" | "HP";

export interface CardListItem {
  _id: string;
  scryfall_id: string;
  name: string;
  set: string;
  faces?: Face[];
  image: string;
  isFoil: boolean;
  foilType: string;
  condition: Condition;
  prices: number;
  quantity: number;
  set_name: string;
  collector_number: string;
  legalities?: Record<string, string>;
}
