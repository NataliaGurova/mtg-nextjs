

export type LegalityStatus =
  | "legal"
  | "not_legal"
  | "banned"
  | "restricted";

// export type LegalitiesMap = Record<string, LegalityStatus>;
export type Condition = "NM" | "LP" | "HP";

export interface Face {
  side: "front" | "back";
  imageUrl: string;
}

export interface DbCard {
  _id: string;
  scryfall_id: string;
  name: string;
  set: string;
  set_name: string;
  variant: string;
  collector_number: string;

  faces?: Face[];
  legalities: Record<string, LegalityStatus>;
  // legalities: LegalitiesMap;

  // foilType: "nonfoil" | "foil" | "etched" | "surgefoil" | "rainbowfoil";
  foilType: string;
  isFoil: boolean;

  // condition: "NM" | "LP" | "HP";
  condition: Condition;
  prices: number;
  quantity: number;
  lang: string;

  artist?: string; 
}

