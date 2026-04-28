// components/CardFlipper/CardFlipper.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { RotateCw } from "lucide-react";
import css from "./CardFlipper.module.css";

interface CardFlipperProps {
  frontImage: string;
  backImage?: string;
  width?: number | string;
  height?: number | string;
  isFoil?: boolean;
  flipButtonPosition?: {
    top?: number;
    right?: number;
    width?: number;
    height?: number;
  };
}


const CardFlipper = ({
  frontImage,
  backImage,
  width,
  height,
  isFoil = false,
  flipButtonPosition,
}: CardFlipperProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className={css.wrapper} 
      /* Используем строго те пиксели, которые пришли в пропсах */
      style={{ width: width, height: height }}
    >
      <div className={`${css.inner} ${flipped ? css.flipped : ""}`}>
        <div className={css.face}>
          <Image src={frontImage} alt="Front" fill className={css.img} />
          {isFoil && <div className={css.foilOverlay} />}
        </div>
        {backImage && (
          <div className={`${css.face} ${css.back}`}>
            <Image src={backImage} alt="Back" fill className={css.img} />
            {isFoil && <div className={css.foilOverlay} />}
          </div>
        )}
      </div>

      {backImage && (
        <button
          className={css.flipBtn}
          style={{
            top: flipButtonPosition?.top,
            right: flipButtonPosition?.right,
            width: flipButtonPosition?.width ?? 40,
            height: flipButtonPosition?.height ?? 40,
          }}
          onClick={() => setFlipped(!flipped)}
          title="Flip card"
        >
          <RotateCw size={18} />
        </button>
      )}
    </div>
  );
};

export default CardFlipper;