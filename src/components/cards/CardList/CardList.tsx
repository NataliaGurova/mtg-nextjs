// components/cards/CardList/CardList.tsx

"use client";

import Link from "next/link";
import { DbCard } from "@/types/types";
import CardItem from "../CardItem/CardItem";

import css from "./CardList.module.css";
import Pagination from "@/components/Pagination/Pagination";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CardsListProps {
  items: DbCard[];
  page: number;
  totalPages: number;
}

const CardsList = ({ items, page, totalPages }: CardsListProps) => {

  const router = useRouter();
 
  // Empty state — карточки не найдены
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center gap-5">
 
        {/* Иконка */}
        <div className="w-16 h-16 rounded-2xl bg-transparent flex items-center justify-center">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
            />
          </svg>
        </div>
 
        {/* Текст */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Карток не знайдено</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            За вибраними фільтрами нічого не знайшлось. Спробуйте змінити або скинути фільтри.
          </p>
        </div>
 
        {/* Кнопка сброса */}
        <Button
          onClick={() => router.push("/singles")}
          variant="more"
          className=" text-sm font-medium hover:opacity-90 transition"
          // className="rounded-lg bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          Скинути фільтри
        </Button>
      </div>
    );
  }
  
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