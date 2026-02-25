// "use client";

// import { useState } from "react";
// // import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import Image from "next/image";
// import css from "./CardColor.module.css";

// const colors = [
//   { name: "W", title: "White", src: "/color/Mana_W.webp" },
//   { name: "U", title: "Blue", src: "/color/Mana_U.webp" },
//   { name: "B", title: "Black", src: "/color/Mana_B.webp" },
//   { name: "R", title: "Red", src: "/color/Mana_R.webp" },
//   { name: "G", title: "Green", src: "/color/Mana_G.webp" },
//   { name: "colorless", title: "Colorless", src: "/color/colorless.svg", isColorless: true },
// ];

// interface Props {
//   selectedColors: string[];
//   onToggleColor: (color: string) => void;
// }

// const CardColor = ({ selectedColors, onToggleColor }: Props) => {
//   const [isVisible, setIsVisible] = useState(false);

//   const handleToggle = () => setIsVisible(!isVisible);

//   return (
//     <div className={css.container}>
//       <button className={css.titleBtn} type="button" onClick={handleToggle}>
//         <b className={css.title}>Card Color</b>
//         {isVisible ? <ChevronUp /> : <ChevronDown />}
//       </button>

//       {isVisible && (
//         <div className={css.checkboxColor}>
//           {colors.map((color) => (
//             <label key={color.name} className={css.labelColor}>
//               <input type="checkbox" className={css.checkbox} name={color.name} />
//               <span className={css.customCheckbox} aria-hidden="true">
//                 <svg
//                   className={css.check}
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M20 6L9 17l-5-5"
//                     stroke="white"
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </span>

//               <div className={css.imgColorless}>
//                   <Image
//                     src={color.src}
//                     alt={color.title}
//                     width={21}
//                     height={21}
//                   />
//                 </div>

//             </label>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardColor;

"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import css from "./CardColor.module.css";
import { Color } from "@/types/types";

// type ColorName = "W" | "U" | "B" | "R" | "G" | "colorless";

const colors: { name: Color; title: string; src: string; isColorless?: boolean }[] = [
  { name: "W", title: "White", src: "/color/Mana_W.webp" },
  { name: "U", title: "Blue", src: "/color/Mana_U.webp" },
  { name: "B", title: "Black", src: "/color/Mana_B.webp" },
  { name: "R", title: "Red", src: "/color/Mana_R.webp" },
  { name: "G", title: "Green", src: "/color/Mana_G.webp" },
  { name: "Colorless", title: "Colorless", src: "/color/colorless.svg", isColorless: true },
];

interface Props {
  selectedColors: Color[];
  onToggleColor: (color: Color) => void;
}

const CardColor = ({ selectedColors, onToggleColor }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => setIsVisible(!isVisible);

  return (
    <div className={css.container}>
      <button className={css.titleBtn} type="button" onClick={handleToggle}>
        <b className={css.title}>Card Color</b>
        {isVisible ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isVisible && (
        <div className={css.checkboxColor}>
          {colors.map((color) => (
            <label key={color.name} className={css.labelColor}>
              <input
                type="checkbox"
                className={css.checkbox}
                name={color.name}
                checked={selectedColors.includes(color.name)}
                onChange={() => onToggleColor(color.name)}
              />
              <span className={css.customCheckbox} aria-hidden="true">
                <svg
                  className={css.check}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <div className={css.imgColorless}>
                <Image src={color.src} alt={color.title} width={21} height={21} />
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardColor;