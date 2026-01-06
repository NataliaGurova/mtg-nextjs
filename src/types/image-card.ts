
// types/image-card.ts
import { Face } from "@/types/types";

// export interface ImageCardProps {
//   name: string;
//   faces?: Face[];
//   isFoil?: boolean;

//   width: number;
//   height: number;

//   // priority?: boolean;
//   // className?: string;

//   flipButtonPosition?: {
//     top?: number;
//     left?: number;
//     right?: number;
//     bottom?: number;
//   };
// }

export interface ImageCardProps {
  name: string;
  faces?: Face[];
  isFoil?: boolean;
  width: number;
  height: number;

  flipButtonPosition?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    width?: number;
    height?: number;
  };
}

