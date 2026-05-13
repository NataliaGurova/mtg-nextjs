// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";

// // 🔹 Вот эти самые пропсы, которые нужны компоненту
// interface PaginationProps {
//   page: number;
//   totalPages: number;
// }

// const Pagination = ({ page, totalPages }: PaginationProps) => {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();

//   // Функция, которая меняет страницу, но СОХРАНЯЕТ фильтры
//   const handlePageChange = (newPage: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", String(newPage));
//     router.push(`${pathname}?${params.toString()}`, { scroll: true });
//   };

//   // Если страница всего одна (или ноль), пагинацию вообще не показываем
//   if (totalPages <= 1) return null;

//   return (
//     <div className="mt-12 flex items-center justify-center gap-6 text-main-text">
      
//       {/* Кнопка НАЗАД */}
//       <Button
//         variant="loadMore"
//         disabled={page <= 1}
//         onClick={() => handlePageChange(page - 1)}
//       >
//         Попередня
//       </Button>

//       {/* Индикатор страниц */}
//       <span className="font-semibold text-lg">
//         {page} / {totalPages}
//       </span>

//       {/* Кнопка ВПЕРЕД */}
//       <Button
//         variant="loadMore"
//         disabled={page >= totalPages}
//         onClick={() => handlePageChange(page + 1)}
//       >
//         Наступна
//       </Button>
      
//     </div>
//   );
// };

// export default Pagination;

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import clsx from "clsx";

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return; 
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`, { scroll: true }); 
  };

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (page <= 3) {
      end = Math.min(totalPages, maxPagesToShow);
    } else if (page >= totalPages - 2) {
      start = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getPageNumbers();

  return (
    <div className="mt-12 flex items-center justify-center gap-1 text-main-text select-none">
      
      {/* Кнопка В НАЧАЛО */}
      <button
        disabled={page <= 1}
        onClick={() => handlePageChange(1)}
        // Изменили hover для иконок на ваш зеленый и белый текст
        className="p-2 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1d5105] hover:text-white rounded transition"
        aria-label="First page"
      >
        <ChevronsLeft size={20} strokeWidth={2.5} />
      </button>

      {/* Кнопка НАЗАД */}
      <button
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
        className="p-2 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1d5105] hover:text-white rounded transition"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>

      {/* НОМЕРА СТРАНИЦ */}
      <div className="flex items-center gap-2 mx-3">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={clsx(
              "min-w-[36px] h-[38px] flex items-center justify-center rounded-[4px] text-[15px] transition-all",
              page === p
                ? "border border-[#ccc] bg-[#f4f4f4] text-[#333] font-medium" 
                : "text-[#106290] hover:bg-[#1d5105] hover:text-white hover:border-[#1d5105]" // 🔹 ВОТ ИЗМЕНЕНИЯ 🔹
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Кнопка ВПЕРЕД */}
      <button
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="p-2 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1d5105] hover:text-white rounded transition"
        aria-label="Next page"
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>

      {/* Кнопка В КОНЕЦ */}
      <button
        disabled={page >= totalPages}
        onClick={() => handlePageChange(totalPages)}
        className="p-2 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1d5105] hover:text-white rounded transition"
        aria-label="Last page"
      >
        <ChevronsRight size={20} strokeWidth={2.5} />
      </button>
      
    </div>
  );
};

export default Pagination;