

// "use client";

// import { Heart } from "lucide-react";
// import { toggleWishlistAction } from "@/app/actions/wishlist";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";
// import { useWishlistStore } from "@/store/wishlistStore";
// import css from "./WishlistButton.module.css";

// // 🔹 1. Импортируем хуки для роутинга
// import { useRouter, usePathname } from "next/navigation";

// interface Props {
//   cardId: string;
//   className?: string;
//   variant?: "transparent" | "solid" | "white" | "responsive";
// }

// const WishlistButton = ({ cardId, className = "", variant = "transparent" }: Props) => {
//   const { data: session } = useSession();
  
//   // 🔹 2. Инициализируем хуки
//   const router = useRouter();
//   const pathname = usePathname();
  
//   const toggleItem = useWishlistStore((state) => state.toggleItem);
//   const isLiked = useWishlistStore((state) => state.items.includes(cardId));

//   const handleToggle = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!session) {
//       toast.info("Please log in to add to wishlist!");
//       return;
//     }

//     toggleItem(cardId); // Моментально меняем цвет сердечка
//     const res = await toggleWishlistAction(cardId);
    
//     if (!res.success) {
//       toggleItem(cardId); // Возвращаем цвет, если сервер выдал ошибку
//       toast.error("Could not update wishlist");
//     } else {
      
//       if (res.isWishlisted) {
//         toast.success("Added to wishlist!");
//       } else {
//         // 🔹 3. МАГИЯ ЗДЕСЬ: Если мы находимся на странице вишлиста
//         // и карточка была удалена, обновляем данные в фоне!
//         if (pathname === "/account/wishlist") {
//           router.refresh();
//         }
//       }
      
//     }
//   };

//   const bgClass =
//     variant === "transparent" ? css.variantTransparent :
//     variant === "solid" ? css.variantSolid :
//     variant === "responsive" ? css.variantResponsive :
//     css.variantWhite;

//   return (
//     <button
//       onClick={handleToggle}
//       className={`${css.button} ${bgClass} ${className}`}
//       aria-label="Toggle wishlist"
//     >
//       <Heart
//         size={22}
//         className={`${css.icon} ${isLiked ? css.liked : css.unliked}`}
//       />
//     </button>
//   );
// };

// export default WishlistButton;

"use client";

import { useState } from "react"; // 🔹 1. Добавляем useState
import { Heart } from "lucide-react";
import { toggleWishlistAction } from "@/app/actions/wishlist";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useWishlistStore } from "@/store/wishlistStore";
import css from "./WishlistButton.module.css";
import { useRouter, usePathname } from "next/navigation"; 
import { WishlistModal } from "../account/WishlistModal/WishlistModal";

interface Props {
  cardId: string;
  className?: string;
  variant?: "transparent" | "solid" | "white" | "responsive";
}

const WishlistButton = ({ cardId, className = "", variant = "transparent" }: Props) => {
  const { data: session } = useSession();
  const [showTooltip, setShowTooltip] = useState(false); // 🔹 3. Состояние видимости окна
  
  const router = useRouter();
  const pathname = usePathname(); 
  
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isLiked = useWishlistStore((state) => state.items.includes(cardId));

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); // 🔹 Важно: предотвращает клик по самой карточке [cite: 66, 68]

    if (!session) {
      // 🔹 4. Вместо toast.info показываем наше окно
      setShowTooltip(true);
      
      // Автоматически скрываем окно через 3.5 секунды 
      setTimeout(() => {
        setShowTooltip(false);
      }, 3500);
      
      return;
    }

    toggleItem(cardId);
    const res = await toggleWishlistAction(cardId);
    
    if (!res.success) {
      toggleItem(cardId);
      toast.error("Could not update wishlist");
    } else {
      if (res.isWishlisted) {
        toast.success("Added to wishlist!");
      } else {
        if (pathname === "/account/wishlist") {
          router.refresh();
        }
      }
    }
  };

  const bgClass = 
    variant === "transparent" ? css.variantTransparent :
    variant === "solid" ? css.variantSolid : 
    variant === "responsive" ? css.variantResponsive : 
    css.variantWhite;

  return (
    // 🔹 5. Оборачиваем кнопку в relative div для позиционирования окна [cite: 12]
    <div className="relative inline-flex items-center justify-center">
      <button
        onClick={handleToggle}
        className={`${css.button} ${bgClass} ${className}`}
        aria-label="Toggle wishlist"
      >
        <Heart 
          size={22}
          className={`${css.icon} ${isLiked ? css.liked : css.unliked}`} 
        />
      </button>

      {/* 🔹 6. Рендерим WishlistModal, если пользователь не авторизован и нажал на кнопку */}
      {showTooltip && (
        <WishlistModal 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 animate-in fade-in zoom-in-95 duration-200"
          showArrow={true} // Добавляем стрелочку, указывающую на сердечко [cite: 71]
        />
      )}
    </div>
  );
};

export default WishlistButton;