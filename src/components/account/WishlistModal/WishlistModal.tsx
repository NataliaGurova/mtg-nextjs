"use client";
import Link from "next/link";
import clsx from "clsx"; // Поможет удобно объединять классы

interface AuthTooltipProps {
  className?: string; // Для передачи классов позиционирования и анимации
  showArrow?: boolean; // Опциональная стрелочка вниз (удобно для карточек)
}

export const WishlistModal = ({ className, showArrow = false }: AuthTooltipProps) => {
  return (
    <div
      className={clsx(
        // Базовые стили, которые нужны всегда
        "py-3 px-6 bg-white border border-gray-200 rounded-[4px] shadow-lg z-50 text-sm text-gray-800 w-64 cursor-default",
        className // Сюда прилетят стили позиционирования (absolute, top, left и т.д.)
      )}
      onClick={(e) => e.stopPropagation()} // Предотвращаем клик по ссылке карточки, если окно открыто внутри неё
    >
      {/* Опциональный треугольник-указатель */}
      {showArrow && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />
      )}
      
      {/* Youre not logged in! To activate a wishlist, please{" "} */}
      Будь ласка, для постійного збереження списку вподобань{" "}
      <Link href="/register" className="text-dark-green hover:underline font-medium">
        зареєструйтесь
      </Link>,{" "}
      або{" "}
      <Link href="/login" className="text-dark-green hover:underline font-medium">
        увійдіть
      </Link>.
    </div>
  );
};