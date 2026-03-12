// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { RotateCw } from "lucide-react";
// // import { Face } from "@/types/types";
// import css from "./ImageCard.module.css";
// import { ImageCardProps } from "@/types/image-card";



// const ImageCard = ({
//   name,
//   faces,
//   isFoil = false,
//   width,
//   height,
//   flipButtonPosition,
// }: ImageCardProps) => {
//   const [flipped, setFlipped] = useState(false);

//   const front = faces?.find((f) => f.side === "front");
//   const back = faces?.find((f) => f.side === "back");

//   const isDouble = Boolean(front && back);

//   if (!front) {
//     console.warn("ImageCard: no front face", faces);
//     return null;
//   }
  
//     const handleToggleCard = () => {
//     if (isDouble) {
//       setFlipped((prev) => !prev);
//     }
//   };

//   return (
//     <div
//       className={css.wrapper}
//       style={{ width, height }}
//     >
//       <div
//         className={`${css.inner} ${flipped ? css.flipped : ""}`}
//         onClick={handleToggleCard}
//       >
//         {/* FRONT */}
//         <div className={css.face}>
//           <Image
//             src={front.imageUrl}
//             alt={`${name} front`}
//             fill
//             sizes={`${width}px`}
//             className={css.img}
//           />
//           {isFoil && <div className={css.foilOverlay} />}
//         </div>

//         {/* BACK */}
//         {isDouble && back && (
//           <div className={`${css.face} ${css.back}`}>
//             <Image
//               src={back.imageUrl}
//               alt={`${name} back`}
//               fill
//               sizes={`${width}px`}
//               className={css.img}
//             />
//             {isFoil && <div className={css.foilOverlay} />}
//           </div>
//         )}
//       </div>

//       {/* 🔥 КНОПКА */}
//       {isDouble && (
//         <button
//           className={css.flipBtn}
//           style={{
//             top: flipButtonPosition?.top,
//             right: flipButtonPosition?.right,
//             bottom: flipButtonPosition?.bottom,
//             left: flipButtonPosition?.left,
//             width: flipButtonPosition?.width ?? 40,
//             height: flipButtonPosition?.height ?? 40,
//           }}
//           // style={flipButtonPosition}
//           onClick={handleToggleCard}
//           title="Flip card"
//           // onClick={(e) => {
//           //   e.stopPropagation();
//           //   setFlipped((v) => !v);
//           // }}
//         >
//           <RotateCw size={18} />
//         </button>
//       )}
//     </div>
//   );
// };

// export default ImageCard;



// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { RotateCw } from "lucide-react";
// import css from "./ImageCard.module.css";
// import { ImageCardProps } from "@/types/image-card";
// import { Face } from "@/types/types";

// const ImageCard = ({
//   name,
//   faces,
//   isFoil = false,
//   width,
//   height,
//   flipButtonPosition,
// }: ImageCardProps) => {
//   const [flipped, setFlipped] = useState(false);

//   const front = faces?.find((f) => f.side === "front");
//   const back = faces?.find((f) => f.side === "back");

//   const isDouble = Boolean(front && back);

//   if (!front) {
//     console.warn("ImageCard: no front face", faces);
//     return null;
//   }

//   const frontImg = front.images?.normal || front.images?.small;
//   const backImg = back?.images?.normal || back?.images?.small;

//   const handleToggleCard = () => {
//     if (isDouble) {
//       setFlipped((prev) => !prev);
//     }
//   };

//   return (
//     <div className={css.wrapper} style={{ width, height }}>
//       <div
//         className={`${css.inner} ${flipped ? css.flipped : ""}`}
//         onClick={handleToggleCard}
//       >
//         {/* FRONT */}
//         <div className={css.face}>
//           <Image
//             src={frontImg}
//             alt={`${name} front`}
//             fill
//             sizes={`${width}px`}
//             className={css.img}
//           />
//           {isFoil && <div className={css.foilOverlay} />}
//         </div>

//         {/* BACK */}
//         {isDouble && back && (
//           <div className={`${css.face} ${css.back}`}>
//             <Image
//               src={backImg ?? ""}
//               alt={`${name} back`}
//               fill
//               sizes={`${width}px`}
//               className={css.img}
//             />
//             {isFoil && <div className={css.foilOverlay} />}
//           </div>
//         )}
//       </div>

//       {isDouble && (
//         <button
//           className={css.flipBtn}
//           style={{
//             top: flipButtonPosition?.top,
//             right: flipButtonPosition?.right,
//             bottom: flipButtonPosition?.bottom,
//             left: flipButtonPosition?.left,
//             width: flipButtonPosition?.width ?? 40,
//             height: flipButtonPosition?.height ?? 40,
//           }}
//           onClick={handleToggleCard}
//           title="Flip card"
//         >
//           <RotateCw size={18} />
//         </button>
//       )}
//     </div>
//   );
// };

// export default ImageCard;

"use client";

import { useState } from "react";
import Image from "next/image";
import { RotateCw } from "lucide-react";
import css from "./ImageCard.module.css";
import { ImageCardProps } from "@/types/image-card";

const ImageCard = ({
  name,
  faces,
  isFoil = false,
  width,
  height,
  flipButtonPosition,
}: ImageCardProps) => {
  const [flipped, setFlipped] = useState(false);

  const front = faces?.find((f) => f.side === "front");
  const back = faces?.find((f) => f.side === "back");

  console.log("faces from props:", faces);
if (!front || !front.images) {
  console.warn("ImageCard: invalid faces", faces);
  return null;
}

const frontImg = front.images.normal || front.images.small;
  const backImg = back?.images?.normal || back?.images?.small;
  
  if (!frontImg) {
    console.warn("ImageCard: missing front image", front);
    return null;
  }

  const isDouble = Boolean(front && back);

  const handleToggleCard = () => {
    if (isDouble) setFlipped((prev) => !prev);
  };

  return (
    <div className={css.wrapper} style={{ width, height }}>
      <div
        className={`${css.inner} ${flipped ? css.flipped : ""}`}
        onClick={handleToggleCard}
      >
        {/* FRONT */}
        <div className={css.face}>
          <Image
            src={frontImg}
            alt={`${name} front`}
            // fill
            sizes={`${width}px`}
            className={css.img}
          />
          {isFoil && <div className={css.foilOverlay} />}
        </div>

        {/* BACK */}
        {/* {isDouble && back && backImg && ( */}
        {isDouble && backImg && (
          <div className={`${css.face} ${css.back}`}>
            <Image
              src={backImg}
              alt={`${name} back`}
              // fill
              sizes={`${width}px`}
              className={css.img}
            />
            {isFoil && <div className={css.foilOverlay} />}
          </div>
        )}
      </div>

      {isDouble && (
        <button
          className={css.flipBtn}
          style={{
            top: flipButtonPosition?.top,
            right: flipButtonPosition?.right,
            bottom: flipButtonPosition?.bottom,
            left: flipButtonPosition?.left,
            width: flipButtonPosition?.width ?? 40,
            height: flipButtonPosition?.height ?? 40,
          }}
          onClick={handleToggleCard}
          title="Flip card"
        >
          <RotateCw size={18} />
        </button>
      )}
    </div>
  );
};

export default ImageCard;

