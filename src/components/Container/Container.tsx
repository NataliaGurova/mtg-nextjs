// import { cn } from "@/lib/utils";
// import React from "react";

// const Container = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     // <div className={cn("max-w-screen-xl mx-auto px-10 py-5 outline outline-1 outline-red-500", className)}>
//     <div className={cn("mx-auto px-5 py-5 bg-light-grey text-main-text md:px-10", className)}>
//       {children}
//     </div>
//   );
// };

// export default Container;


import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

// Расширяем стандартные пропсы <div>, чтобы контейнер мог принимать 
// id, aria-метки, onMouseEnter и любые другие стандартные HTML-атрибуты
interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

const Container = ({
  children,
  className,
  ...props
}: ContainerProps) => {
  return (
    <div 
      className={cn(
        // 1. Занимает всю доступную ширину
        "w-full", 
        // 2. Ограничиваем максимальную ширину (1520px отлично бьется с вашими баннерами)
        // "max-w-screen-xl",
        "max-w-[1520px]", 
        // 3. Центрируем
        "mx-auto", 
        // 4. Безопасные "резиновые" отступы для разных экранов
        "px-4 md:px-8 lg:px-10", 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;