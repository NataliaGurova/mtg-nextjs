
// "use client";

// import * as React from "react";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { Search } from "lucide-react";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   containerClassName?: string;
//   showIcon?: boolean;
//   iconClassName?: string;
//   icon?: React.ReactNode;
  
//   /** debounce in ms (default 300) */
//   debounceMs?: number;
  
//   /** query param name (default "q") */
//   queryKey?: string;
// }

// const SearchBar: React.FC<SearchBarProps> = ({
//   containerClassName,
//   className,
//   showIcon = true,
//   iconClassName = "text-main-text",
//   icon,
//   debounceMs = 300,
//   queryKey = "q",
//   ...props
// }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
  
//   // ✅ синхронизация значения инпута с URL
//   const urlValue = searchParams.get(queryKey) ?? "";
//   const [value, setValue] = React.useState(urlValue);
  
//   React.useEffect(() => {
//     setValue(urlValue);
//   }, [urlValue]);
  
//   // ✅ debounce обновления URL + сброс cursor при новом поиске
//   React.useEffect(() => {
//     const timeout = window.setTimeout(() => {
//       const params = new URLSearchParams(searchParams.toString());
//       const trimmed = value.trim();

//       // if (trimmed) {
//       //   params.set(queryKey, trimmed);
//       // } else {
//       //   params.delete(queryKey);
//       // }

//       // ✅ поиск только если >= 3 символов
//     if (trimmed.length >= 3) {
//       params.set(queryKey, trimmed);
//       params.delete("cursor"); // сброс cursor при новом поиске
//     } else {
//       params.delete(queryKey);
//       params.delete("cursor");
//     }
      
//       // ✅ сброс cursor при новом поиске
//       params.delete("cursor");
      
//       const qs = params.toString();
//       router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
//     }, debounceMs);
    
//     return () => window.clearTimeout(timeout);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [value, debounceMs, queryKey, pathname]);
  
//   return (
//     <div className={cn("relative flex items-center", containerClassName)}>
//       {showIcon && (
//         <span className="absolute left-0.5 top-1/2 -translate-y-1/2">
//           {icon ? icon : <Search className={cn("h-5 w-5", iconClassName)} />}
//         </span>
//       )}

//       <Input
//         type="search"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder="search..."
//         className={cn(
//           "w-[350px] h-[30px] bg-light-grey border-none rounded-none shadow-none " +
//           "focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-gray-400 " +
//           "border-b border-main-text",
//           showIcon ? "pl-7" : "pl-2",
//           className
//         )}
//         {...props}
//         />

//       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black hidden md:block" />
//     </div>
//   );
// };

// export default SearchBar;


// ===============================
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { X } from "lucide-react";

interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  showIcon?: boolean;
  iconClassName?: string;
  icon?: React.ReactNode;
  debounceMs?: number;
  queryKey?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  containerClassName,
  className,
  showIcon = true,
  iconClassName = "text-main-text",
  icon,
  debounceMs = 300,
  queryKey = "q",
  ...props
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlValue = searchParams.get(queryKey) ?? "";
  const [value, setValue] = React.useState(urlValue);

  // синхронизация с URL
  React.useEffect(() => {
    setValue(urlValue);
  }, [urlValue]);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      const trimmed = value.trim();
      const currentQuery = searchParams.get(queryKey) ?? "";

      // 🔥 если значение не изменилось — не триггерим router.replace
      if (trimmed === currentQuery) return;

      const params = new URLSearchParams(searchParams.toString());

      if (trimmed.length >= 3) {
        params.set(queryKey, trimmed);
        params.delete("cursor"); // сброс cursor при новом поиске
      } else {
        params.delete(queryKey);
        params.delete("cursor");
      }

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, {
        scroll: false,
      });
    }, debounceMs);

    return () => window.clearTimeout(timeout);
  }, [value, debounceMs, queryKey, pathname, router, searchParams]);

  return (
    <div className={cn("relative flex items-center", containerClassName)}>
      {showIcon && (
        <span className="absolute left-0.5 top-1/2 -translate-y-1/2">
          {icon ? icon : <Search className={cn("h-5 w-5", iconClassName)} />}
        </span>
      )}

      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="search..."
        className={cn(
          "w-[350px] h-[30px] bg-light-grey border-none rounded-none shadow-none " +
            "focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-gray-400 " +
            "border-b border-main-text",
          showIcon ? "pl-7" : "pl-2",
          className
        )}
        {...props}
      />
      
      {value && (
  <button
    type="button"
    onClick={() => setValue("")}
    className="absolute right-2 top-1/2 -translate-y-1/2"
  >
    <X className="h-4 w-4 text-gray-400 hover:text-black" />
  </button>
)}

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black hidden md:block" />
    </div>
  );
};

export default SearchBar;


// 🔹 Скрыть иконку (например, на мобилке)
// <SearchBar showIcon={false} />

// 🔹 Другая иконка и цвет
// <SearchBar
//   iconClassName="text-nav-yellow"
//   icon={<Search className="h-5 w-5 text-red-500" />}
// />

// 🔹 Тонкая иконка + серый цвет
// <SearchBar iconClassName="text-gray-400" />



  // {/* Icon */}
  // <span className="absolute left-1 top-1/2 -translate-y-1/2 text-black">
  //   🔍
// </span>