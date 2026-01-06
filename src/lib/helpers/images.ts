import { DbCard } from "@/types/types";

const getSmallImageUrl = (url?: string | null): string => {
  if (!url) return "";
  if (url.includes("/normal/")) return url.replace("/normal/", "/small/");
  if (url.includes("/large/")) return url.replace("/large/", "/small/");
  return url;
};

export default getSmallImageUrl;

export const getFrontImageUrl = (card: DbCard): string | null =>
  card.faces?.find((f) => f.side === "front")?.imageUrl ?? null;
