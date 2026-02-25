
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";

// import { DbCard } from "@/types/types";
// import CardItem from "../CardItem/CardItem";
// import css from "./CardList.module.css";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// // import Loader from "@/components/Loader/Loader";

// const LIMIT = 20;

// type ApiResponse = {
//   items: DbCard[];
//   page: number;
//   totalPages: number;
//   total: number;
//   limit: number;
// };

// type PageChunk = {
//   page: number;
//   items: DbCard[];
// };

// const CardsList = () => {
//   const sp = useSearchParams();

//   const q = useMemo(() => (sp.get("q") ?? "").trim(), [sp]);

//   const sets = useMemo(() => sp.getAll("sets"), [sp]);

//   const [chunks, setChunks] = useState<PageChunk[]>([]);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   // const [isLoading, setIsLoading] = useState<boolean>(false);

//   const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  


//   const baseParams = useMemo(() => {
//     const p = new URLSearchParams();
  
//     if (q) p.set("q", q);
//     if (sets.length > 0) p.set("sets", sets.join(",")); // 👈 ВАЖНО
  
//     p.set("limit", String(LIMIT));
//     return p;
//   }, [q, sets]);



//   console.log("CLIENT sets:", sets);
//   console.log("CLIENT query:", baseParams.toString());
  

  
// const fetchPage = async (pageNum: number): Promise<ApiResponse> => {
//   const p = new URLSearchParams(baseParams);
//   p.set("page", String(pageNum));

//   const res = await fetch(`/api/cards?${p.toString()}`);

//   if (!res.ok) {
//     const text = await res.text(); // читаем body один раз только при ошибке
//     console.error("Failed to load cards:", text);
//     throw new Error("Failed to load cards");
//   }

//   const data: ApiResponse = await res.json(); // читаем body один раз
//   return data;
// };




//   const loadInitial = async () => {
//     const data = await fetchPage(1);
//     setTotalPages(data.totalPages);
//     setChunks([{ page: 1, items: data.items }]);
//   };
  

//   useEffect(() => {
//     loadInitial();
//   }, [q, sets.join(",")]);



//   const handleLoadMore = async () => {
//     const nextPage = chunks.length + 1;
//     if (nextPage > totalPages) return;
  
//     setIsLoadingMore(true);
  
//     const data = await fetchPage(nextPage);
//     setTotalPages(data.totalPages);
//     setChunks((prev) => [...prev, { page: nextPage, items: data.items }]);
  
//     setIsLoadingMore(false);
//   };
  

//   const canLoadMore = chunks.length < totalPages;

//   return (
//     <div>
//       <ul className={css.listCards}>
//         {chunks.flatMap((chunk) =>
//           chunk.items.map((card) => (
  
//             <li key={`${chunk.page}-${card.scryfall_id}`}>
//                 <Link href={`/singles/${card.scryfall_id}`} className="block">
//                   <CardItem card={card} />
//                 </Link>
              
//             </li>
//           ))
//         )}
//       </ul>

//       <div className="mt-10 flex flex-col items-center gap-4">
//   {chunks.length > 0 && canLoadMore && (
//     <Button
//     variant="loadMore"
//     onClick={handleLoadMore}
//     disabled={isLoadingMore}
//     >
//       {isLoadingMore ? "Loading..." : "Load more"}
//     </Button>
//   )}
// </div>


// </div>
// );
// };

// export default CardsList;

// -----------------------------------------
// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";

// import { DbCard } from "@/types/types";
// import CardItem from "../CardItem/CardItem";
// import { Button } from "@/components/ui/button";
// import css from "./CardList.module.css";

// const LIMIT = 20;

// type ApiResponse = {
//   items: DbCard[];
//   page: number;
//   totalPages: number;
//   total: number;
//   limit: number;
// };

// const CardsList = () => {
//   const sp = useSearchParams();

//   const q = useMemo(() => (sp.get("q") ?? "").trim(), [sp]);
//   const sets = useMemo(() => sp.getAll("sets"), [sp]);

//   const [cards, setCards] = useState<DbCard[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   // 🔹 Базовые параметры запроса
//   const baseParams = useMemo(() => {
//     const p = new URLSearchParams();
//     if (q) p.set("q", q);
//     if (sets.length > 0) p.set("sets", sets.join(","));
//     p.set("limit", String(LIMIT));
//     return p;
//   }, [q, sets]);

//   // 🔹 Функция fetch страницы
//   const fetchPage = async (pageNum: number): Promise<ApiResponse> => {
//     const p = new URLSearchParams(baseParams);
//     p.set("page", String(pageNum));

//     const res = await fetch(`/api/cards?${p.toString()}`);
//     if (!res.ok) throw new Error("Failed to load cards");

//     return res.json();
//   };

//   // 🔹 Загрузка первой страницы при фильтрах
//   // const loadInitial = async () => {
//   //   const data = await fetchPage(1);
//   //   setCards(data.items);
//   //   setPage(1);
//   //   setTotalPages(data.totalPages);
//   // };

//   // useEffect(() => {
//   //   loadInitial();
//   // }, [q, sets.join(",")]);

//   // const deps = useMemo(() => [q, sets.join(",")], [q, sets]);
//   const q = useMemo(() => (sp.get("q") ?? "").trim(), [sp])

//   // useCallback для loadInitial
//   const loadInitial = useCallback(async () => {
//     const data = await fetchPage(1);
//     setCards(data.items);
//     setPage(1);
//     setTotalPages(data.totalPages);
//   }, [fetchPage, q, sets]);

//   useEffect(() => {
//     loadInitial();
//   }, [loadInitial, q]);

//   // 🔹 Загрузка следующей страницы
//   const handleLoadMore = async () => {
//     if (page >= totalPages) return;

//     setIsLoadingMore(true);
//     const nextPage = page + 1;

//     const data = await fetchPage(nextPage);

//     setCards((prev) => [...prev, ...data.items]);
//     setPage(nextPage);

//     setIsLoadingMore(false);
//   };

//   const canLoadMore = page < totalPages;

//   return (
//     <div>
//       <ul className={css.listCards}>
//         {cards.map((card) => (
//           <li key={`${card.scryfall_id}-${card.isFoil}`}>
//             <Link href={`/singles/${card.scryfall_id}`} className="block">
//               <CardItem card={card} />
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <div className="mt-10 flex flex-col items-center gap-4">
//         {cards.length > 0 && canLoadMore && (
//           <Button
//             variant="loadMore"
//             onClick={handleLoadMore}
//             disabled={isLoadingMore}
//           >
//             {isLoadingMore ? "Loading..." : "Load more"}
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CardsList;

// ==============old================
// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";

// import { DbCard } from "@/types/types";
// import CardItem from "../CardItem/CardItem";
// import { Button } from "@/components/ui/button";
// import css from "./CardList.module.css";

// const LIMIT = 20;

// type ApiResponse = {
//   items: DbCard[];
//   page: number;
//   totalPages: number;
//   total: number;
//   limit: number;
// };

// const CardsList = () => {
//   const searchParams = useSearchParams();

//   // 🔹 Фильтры
//   const q = useMemo(() => (searchParams.get("q") ?? "").trim(), [searchParams]);
//   const sets = useMemo(() => searchParams.getAll("sets"), [searchParams]);

//   // 🔹 Стейт карточек и пагинации
//   const [cards, setCards] = useState<DbCard[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   // 🔹 Базовые параметры запроса
//   const baseParams = useMemo(() => {
//     const params = new URLSearchParams();
//     if (q) params.set("q", q);
//     if (sets.length > 0) params.set("sets", sets.join(","));
//     params.set("limit", String(LIMIT));
//     return params;
//   }, [q, sets]);

//   // 🔹 Функция fetch страницы
//   const fetchPage = useCallback(
//     async (pageNum: number): Promise<ApiResponse> => {
//       const params = new URLSearchParams(baseParams);
//       params.set("page", String(pageNum));

//       const res = await fetch(`/api/cards?${params.toString()}`);
//       if (!res.ok) throw new Error("Failed to load cards");

//       return res.json();
//     },
//     [baseParams]
//   );

//   // 🔹 Загрузка первой страницы при смене фильтров
//   const loadInitial = useCallback(async () => {
//     const data = await fetchPage(1);
//     setCards(data.items);
//     setPage(1);
//     setTotalPages(data.totalPages);
//   }, [fetchPage]);

//   useEffect(() => {
//     loadInitial();
//   }, [loadInitial]);

//   // 🔹 Загрузка следующей страницы
//   const handleLoadMore = useCallback(async () => {
//     if (page >= totalPages) return;

//     setIsLoadingMore(true);
//     try {
//       const nextPage = page + 1;
//       const data = await fetchPage(nextPage);

//       setCards((prev) => [...prev, ...data.items]);
//       setPage(nextPage);
//     } finally {
//       setIsLoadingMore(false);
//     }
//   }, [page, totalPages, fetchPage]);

//   const canLoadMore = page < totalPages;

//   return (
//     <div>
//       <ul className={css.listCards}>
//         {cards.map((card) => (
//           <li key={`${card.scryfall_id}-${card.isFoil}`}>
//             <Link href={`/singles/${card.scryfall_id}`} className="block">
//               <CardItem card={card} />
//             </Link>
//           </li>
//         ))}
//       </ul>

//       {cards.length > 0 && canLoadMore && (
//         <div className="mt-10 flex flex-col items-center gap-4">
//           <Button
//             variant="loadMore"
//             onClick={handleLoadMore}
//             disabled={isLoadingMore}
//           >
//             {isLoadingMore ? "Loading..." : "Load more"}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardsList;



// =======================================
// "use client";

// import Link from "next/link";
// import { DbCard } from "@/types/types";
// import CardItem from "../CardItem/CardItem";
// import { Button } from "@/components/ui/button";
// import css from "./CardList.module.css";

// interface CardsListProps {
//   items: DbCard[];
//   page: number;
//   totalPages: number;
// }

// const CardsList = ({ items, page, totalPages }: CardsListProps) => {
//   const canGoPrev = page > 1;
//   const canGoNext = page < totalPages;

//   return (
//     <div>
//       <ul className={css.listCards}>
//         {items.map((card) => (
//           <li key={`${card.scryfall_id}-${card.isFoil}`}>
//             <Link
//               href={`/singles/${card.scryfall_id}`}
//               className="block"
//             >
//               <CardItem card={card} />
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <div className="mt-10 flex justify-center gap-4">
//         {canGoPrev && (
//           <Link href={`/singles?page=${page - 1}`}>
//             <Button variant="loadMore">Previous</Button>
//           </Link>
//         )}

//         {canGoNext && (
//           <Link href={`/singles?page=${page + 1}`}>
//             <Button variant="loadMore">Next</Button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CardsList;
// --------------------------------
"use client";

import Link from "next/link";
import { DbCard } from "@/types/types";
import CardItem from "../CardItem/CardItem";
import { Button } from "@/components/ui/button";
import css from "./CardList.module.css";

interface CardsListProps {
  items: DbCard[];
  page: number;
  totalPages: number;
  fromCard?: string; // ⚡ можно указать карточку, к которой хотим вернуться
}

const CardsList = ({ items, page, totalPages, fromCard }: CardsListProps) => {
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div>
      <ul className={css.listCards}>
        {items.map((card) => {
          const isTarget = fromCard === card.scryfall_id;

          return (
            <li
              key={`${card.scryfall_id}-${card.isFoil}`}
              id={isTarget ? "fromCard" : undefined} // ⚡ якорь для скролла
              className={isTarget ? "scroll-mt-20" : undefined}
            >
              <Link href={`/singles/${card.scryfall_id}`} className="block">
                <CardItem card={card} />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex justify-center gap-4">
        {canGoPrev && (
          <Link
            href={`/singles?page=${page - 1}`}
          >
            <Button variant="loadMore">Previous</Button>
          </Link>
        )}

        {canGoNext && (
          <Link
            href={`/singles?page=${page + 1}`}
          >
            <Button variant="loadMore">Next</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardsList;


{/* {isLoading ? <Loader /> : "Load more"} */}

      {/* <div className="mt-10 flex flex-col items-center gap-4">
        {isLoading ? (
          <Loader />
        ) : (
          canLoadMore && (
            <Button
              variant="loadMore"
              onClick={handleLoadMore}
            >
              Load more
            </Button>
          )
        )}
      </div> */}