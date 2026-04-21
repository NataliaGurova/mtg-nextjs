"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

// 🔹 Вот эти самые пропсы, которые нужны компоненту
interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Функция, которая меняет страницу, но СОХРАНЯЕТ фильтры
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  // Если страница всего одна (или ноль), пагинацию вообще не показываем
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-6 text-main-text">
      
      {/* Кнопка НАЗАД */}
      <Button
        variant="loadMore"
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Попередня
      </Button>

      {/* Индикатор страниц */}
      <span className="font-semibold text-lg">
        {page} / {totalPages}
      </span>

      {/* Кнопка ВПЕРЕД */}
      <Button
        variant="loadMore"
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Наступна
      </Button>
      
    </div>
  );
};

export default Pagination;