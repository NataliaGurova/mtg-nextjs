// // src/app/fullsets/[set]/album/page.tsx
// "use client";

// import { useParams, useSearchParams } from "next/navigation";
// import css from "./AlbumPage.module.css";

// const AlbumPage = () => {
//   const params = useParams();
//   const searchParams = useSearchParams();

//   // 🔹 Достаем параметр 'set' согласно вашей структуре папок [set]
//   const setCode = (params.set as string) || "";
  
//   // Получаем размер сета и название из query-параметров (?size=249&name=...)
//   const sizeParam = searchParams.get("size");
//   const setName = searchParams.get("name") || "Колекційний альбом";
//   const mainSetSize = sizeParam ? parseInt(sizeParam, 10) : 0;

//   if (!setCode || mainSetSize <= 0) {
//     return (
//       <div className={css.errorContainer}>
//         <p>Помилка: не вдалося завантажити дані альбому.</p>
//       </div>
//     );
//   }

//   // Генерируем массив номеров карт от 1 до mainSetSize (например, от 1 до 249)
//   const cardsRange = Array.from({ length: mainSetSize }, (_, i) => i + 1);

//   return (
//     <div className={css.pageBackground}>
//       <header className={css.albumHeader}>
//         <div className={css.headerContent}>
//           <h1 className={css.albumTitle}>{setName}</h1>
//           <p className={css.albumSubtitle}>Повна колекція: {mainSetSize} базових карт за порядком</p>
//         </div>
//       </header>

//       <main className={css.albumContainer}>
//         {/* Разворот коллекционного альбома */}
//         <div className={css.binderSheets}>
//           <div className={css.albumGrid}>
//             {cardsRange.map((cardNumber) => {
//               // Точный URL Scryfall для базовых коллекционных номеров сета
//               const scryfallImgUrl = `https://api.scryfall.com/cards/${setCode.toLowerCase()}/${cardNumber}?format=image&version=normal`;

//               return (
//                 <div key={cardNumber} className={css.cardCell}>
//                   <div className={css.cardSlot}>
//                     <img
//                       src={scryfallImgUrl}
//                       alt={`${setCode.toUpperCase()} #${cardNumber}`}
//                       className={css.cardImage}
//                       loading="lazy" // ⚠️ Критически важно: подгружает карты плавно при скролле
//                     />
//                     <div className={css.cardBadge}>#{cardNumber}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AlbumPage;




// // src/app/fullsets/[set]/album/page.tsx
// "use client";

// import { useState } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { LayoutGrid, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
// import css from "./AlbumPage.module.css";

// const CARDS_PER_PAGE = 6; // 6 карт на сторінку (Playset Binder: 4x3)
// const CARDS_PER_SPREAD = CARDS_PER_PAGE * 2; // 12 карт на весь розворот

// const AlbumPage = () => {
//   const params = useParams();
//   const searchParams = useSearchParams();

//   const setCode = (params.set as string) || "";
//   const sizeParam = searchParams.get("size");
//   const setName = searchParams.get("name") || "Колекційний альбом";
//   const mainSetSize = sizeParam ? parseInt(sizeParam, 10) : 0;

//   // Стейт для режимів та пагінації
//   const [viewMode, setViewMode] = useState<"binder" | "grid">("binder");
//   const [currentSpread, setCurrentSpread] = useState(0);

//   if (!setCode || mainSetSize <= 0) {
//     return (
//       <div className={css.errorContainer}>
//         <p>Помилка: не вдалося завантажити дані альбому.</p>
//       </div>
//     );
//   }

//   // Масив усіх номерів (від 1 до mainSetSize)
//   const cardsRange = Array.from({ length: mainSetSize }, (_, i) => i + 1);
//   const totalSpreads = Math.ceil(mainSetSize / CARDS_PER_SPREAD);

//   // Навігація по альбому
//   const handlePrevPage = () => setCurrentSpread((prev) => Math.max(0, prev - 1));
//   const handleNextPage = () => setCurrentSpread((prev) => Math.min(totalSpreads - 1, prev + 1));

//   // Карти для поточного розвороту
//   const startIndex = currentSpread * CARDS_PER_SPREAD;
//   const currentCards = cardsRange.slice(startIndex, startIndex + CARDS_PER_SPREAD);
//   const leftPageCards = currentCards.slice(0, CARDS_PER_PAGE);
//   const rightPageCards = currentCards.slice(CARDS_PER_PAGE, CARDS_PER_SPREAD);

//   // Компонент однієї ячейки карти
//   const CardSlot = ({ cardNumber }: { cardNumber: number }) => {
//     const scryfallImgUrl = `https://api.scryfall.com/cards/${setCode.toLowerCase()}/${cardNumber}?format=image&version=normal`;
//     return (
//       <div className={css.cardSlot}>
//         <img
//           src={scryfallImgUrl}
//           alt={`Card #${cardNumber}`}
//           className={css.cardImage}
//           loading="lazy"
//         />
//         <div className={css.cardBadge}>#{cardNumber}</div>
//       </div>
//     );
//   };

//   return (
//     <div className={css.pageBackground}>
//       {/* ПАНЕЛЬ УПРАВЛІННЯ */}
//       <div className={css.controlsPanel}>
//         <div className={css.modeToggle}>
//           <button
//             onClick={() => setViewMode("binder")}
//             className={`${css.toggleBtn} ${viewMode === "binder" ? css.active : ""}`}
//           >
//             <BookOpen size={18} />
//             Альбом
//           </button>
//           <button
//             onClick={() => setViewMode("grid")}
//             className={`${css.toggleBtn} ${viewMode === "grid" ? css.active : ""}`}
//           >
//             <LayoutGrid size={18} />
//             Вся сітка
//           </button>
//         </div>

//         <div className={css.headerInfo}>
//           <h1 className={css.albumTitle}>{setName}</h1>
//         </div>

//         <div className={css.spacer}></div>
//       </div>

//       <main className={css.albumContainer}>
//         {viewMode === "grid" ? (
//           // РЕЖИМ 1: БЕЗКІНЕЧНА СІТКА
//           <div className={css.fullGrid}>
//             {cardsRange.map((num) => (
//               <CardSlot key={`grid-${num}`} cardNumber={num} />
//             ))}
//           </div>
//         ) : (
//           // РЕЖИМ 2: СПРАВЖНІЙ БІНДЕР
//           <div className={css.binderWrapper}>
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentSpread}
//                 initial={{ opacity: 0, scale: 0.98, x: 20 }}
//                 animate={{ opacity: 1, scale: 1, x: 0 }}
//                 exit={{ opacity: 0, scale: 0.98, x: -20 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//                 className={css.binderSpread}
//               >
//                 {/* Ліва сторінка */}
//                 <div className={css.binderPage}>
//                   {leftPageCards.map((num) => (
//                     <CardSlot key={`binder-${num}`} cardNumber={num} />
//                   ))}
//                 </div>

//                 {/* Центральні кільця/скоби */}
//                 <div className={css.binderSpine}>
//                   <div className={css.ring}></div>
//                   <div className={css.ring}></div>
//                   <div className={css.ring}></div>
//                 </div>

//                 {/* Права сторінка */}
//                 <div className={css.binderPage}>
//                   {rightPageCards.map((num) => (
//                     <CardSlot key={`binder-${num}`} cardNumber={num} />
//                   ))}
//                 </div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Пагінація знизу */}
//             <div className={css.pagination}>
//               <button onClick={handlePrevPage} disabled={currentSpread === 0} className={css.pageBtn}>
//                 <ChevronLeft size={24} /> Назад
//               </button>
//               <span className={css.pageIndicator}>
//                 Розворот {currentSpread + 1} з {totalSpreads}
//               </span>
//               <button onClick={handleNextPage} disabled={currentSpread === totalSpreads - 1} className={css.pageBtn}>
//                 Далі <ChevronRight size={24} />
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AlbumPage;







// // src/app/fullsets/[set]/album/page.tsx

// "use client";

// import { useMemo } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import dynamic from "next/dynamic";
// // import type { IProps } from "react-pageflip";
// import React, { forwardRef } from "react";
// import css from "./AlbumPage.module.css";

// // SSR OFF
// const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
//   ssr: false,
// });


// const CARDS_PER_PAGE = 6;

// interface PageProps {
//   children: React.ReactNode;
// }

// // ЖЕСТКАЯ СТРАНИЦА
// const AlbumSheet = forwardRef<HTMLDivElement, PageProps>(
//   ({ children }, ref) => {
//     return (
//       <div
//         ref={ref}
//         className={css.flipPage}
//         data-density="hard"
//       >
//         {children}
//       </div>
//     );
//   }
// );

// AlbumSheet.displayName = "AlbumSheet";

// export default function AlbumPage() {
//   const params = useParams();
//   const searchParams = useSearchParams();

//   const setCode = (params.set as string) || "";
//   const sizeParam = searchParams.get("size");
//   const setName = searchParams.get("name") || "MTG Album";

//   const mainSetSize = sizeParam ? parseInt(sizeParam, 10) : 0;

//   const cardsRange = useMemo(
//     () => Array.from({ length: mainSetSize }, (_, i) => i + 1),
//     [mainSetSize]
//   );

//   // Разбиваем на страницы по 6 карт
//   const pages = [];

//   for (let i = 0; i < cardsRange.length; i += CARDS_PER_PAGE) {
//     pages.push(cardsRange.slice(i, i + CARDS_PER_PAGE));
//   }

//   const CardSlot = ({ cardNumber }: { cardNumber: number }) => {
//     const img = `https://api.scryfall.com/cards/${setCode.toLowerCase()}/${cardNumber}?format=image&version=normal`;

//     return (
//       <div className={css.cardSlot}>
//         <img
//           src={img}
//           alt={`Card ${cardNumber}`}
//           className={css.cardImage}
//           loading="lazy"
//         />

//         <div className={css.cardBadge}>
//           #{cardNumber}
//         </div>
//       </div>
//     );
//   };

//   return (
    
//     <div className={css.pageBackground}>
//       <div className={css.header}>
//         <h1>{setName}</h1>
//       </div>

//       <div className={css.bookWrapper}>
        

// <HTMLFlipBook
//   width={650}
//   height={900}

//   size="stretch"

//   minWidth={350}
//   maxWidth={1000}

//   minHeight={500}
//   maxHeight={1400}

//   drawShadow={true}
//   flippingTime={800}
//   usePortrait={true}
//   startZIndex={0}
//   autoSize={true}
//   maxShadowOpacity={0.5}
//   showCover={true}
//   mobileScrollSupport={true}
//   clickEventForward={true}
//   useMouseEvents={true}
//   swipeDistance={30}
//   showPageCorners={true}
//   disableFlipByClick={false}

//   className={css.flipBook}
//   style={{}}

//   startPage={0}
// >
//           {/* ОБЛОЖКА */}
//           <AlbumSheet>
//             <div className={css.coverPage}>
//               <h1>{setName}</h1>
//               <p>{setCode.toUpperCase()}</p>
//             </div>
//           </AlbumSheet>

//           {/* СТРАНИЦЫ */}
//           {pages.map((pageCards, pageIndex) => (
//             <AlbumSheet key={pageIndex}>
//               <div className={css.albumPage}>
//                 {pageCards.map((num) => (
//                   <CardSlot
//                     key={num}
//                     cardNumber={num}
//                   />
//                 ))}
//               </div>
//             </AlbumSheet>
//           ))}

//           {/* ЗАДНЯЯ ОБЛОЖКА */}
//           <AlbumSheet>
//             <div className={css.backCover}>
//               <h2>Complete Full Set</h2>
//             </div>
//           </AlbumSheet>
//         </HTMLFlipBook>
//       </div>
//     </div>
//   );
// }

// ==========================


// // src/app/fullsets/[set]/album/page.tsx
// "use client";
// import { useMemo, useState } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import dynamic from "next/dynamic";
// // import type { IProps } from "react-pageflip";
// import { LayoutGrid, BookOpen } from "lucide-react";
// import css from "./AlbumPage.module.css";


// const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

// const CARDS_PER_PAGE = 6;
// const CARDS_PER_SPREAD = 12;

// const AlbumPage = () => {
//   const params = useParams();
//   const searchParams = useSearchParams();

//   const setCode = (params.set as string) || "";
//   const sizeParam = searchParams.get("size");
//   const setName = searchParams.get("name") || "Колекційний альбом";

//   const mainSetSize = sizeParam ? parseInt(sizeParam, 10) : 0;

//   const [viewMode, setViewMode] = useState<"binder" | "grid">("binder");

  
//   // Все карты
//   const cardsRange = useMemo(
//     () => Array.from({ length: mainSetSize }, (_, i) => i + 1),
//     [mainSetSize]
//   );
  
//   // РАЗВОРОТЫ:
//   // left page = 6 cards
//   // right page = 6 cards
//   const spreads = useMemo(() => {
//     const result: number[][][] = [];
    
//     for (let i = 0; i < cardsRange.length; i += CARDS_PER_SPREAD) {
//       result.push([
//         cardsRange.slice(i, i + CARDS_PER_PAGE),
//         cardsRange.slice(
//           i + CARDS_PER_PAGE,
//           i + CARDS_PER_SPREAD
//         ),
//       ]);
//     }
    
//     return result;
//   }, [cardsRange]);
  


//   if (!setCode || mainSetSize <= 0) {
//     return (
//       <div className={css.errorContainer}>
//         <p>Помилка: не вдалося завантажити дані альбому.</p>
//       </div>
//     );
//   }

//   // Карточка
//   const CardSlot = ({
//     cardNumber,
//   }: {
//     cardNumber: number;
//   }) => {
//     const scryfallImgUrl = `https://api.scryfall.com/cards/${setCode.toLowerCase()}/${cardNumber}?format=image&version=normal`;

//     return (
//       <div className={css.cardSlot}>
//         <img
//           src={scryfallImgUrl}
//           alt={`Card #${cardNumber}`}
//           className={css.cardImage}
//           loading="lazy"
//         />

//         <div className={css.cardBadge}>
//           #{cardNumber}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={css.pageBackground}>
//       {/* ПАНЕЛЬ */}
//       <div className={css.controlsPanel}>
//         <div className={css.modeToggle}>
//           <button
//             onClick={() => setViewMode("binder")}
//             className={`${css.toggleBtn} ${
//               viewMode === "binder"
//                 ? css.active
//                 : ""
//             }`}
//           >
//             <BookOpen size={18} />
//             Альбом
//           </button>

//           <button
//             onClick={() => setViewMode("grid")}
//             className={`${css.toggleBtn} ${
//               viewMode === "grid"
//                 ? css.active
//                 : ""
//             }`}
//           >
//             <LayoutGrid size={18} />
//             Вся сітка
//           </button>
//         </div>

//         <div className={css.headerInfo}>
//           <h1 className={css.albumTitle}>
//             {setName}
//           </h1>
//         </div>

//         <div className={css.spacer}></div>
//       </div>





//       <main className={css.albumContainer}>
//         {/* GRID VIEW */}
//         {viewMode === "grid" && (
//           <div className={css.fullGrid}>
//             {cardsRange.map((num) => (
//               <CardSlot
//                 key={`grid-${num}`}
//                 cardNumber={num}
//               />
//             ))}
//           </div>
//         )}

//         {/* BINDER VIEW */}
//         {viewMode === "binder" && (
//           <div className={css.bookWrapper}>
//             <HTMLFlipBook
//               width={1400}
//               height={950}
//               size="stretch"
//               minWidth={900}
//               maxWidth={1800}
//               minHeight={600}
//               maxHeight={1400}
//               maxShadowOpacity={0.5}
//               showCover={true}
//               drawShadow={true}
//               flippingTime={900}
//               usePortrait={false}
//               startZIndex={0}
//               autoSize={true}
//               mobileScrollSupport={true}
//               swipeDistance={30}
//               clickEventForward={true}
//               useMouseEvents={true}
//               showPageCorners={true}
//               disableFlipByClick={false}
//               startPage={0}
//               className={css.flipBook}
//               style={{}}
//             >
//               {/* ОБЛОЖКА */}
//               <div
//                 className={css.coverPage}
//                 data-density="hard"
//               >
//                 <div className={css.coverInner}>
//                   <h1>{setName}</h1>
//                   <p>
//                     {setCode.toUpperCase()}
//                   </p>
//                 </div>
//               </div>

//               {/* РАЗВОРОТЫ */}
//               {spreads.map(
//                 ([leftCards, rightCards], i) => (
//                   <div
//                     key={i}
//                     className={css.flipSpread}
//                     data-density="hard"
//                   >
//                     {/* LEFT PAGE */}
//                     <div className={css.binderPage}>
//                       {leftCards.map((num) => (
//                         <CardSlot
//                           key={`left-${num}`}
//                           cardNumber={num}
//                         />
//                       ))}
//                     </div>

//                     {/* SPINE */}
//                     <div className={css.binderSpine}>
//                       <div className={css.ring}></div>
//                       <div className={css.ring}></div>
//                       <div className={css.ring}></div>
//                     </div>

//                     {/* RIGHT PAGE */}
//                     <div className={css.binderPage}>
//                       {rightCards.map((num) => (
//                         <CardSlot
//                           key={`right-${num}`}
//                           cardNumber={num}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )
//               )}

//               {/* ЗАДНЯЯ ОБЛОЖКА */}
//               <div
//                 className={css.backCover}
//                 data-density="hard"
//               >
//                 <div className={css.coverInner}>
//                   <h2>
//                     Complete Full Set
//                   </h2>
//                 </div>
//               </div>
//             </HTMLFlipBook>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AlbumPage;

// ==================================================================================

// "use client";

// import { useMemo, useState } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import css from "./AlbumPage.module.css";
// import { ControlsPanel } from "@/components/setbox/SetAlbum/ControlsPanel/ControlsPanel";
// import CardSlot from "@/components/setbox/SetAlbum/CardSlot/CardSlot";
// import { FlipBook } from "@/components/setbox/SetAlbum/FlipBook/FlipBook";



// const CARDS_PER_PAGE = 6;

// const AlbumPage = () => {
//   const params = useParams();
//   const searchParams = useSearchParams();

//   const setCode = (params.set as string) || "";
//   const sizeParam = searchParams.get("size");
//   const setName = searchParams.get("name") || "Колекційний альбом";
//   const mainSetSize = sizeParam ? parseInt(sizeParam, 10) : 0;

//   const [viewMode, setViewMode] = useState<"binder" | "grid">("binder");

//   // Массив всех карт
//   const cardsRange = useMemo(
//     () => Array.from({ length: mainSetSize }, (_, i) => i + 1),
//     [mainSetSize]
//   );

//   // Нарезаем массив на СТРАНИЦЫ (по 6 карт)
//   const pages = useMemo(() => {
//     const result: number[][] = [];
//     for (let i = 0; i < cardsRange.length; i += CARDS_PER_PAGE) {
//       result.push(cardsRange.slice(i, i + CARDS_PER_PAGE));
//     }
//     return result;
//   }, [cardsRange]);

//   if (!setCode || mainSetSize <= 0) {
//     return <div className={css.errorContainer}>Помилка: не вдалося завантажити дані.</div>;
//   }

//   return (
//     <div className={css.pageBackground}>
//       <ControlsPanel setName={setName} viewMode={viewMode} setViewMode={setViewMode} />

//       <main className={css.albumContainer}>
//         {viewMode === "grid" ? (
//           <div className={css.fullGrid}>
//             {cardsRange.map((num) => (
//               <CardSlot key={`grid-${num}`} setCode={setCode} cardNumber={num} />
//             ))}
//           </div>
//         ) : (
//           <FlipBook setCode={setCode} setName={setName} pages={pages} />
//         )}
//       </main>
//     </div>
//   );
// };

// export default AlbumPage;


"use client";

import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import css from "./AlbumPage.module.css";
import { ControlsPanel } from "@/components/setbox/SetAlbum/ControlsPanel/ControlsPanel";
import CardSlot from "@/components/setbox/SetAlbum/CardSlot/CardSlot";
import BinderBook from "@/components/setbox/SetAlbum/BinderBook/BinderBook";

const AlbumPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const setCode = (params.set as string) || "";
  const sizeParam = searchParams.get("size");
  const setName = searchParams.get("name") || "Колекційний альбом";
  const mainSetSize = sizeParam ? parseInt(sizeParam, 10) : 0;

  const [viewMode, setViewMode] = useState<"binder" | "grid">("binder");

  // Формируем плоский массив всех карт в нужном формате
  const allCards = useMemo(
    () =>
      Array.from({ length: mainSetSize }, (_, i) => ({
        setCode,
        cardNumber: i + 1,
      })),
    [mainSetSize, setCode]
  );

  if (!setCode || mainSetSize <= 0) {
    return <div className={css.errorContainer}>Помилка: не вдалося завантажити дані.</div>;
  }

  return (
    <div className={css.pageBackground}>
      <ControlsPanel setName={setName} viewMode={viewMode} setViewMode={setViewMode} />

      <main className={css.albumContainer}>
        {viewMode === "grid" ? (
          <div className={css.fullGrid}>
            {allCards.map((card) => (
              <CardSlot key={`grid-${card.cardNumber}`} setCode={card.setCode} cardNumber={card.cardNumber} />
            ))}
          </div>
        ) : (
          <BinderBook allCards={allCards} />
        )}
      </main>
    </div>
  );
};

export default AlbumPage;