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
    bottom?: number;
    left?: number;
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
  const hasBack = Boolean(backImage);

  const handleFlip = () => {
    if (hasBack) setFlipped((prev) => !prev);
  };

  return (
    <div className={css.wrapper} style={{ width, height }}>
      <div className={`${css.inner} ${flipped ? css.flipped : ""}`}>
        {/* FRONT */}
        <div className={css.face}>
          <Image src={frontImage} alt="Front" fill className={css.img} />
          {isFoil && <div className={css.foilOverlay} />}
        </div>

        {/* BACK */}
        {hasBack && (
          <div className={`${css.face} ${css.back}`}>
            <Image src={backImage!} alt="Back" fill className={css.img} />
            {isFoil && <div className={css.foilOverlay} />}
          </div>
        )}
      </div>

      {/* FLIP BUTTON */}
      {hasBack && (
        <button
          className={css.flipBtn}
          style={{
            top: flipButtonPosition?.top,
            right: flipButtonPosition?.right,
            // bottom: flipButtonPosition?.bottom ?? 12,
            bottom: flipButtonPosition?.bottom,
            left: flipButtonPosition?.left,
            width: flipButtonPosition?.width ?? 40,
            height: flipButtonPosition?.height ?? 40,
          }}
          onClick={handleFlip}
          title="Flip card"
        >
          {/* <RotateCw size={24} /> */}
          <RotateCw size={18} />
        </button>
      )}
    </div>
  );
};

export default CardFlipper;