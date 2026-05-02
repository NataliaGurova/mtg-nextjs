// "use client";

// import { useState, useEffect } from "react";
// import { Heart } from "lucide-react";
// import { toggleWishlistAction, checkWishlistStatus } from "@/app/actions/wishlist";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";

// interface Props {
//   cardId: string;
//   className?: string; // Чтобы мы могли двигать кнопку через CSS
// }

// export default function WishlistButton({ cardId, className = "" }: Props) {
//   const { data: session } = useSession();
//   const [isLiked, setIsLiked] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // При загрузке кнопки спрашиваем у сервера: "Мы это уже лайкали?"
//   useEffect(() => {
//     if (session) {
//       checkWishlistStatus(cardId).then((status) => {
//         setIsLiked(status);
//         setIsLoading(false);
//       });
//     } else {
//       setIsLoading(false);
//     }
//   }, [cardId, session]);

//   const handleToggle = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation(); // Чтобы клик не переходил на саму карточку (не открывал страницу деталей)

//     if (!session) {
//       toast.info("Please log in to add to wishlist!");
//       return;
//     }

//     // Оптимистичный UI: сразу меняем цвет сердечка (чтобы юзер не ждал ответа сервера)
//     setIsLiked(!isLiked);

//     const res = await toggleWishlistAction(cardId);
    
//     if (!res.success) {
//       // Если сервер выдал ошибку — откатываем сердечко обратно
//       setIsLiked(!isLiked);
//       toast.error("Could not update wishlist");
//     } else {
//       if (res.isWishlisted) {
//         toast.success("Added to wishlist!");
//       }
//     }
//   };

//   return (
//     <button
//       onClick={handleToggle}
//       disabled={isLoading}
//       className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all active:scale-95 ${className}`}
//       aria-label="Toggle wishlist"
//     >
//       <Heart
//         size={22}
//         className={`transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`}
//       />
//     </button>
//   );
// }

// "use client";

// import { Heart } from "lucide-react";
// import { toggleWishlistAction } from "@/app/actions/wishlist";
// import { useSession } from "next-auth/react";
// import { toast } from "sonner";
// import { useWishlistStore } from "@/store/wishlistStore";
// import css from "./WishlistButton.module.css";

// interface Props {
//   cardId: string;
//   className?: string; // Для позиционирования (например, absolute top-2 right-2)
//   variant?: "transparent" | "solid" | "white" | "responsive";
// }

// export default function WishlistButton({
//   cardId,
//   className = "",
//   variant = "transparent" // Прозрачный по умолчанию
// }: Props) {
//   const { data: session } = useSession();
  
//   const toggleItem = useWishlistStore((state) => state.toggleItem);
//   const isLiked = useWishlistStore((state) => state.items.includes(cardId));

//   const handleToggle = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!session) {
//       toast.info("Please log in to add to wishlist!");
//       return;
//     }

//     toggleItem(cardId);
//     const res = await toggleWishlistAction(cardId);
    
//     if (!res.success) {
//       toggleItem(cardId);
//       toast.error("Could not update wishlist");
//     } else {
//       if (res.isWishlisted) toast.success("Added to wishlist!");
//     }
//   };

//   // Выбираем класс фона на основе пропса variant
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
// }

"use client";

import { Heart } from "lucide-react";
import { toggleWishlistAction } from "@/app/actions/wishlist";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useWishlistStore } from "@/store/wishlistStore";
import css from "./WishlistButton.module.css";

// 🔹 1. Импортируем хуки для роутинга
import { useRouter, usePathname } from "next/navigation"; 

interface Props {
  cardId: string;
  className?: string;
  variant?: "transparent" | "solid" | "white" | "responsive";
}

const WishlistButton = ({ cardId, className = "", variant = "transparent" }: Props) => {
  const { data: session } = useSession();
  
  // 🔹 2. Инициализируем хуки
  const router = useRouter();
  const pathname = usePathname(); 
  
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isLiked = useWishlistStore((state) => state.items.includes(cardId));

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 

    if (!session) {
      toast.info("Please log in to add to wishlist!");
      return;
    }

    toggleItem(cardId); // Моментально меняем цвет сердечка
    const res = await toggleWishlistAction(cardId);
    
    if (!res.success) {
      toggleItem(cardId); // Возвращаем цвет, если сервер выдал ошибку
      toast.error("Could not update wishlist");
    } else {
      
      if (res.isWishlisted) {
        toast.success("Added to wishlist!");
      } else {
        // 🔹 3. МАГИЯ ЗДЕСЬ: Если мы находимся на странице вишлиста 
        // и карточка была удалена, обновляем данные в фоне!
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
  );
};

export default WishlistButton;