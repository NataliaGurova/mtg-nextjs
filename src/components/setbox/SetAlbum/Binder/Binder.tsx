// src/components/setbox/SetAlbum/Binder/Binder.tsx

// "use client";

// import React, { forwardRef } from "react";
// import CardSlot from "../CardSlot/CardSlot";
// import css from "./Binder.module.css";

// interface CardData {
//   setCode: string;
//   cardNumber: number;
// }

// interface BinderPageProps {
//   cards: CardData[];
// }

// const Binder = forwardRef<HTMLDivElement, BinderPageProps>(
//   ({ cards }, ref) => {

    
//     return (
//         <div className={css.pageContent} ref={ref} data-density="hard">
//           <div className={css.cardGrid} >
//             {/* Рендерим 6 слотов. Если карты нет, рендерим пустой слот для поддержания сетки */}
//             {Array.from({ length: 6 }).map((_, index) => {
//               const card = cards[index];
//               return card ? (
//                 <CardSlot 
//                   key={`${card.setCode}-${card.cardNumber}-${index}`} 
//                   setCode={card.setCode} 
//                   cardNumber={card.cardNumber} 
//                 />
//               ) : (
//                 <div key={`empty-${index}`} className={css.emptySlot} />
//               );
//             })}
//           </div>
//         </div>
//     );
//   }
// );

// Binder.displayName = "BinderPage";
// export default Binder;




// // src/components/setbox/SetAlbum/Binder/Binder.tsx

// "use client";

// import React, { forwardRef } from "react";
// import CardSlot from "../CardSlot/CardSlot";
// import css from "./Binder.module.css";

// interface CardData {
//   setCode: string;
//   cardNumber: number;
// }

// interface BinderPageProps {
//   cards: CardData[];
// }

// const Binder = forwardRef<HTMLDivElement, BinderPageProps>(
//   ({ cards }, ref) => {
    
//     return (
//       <div className={css.pageContainer} ref={ref} data-density="hard">
//         <div className={css.cardGrid}>
//           {Array.from({ length: 6 }).map((_, index) => {
//             const card = cards[index];
//             return card ? (
//               <CardSlot 
//                 key={`${card.setCode}-${card.cardNumber}-${index}`} 
//                 setCode={card.setCode} 
//                 cardNumber={card.cardNumber} 
//               />
//             ) : (
//               <div key={`empty-${index}`} className={css.emptySlot} />
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// );

// Binder.displayName = "Binder";
// export default Binder;


"use client";

import React, { forwardRef } from "react";
import CardSlot from "../CardSlot/CardSlot";
import css from "./Binder.module.css";

interface CardData {
  setCode: string;
  cardNumber: number;
}

interface BinderPageProps {
  cards: CardData[];
  pageIndex: number; // 🔹 Добавляем индекс страницы
}

const Binder = forwardRef<HTMLDivElement, BinderPageProps>(
  ({ cards, pageIndex }, ref) => {
    
    // 🔹 Определяем сторону: четные (0, 2, 4) — левая, нечетные (1, 3, 5) — правая
    const isLeftPage = pageIndex % 2 === 0;
    
    // 🔹 Комбинируем базовый класс и класс стороны
    const containerClasses = `${css.pageContainer} ${isLeftPage ? css.leftSide : css.rightSide}`;

    return (
      <div className={containerClasses} ref={ref} data-density="hard">
        <div className={css.cardGrid}>
          {Array.from({ length: 6 }).map((_, index) => {
            const card = cards[index];
            return card ? (
              <CardSlot 
                key={`${card.setCode}-${card.cardNumber}-${index}`} 
                setCode={card.setCode} 
                cardNumber={card.cardNumber} 
              />
            ) : (
              <div key={`empty-${index}`} className={css.emptySlot} />
            );
          })}
        </div>
      </div>
    );
  }
);

Binder.displayName = "Binder";
export default Binder;