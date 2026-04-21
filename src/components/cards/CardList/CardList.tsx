// components/cards/CardList/CardList.tsx

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
//               href={`/singles/${card.scryfall_id}?page=${page}`}
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

// components/cards/CardList/CardList.tsx

"use client";

import Link from "next/link";
import { DbCard } from "@/types/types";
import CardItem from "../CardItem/CardItem";

import css from "./CardList.module.css";
import Pagination from "@/components/Pagination/Pagination";

interface CardsListProps {
  items: DbCard[];
  page: number;
  totalPages: number;
}

const CardsList = ({ items, page, totalPages }: CardsListProps) => {
  
  return (
    <div>
      <ul className={css.listCards}>
        {items.map((card) => (
          <li key={`${card.scryfall_id}-${card.isFoil}`}>
            <Link
              href={`/singles/${card.scryfall_id}?page=${page}`}
              className="block"
            >
              <CardItem card={card} />
            </Link>
          </li>
        ))}
      </ul>

      {/* 🚀 Вставляем умную пагинацию, которая не сбрасывает фильтры */}
      <Pagination page={page} totalPages={totalPages} />
      
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