
export function getSetIcon(setCode: string): string {
  return `https://svgs.scryfall.io/sets/${setCode.toLowerCase()}.svg`;
}


// Использование иконок Сетов в списке карт или в сетах
// import Image from "next/image";
// import { getSetIcon } from "@/lib/getSetIcon";

// export function CardItem({ card }) {
//   return (
//     <div className="flex items-center gap-3">
//       <Image
//         src={getSetIcon(card.set)}
//         alt={card.set}
//         width={20}
//         height={20}
//       />
//       <span>{card.set_name} ({card.set.toUpperCase()})</span>
//     </div>
//   );
// }
