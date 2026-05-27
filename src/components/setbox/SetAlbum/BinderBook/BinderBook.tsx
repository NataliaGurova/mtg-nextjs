// src/components/setbox/SetAlbum/BinderBook/BinderBook.tsx

// "use client";

// import React, { useState } from "react";
// import HTMLFlipBook from "react-pageflip";
// import BinderSpine from "../BinderSpine/BinderSpine";
// import css from "./BinderBook.module.css";
// import Binder from "../Binder/Binder";

// // Пример типизации входных данных (все карты сета)
// interface BinderBookProps {
//   allCards: { setCode: string; cardNumber: number }[];
// }

// const BinderBook = ({ allCards }: BinderBookProps) => {

//   // Разбиваем карты на массивы по 6 штук для каждой страницы
//   const chunkedCards = [];
//   for (let i = 0; i < allCards.length; i += 6) {
//     chunkedCards.push(allCards.slice(i, i + 6));
//   }

//   // Если нужно четное количество страниц для корректного разворота (опционально)
//   if (chunkedCards.length % 2 !== 0) {
//     chunkedCards.push([]);
//   }

//   return (
    
//       <div className={css.albumContainer}>
//         <BinderSpine />

//         <HTMLFlipBook
//   width={800}
  
//   height={700}
//   size="stretch"
//   minWidth={500}
//   maxWidth={800}
//   minHeight={700}
//   maxHeight={1100}
//   maxShadowOpacity={0.5}
//   showCover={false}
//   mobileScrollSupport={true}
//   className={css.flipbook}
//   style={{}}                // обязательно
//   startPage={0}             // обязательно
//   drawShadow={true}         // обязательно
//   flippingTime={1000}       // обязательно
//   usePortrait={false}
//   startZIndex={2}
//   autoSize={true}
//   clickEventForward={true}
//   useMouseEvents={true}
//   swipeDistance={30}
//   showPageCorners={true}

//   disableFlipByClick={false}
// >

//           {chunkedCards.map((pageCards, index) => (
//             <Binder key={`page-${index}`} cards={pageCards} />
//           ))}
//         </HTMLFlipBook>
//       </div>
    
//   );
// };

// export default BinderBook;


"use client";

import React from "react";
import HTMLFlipBook from "react-pageflip";
import BinderSpine from "../BinderSpine/BinderSpine";
import Binder from "../Binder/Binder";
import css from "./BinderBook.module.css";

interface BinderBookProps {
  allCards: { setCode: string; cardNumber: number }[];
}

const BinderBook = ({ allCards }: BinderBookProps) => {
  // Разбиваем карты на массивы по 6 штук для каждой страницы
  const chunkedCards = [];
  for (let i = 0; i < allCards.length; i += 6) {
    chunkedCards.push(allCards.slice(i, i + 6));
  }

  // Добавляем пустую страницу, если количество страниц нечетное, 
  // чтобы альбом корректно завершался разворотом
  if (chunkedCards.length % 2 !== 0) {
    chunkedCards.push([]);
  }

  return (
    <div className={css.albumContainer}>
      <BinderSpine />

     
      <HTMLFlipBook
        width={800}
        height={710}
        size="stretch"
        minWidth={500}
        maxWidth={800}
        minHeight={500}
        maxHeight={1100}
        maxShadowOpacity={0.5}
        showCover={false}
        mobileScrollSupport={true}
        className={css.flipbook}
        style={{}} 
        startPage={0} 
        drawShadow={true} 
        flippingTime={1000} 
        usePortrait={false}
        startZIndex={2}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {chunkedCards.map((pageCards, index) => (
          <Binder key={`page-${index}`} cards={pageCards} />
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default BinderBook;