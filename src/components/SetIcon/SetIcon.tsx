
// "use client";

// import Image from "next/image";
// import { useState } from "react";

// interface SetIconProps {
//   setCode: string;     // "mh3", "war"
//   setName?: string;   // "Modern Horizons 3"
//   size?: number;
// }

// const SetIcon = ({
//   setCode,
//   setName,
//   size = 20,
// }: SetIconProps) => {
//   const [error, setError] = useState(false);

//   if (error) {
//     return (
//       <span
//         title={setName}
//         className="text-xs font-semibold text-gray-600 uppercase"
//         style={{ lineHeight: 1 }}
//       >
//         {setCode}
//       </span>
//     );
//   }

//   return (
//     <Image
//       src={`https://svgs.scryfall.io/sets/${setCode.toLowerCase()}.svg`}
//       alt={`${setName ?? setCode} icon`}
//       width={size}
//       height={size}
//       className="opacity-80 transition group-hover:opacity-100"
//       onError={() => setError(true)}
//     />
//   );
// };

// export default SetIcon;




// //  с изменением цвета иконки

// "use client";

// import Image from "next/image";
// import { useState } from "react";

// interface SetIconProps {
//   setCode: string;
//   setName?: string;
//   size?: number;
// }

// const SetIcon = ({
//   setCode,
//   setName,
//   size = 20,
// }: SetIconProps) => {
//   const [error, setError] = useState(false);

//   if (error) {
//     return (
//       <span
//         title={setName}
//         className="text-xs font-semibold uppercase"
//         style={{ color: "rgb(29, 81, 5)", lineHeight: 1 }}
//       >
//         {setCode}
//       </span>
//     );
//   }

//   return (
//     <Image
//       src={`https://svgs.scryfall.io/sets/${setCode.toLowerCase()}.svg`}
//       alt={`${setName ?? setCode} icon`}
//       width={size}
//       height={size}
//       onError={() => setError(true)}
//       className="transition"
//       style={{
//         filter:
//           "invert(24%) sepia(52%) saturate(743%) hue-rotate(73deg) brightness(90%) contrast(95%)",
//       }}
//     />
//   );
// };

// export default SetIcon;


// "use client";

// import Image from "next/image";
// import { useState } from "react";

// interface SetIconProps {
//   setCode: string;
//   setName?: string;
//   size?: number;
// }

// const SetIcon = ({
//   setCode,
//   setName,
//   size = 20,
// }: SetIconProps) => {
//   const [error, setError] = useState(false);

//   // 1. Очищаем код от возможных случайных пробелов и переносов строк из БД
//   const cleanCode = setCode?.trim().toLowerCase() || "default";

//   if (error) {
//     return (
//       <span
//         title={setName}
//         className="text-xs font-semibold uppercase"
//         style={{ color: "rgb(29, 81, 5)", lineHeight: 1 }}
//       >
//         {/* Здесь тоже выводим чистый код */}
//         {setCode?.trim()}
//       </span>
//     );
//   }

//   return (
//     <Image
//       // 2. Используем очищенный cleanCode
//       src={`https://svgs.scryfall.io/sets/${cleanCode}.svg`}
//       alt={`${setName ?? cleanCode} icon`}
//       width={size}
//       height={size}
//       onError={() => setError(true)}
//       className="transition"
//       style={{
//         filter:
//           "invert(24%) sepia(52%) saturate(743%) hue-rotate(73deg) brightness(90%) contrast(95%)",
//       }}
//     />
//   );
// };

// export default SetIcon;

"use client";

import Image from "next/image";
import { useState } from "react";

interface SetIconProps {
  setCode: string;
  setName?: string;
  iconSvgUrl?: string | null;
  size?: number;
  applyThemeColor?: boolean; // 🔹 Новый пропс: красить иконку или нет?
}

const SetIcon = ({
  setCode,
  setName,
  iconSvgUrl,
  size = 20,
  applyThemeColor = false, // 🔹 По умолчанию выключено (иконка будет черной)
}: SetIconProps) => {
  const [error, setError] = useState(false);

  const cleanCode = setCode?.trim().toLowerCase() || "default";
  const imageSrc = iconSvgUrl || `https://svgs.scryfall.io/sets/${cleanCode}.svg`;

  if (error) {
    return (
      <span
        title={setName}
        className="text-xs font-semibold uppercase"
        style={{ color: applyThemeColor ? "rgb(29, 81, 5)" : "inherit", lineHeight: 1 }}
      >
        {setCode?.trim()}
      </span>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={`${setName ?? cleanCode} icon`}
      width={size}
      height={size}
      onError={() => setError(true)}
      className="transition"
      // 🔹 Применяем CSS-фильтр только если applyThemeColor === true
      style={
        applyThemeColor
          ? {
              filter:
                "invert(24%) sepia(52%) saturate(743%) hue-rotate(73deg) brightness(90%) contrast(95%)",
            }
          : {}
      }
    />
  );
};

export default SetIcon;