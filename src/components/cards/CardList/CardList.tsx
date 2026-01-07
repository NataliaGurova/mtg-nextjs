

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { DbCard } from "@/types/types";
// import CardItem from "../CardItem/CardItem";
// import css from "./CardList.module.css";

"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { DbCard } from "@/types/types";
import CardItem from "../CardItem/CardItem";
import css from "./CardList.module.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LIMIT = 20;

type ApiResponse = {
  items: DbCard[];
  page: number;
  totalPages: number;
  total: number;
  limit: number;
};

type PageChunk = {
  page: number;
  items: DbCard[];
};

const CardsList = () => {
  const sp = useSearchParams();

  const q = (sp.get("q") ?? "").trim();
  const sets = (sp.get("sets") ?? "").trim();

  const [chunks, setChunks] = useState<PageChunk[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const baseParams = useMemo(() => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (sets) p.set("sets", sets);
    p.set("limit", String(LIMIT));
    return p;
  }, [q, sets]);

  const fetchPage = async (pageNum: number): Promise<ApiResponse> => {
    const p = new URLSearchParams(baseParams);
    p.set("page", String(pageNum));

    const res = await fetch(`/api/cards?${p.toString()}`);

    console.log("STATUS", res.status);
    const text = await res.text();
    console.log(text);

    if (!res.ok) {
      throw new Error("Failed to load cards");
    }

    return (await res.json()) as ApiResponse;
  };


  const loadInitial = async () => {
    setIsLoading(true);

    const data = await fetchPage(1);
    setTotalPages(data.totalPages);
    setChunks([{ page: 1, items: data.items }]);

    setIsLoading(false);
  };

  useEffect(() => {
    loadInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, sets]);

  const handleLoadMore = async () => {
    const nextPage = chunks.length + 1;
    if (nextPage > totalPages) return;

    setIsLoading(true);

    const data = await fetchPage(nextPage);
    setTotalPages(data.totalPages);
    setChunks((prev) => [...prev, { page: nextPage, items: data.items }]);

    setIsLoading(false);
  };

  const canLoadMore = chunks.length < totalPages;

  return (
    <div>
      <ul className={css.listCards}>
        {chunks.flatMap((chunk) =>
          chunk.items.map((card) => (
  
            <li key={`${chunk.page}-${card._id}`}>
                <Link href={`/singles/${card._id}`} className="block">
                  <CardItem card={card} />
                </Link>
              
            </li>
          ))
        )}
      </ul>

      <div className="mt-10 flex flex-col items-center gap-4">
        {canLoadMore && (
          <div className="mt-10 flex justify-center">
          <Button
          variant="loadMore"
          // size="wide"
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load more"}
            </Button>
          </div>
          // <button
          //   type="button"
          //   className={css.btn}
          //   onClick={handleLoadMore}
          //   disabled={isLoading}
          // >
          //   {isLoading ? "Loading..." : "Load more"}
          // </button>
        )}
      </div>
    </div>
  );
};

export default CardsList;
