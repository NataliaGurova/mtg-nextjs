
"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react"; // Иконки
import clsx from "clsx";

import CardSet from "./CardSet/CardSet";
import CardColor from "./CardColor/CardColor";
import FiltersChips from "./FiltersChips/FiltersChips";
import css from "./FiltersSidebar.module.css";
import { Color } from "@/types/types";


type FilterKey = "colors" | "sets" | "rarity" | "type" | "q";

const FiltersSidebar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

    // 🔥 Состояние для мобильного меню
          const [isMobileOpen, setIsMobileOpen] = useState(false);
        
          // 🔒 Блокировка скролла сайта, когда фильтры открыты на мобилке
          useEffect(() => {
            if (isMobileOpen) {
              document.body.style.overflow = "hidden";
            } else {
              document.body.style.overflow = "unset";
            }
            return () => { document.body.style.overflow = "unset"; };
          }, [isMobileOpen]);

  // ---------- Универсальное обновление URL ----------
  const updateParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      updater(params);
      params.delete("page"); // сброс страницы при изменении фильтров
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // ---------- Выборка фильтров ----------
  const selectedFilters = useMemo(() => {
    const obj: Record<FilterKey, string[]> = {
      colors: searchParams.get("colors")?.split(",").filter(Boolean) ?? [],
      sets: searchParams.getAll("sets").map(s => s.toLowerCase()).filter(Boolean),
      rarity: searchParams.get("rarity") ? [searchParams.get("rarity")!] : [],
      type: searchParams.get("type") ? [searchParams.get("type")!] : [],
      q: searchParams.get("q") ? [searchParams.get("q")!] : [],
    };
    return obj;
  }, [searchParams]);

  // ---------- Toggle любого фильтра ----------
  const toggleFilter = useCallback(
    (key: FilterKey, value: string) => {
      updateParams((params) => {
        const current = new Set(
          key === "sets"
            ? params.getAll("sets")
            : params.get(key)?.split(",").filter(Boolean) ?? []
        );

        if (current.has(value)) current.delete(value);
        else current.add(value);

        params.delete(key);
        if (current.size > 0) {
          if (key === "sets") {
            Array.from(current).forEach((s) => params.append("sets", s));
          } else {
            params.set(key, Array.from(current).join(","));
          }
        }
      });
    },
    [updateParams]
  );

  // ---------- Remove одного элемента ----------
  const removeFilterItem = useCallback(
    (key: FilterKey, value: string) => {
      updateParams((params) => {
        const next =
          key === "sets"
            ? params.getAll("sets").filter((s) => s !== value)
            : (params.get(key)?.split(",").filter((v) => v !== value) ?? []);
  
        params.delete(key);
        if (next.length > 0) {
          if (key === "sets") next.forEach((s) => params.append("sets", s));
          else params.set(key, next.join(","));
        }
      });
    },
    [updateParams]
  );

  // ---------- Очистка всех фильтров ----------
  const clearAll = useCallback(() => {
    updateParams((params) => {
      ["colors", "sets", "rarity", "type", "q"].forEach((key) => params.delete(key));
    });
  }, [updateParams]);

  return (
    <>
      {/* 📱 МОБИЛЬНАЯ КНОПКА (видна только до 768px) */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden flex items-center justify-center gap-2 w-full py-3 bg-dark-green text-light-grey rounded-md font-semibold mb-4"
      >
        <SlidersHorizontal size={20} />
        Фільтри
      </button>

      {/* 🌑 ЗАТЕМНЕНИЕ ФОНА (видно только когда меню открыто на мобилке) */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 🗄️ САЙДБАР (Выезжает на мобилке, статичен на ПК) */}
      <aside 
        className={clsx(
          css.container, 
          isMobileOpen ? css.open : css.closed
        )}
      >
        {/* Шапка сайдбара (только для мобилки) */}
        <div className="flex justify-between items-center md:hidden mb-6 pb-4 border-b border-border text-main-text">
          <span className="font-bold text-xl">Фільтри</span>
          <button onClick={() => setIsMobileOpen(false)} aria-label="Close filters">
            <X size={24} />
          </button>
        </div>

        <FiltersChips
          onRemoveItem={removeFilterItem}
          onClearAll={clearAll}
        />

        <div className={css.formContainer}>
          <CardSet
            selectedSets={selectedFilters.sets}
            onToggleSet={(s) => toggleFilter("sets", s)}
          />
          <CardColor
            selectedColors={selectedFilters.colors as Color[]}
            onToggleColor={(c) => toggleFilter("colors", c)}
          />
          <CardColor
            selectedColors={selectedFilters.colors as Color[]}
            onToggleColor={(c) => toggleFilter("colors", c)}
          />
          <CardColor
            selectedColors={selectedFilters.colors as Color[]}
            onToggleColor={(c) => toggleFilter("colors", c)}
          />
          <CardColor
            selectedColors={selectedFilters.colors as Color[]}
            onToggleColor={(c) => toggleFilter("colors", c)}
          />
        </div>
      </aside>
    </>
  );
};

export default FiltersSidebar;

// ==================================================================================
  
//   return (

//       // <aside className="w-75 bg-white rounded-xl shadow-sm p-5 sticky top-20 h-fit">
//       <aside className={css.container}>
//       <h1 className={css.filterTitle}>Filters</h1>
//       {/* ЧИПЫ под словом Filters */}
//       <FiltersChips onRemoveSet={removeSet} onClearAll={clearAll} />
//       <div className={css.formContainer}>

//         <CardSet selectedSets={selectedSets} onToggleSet={toggleSet} />


//       </div>
//       </aside>

//   );
// };

// export default FiltersSidebar;
// ---------------------------------------------


{/* <FoilNotFoil isFoil={isFoil} onChangeFoil={onChangeFoil} /> */}

{/* <h3 className={css.title}>Card Name</h3> */}
{/* <input
  type="text"
  // value={textValue}
  // onChange={handleNameChange}
  placeholder="name"
  className={css.inputName}
/> */}
{/* <SearchBar showIcon={false} /> */}


{/* {["Sets", "Type", "Card Color", "Rarity", "Artists"].map(item => (
    <section key={item} className="mb-6">
      <details className="cursor-pointer">
        <summary className="flex justify-between font-semibold">
          {item}
          <span>{isVisible ? <FaChevronUp /> : <FaChevronDown />}</span>
    </summary>
    <div className="mt-2 text-sm text-gray-600">…filters…</div>
  </details>
</section>
))} */}

{/* <CardSet
  selectedSets={filters.sets}
  onToggleSet={(code) => dispatch(toggleSet(code))}
/> */}


      
        {/* <CardSet/>
        <CardType/>

        <CardColor />
        <CardRarity  />
        <CardArtist  /> */}


// ----------------------------------------------------------

        // "use client";

        // import { useMemo, useCallback, useState, useEffect } from "react";
        // import { usePathname, useRouter, useSearchParams } from "next/navigation";
        // import { SlidersHorizontal, X } from "lucide-react"; // Иконки
        // import clsx from "clsx";
        
        // import CardSet from "./CardSet/CardSet";
        // import CardColor from "./CardColor/CardColor";
        // import FiltersChips from "./FiltersChips/FiltersChips";
        // import css from "./FiltersSidebar.module.css";
        // import { Color } from "@/types/types";
        
        
        // type FilterKey = "colors" | "sets" | "rarity" | "type" | "q" | "finish";
        
        // const FiltersSidebar = () => {
        //   const searchParams = useSearchParams();
        //   const router = useRouter();
        //   const pathname = usePathname();
        
        //   // 🔥 Состояние для мобильного меню
        //   const [isMobileOpen, setIsMobileOpen] = useState(false);
        
        //   // 🔒 Блокировка скролла сайта, когда фильтры открыты на мобилке
        //   useEffect(() => {
        //     if (isMobileOpen) {
        //       document.body.style.overflow = "hidden";
        //     } else {
        //       document.body.style.overflow = "unset";
        //     }
        //     return () => { document.body.style.overflow = "unset"; };
        //   }, [isMobileOpen]);
        
        
        //   // ---------- Универсальное обновление URL ----------
        //   const updateParams = useCallback(
        //     (updater: (params: URLSearchParams) => void) => {
        //       const params = new URLSearchParams(searchParams.toString());
        //       updater(params);
        //       params.delete("page"); // сброс страницы при изменении фильтров
        //       const query = params.toString();
        //       router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
        //     },
        //     [searchParams, router, pathname]
        //   );
        
        //   // ---------- Выборка фильтров ----------
        //   const selectedFilters = useMemo(() => {
        //     const obj: Record<FilterKey, string | string[]> = {
        //       colors: searchParams.get("colors")?.split(",").filter(Boolean) ?? [],
        //       sets: searchParams.getAll("sets").map(s => s.toLowerCase()).filter(Boolean),
        //       rarity: searchParams.get("rarity") ? [searchParams.get("rarity")!] : [],
        //       type: searchParams.get("type") ? [searchParams.get("type")!] : [],
        //       q: searchParams.get("q") ? [searchParams.get("q")!] : [],
        //       // 👈 Добавляем выбор покрытия (берем как строку, а не массив)
        //       isFoil: searchParams.get("finish") ?? null, 
        //     };
        //     return obj;
        //   }, [searchParams]);
        
        //   // ---------- Toggle любого фильтра ----------
        //   const toggleFilter = useCallback(
        //     (key: FilterKey, value: string) => {
        //       updateParams((params) => {
        //         const current = new Set(
        //           key === "sets"
        //             ? params.getAll("sets")
        //             : params.get(key)?.split(",").filter(Boolean) ?? []
        //         );
        
        //         if (current.has(value)) current.delete(value);
        //         else current.add(value);
        
        //         params.delete(key);
        //         if (current.size > 0) {
        //           if (key === "sets") {
        //             Array.from(current).forEach((s) => params.append("sets", s));
        //           } else {
        //             params.set(key, Array.from(current).join(","));
        //           }
        //         }
        //       });
        //     },
        //     [updateParams]
        //   );
        
        //   // ⚡ НОВАЯ ФУНКЦИЯ ДЛЯ ВЗАИМОИСКЛЮЧАЮЩИХ ФИЛЬТРОВ
        //   const toggleExclusiveFilter = useCallback(
        //     (key: FilterKey, value: string) => {
        //       updateParams((params) => {
        //         const current = params.get(key);
                
        //         // Если кликнули по уже активной кнопке — сбрасываем фильтр (показываем всё)
        //         if (current === value) {
        //           params.delete(key);
        //         } else {
        //           // Иначе ставим новое значение (заменяя старое)
        //           params.set(key, value);
        //         }
        //       });
        //     },
        //     [updateParams]
        //   );
        
        //   // ---------- Remove одного элемента ----------
        //   // const removeFilterItem = useCallback(
        //   //   (key: FilterKey, value: string) => {
        //   //     updateParams((params) => {
        //   //       const next =
        //   //         key === "sets"
        //   //           ? params.getAll("sets").filter((s) => s !== value)
        //   //           : (params.get(key)?.split(",").filter((v) => v !== value) ?? []);
          
        //   //       params.delete(key);
        //   //       if (next.length > 0) {
        //   //         if (key === "sets") next.forEach((s) => params.append("sets", s));
        //   //         else params.set(key, next.join(","));
        //   //       }
        //   //     });
        //   //   },
        //   //   [updateParams]
        //   // );
        
        //   // ---------- Remove одного элемента ----------
        //   const removeFilterItem = useCallback(
        //     (key: FilterKey, value: string) => {
        //       updateParams((params) => {
                
        //         // 🔥 Если это эксклюзивный фильтр (например, покрытие) — просто удаляем ключ
        //         if (key === "finish") {
        //           params.delete(key);
        //           return; // Выходим из функции, дальше делать нечего
        //         }
        
        //         // Логика для множественных фильтров (массивы сетов, цветов и т.д.)
        //         const next =
        //           key === "sets"
        //             ? params.getAll("sets").filter((s) => s !== value)
        //             : (params.get(key)?.split(",").filter((v) => v !== value) ?? []);
        
        //         params.delete(key);
        //         if (next.length > 0) {
        //           if (key === "sets") next.forEach((s) => params.append("sets", s));
        //           else params.set(key, next.join(","));
        //         }
        //       });
        //     },
        //     [updateParams]
        //   );
        
        //   // ---------- Очистка всех фильтров ----------
        //   const clearAll = useCallback(() => {
        //     updateParams((params) => {
        //       ["colors", "sets", "rarity", "type", "q", "finish"].forEach((key) => params.delete(key));
        //     });
        //   }, [updateParams]);
        
        //   return (
        //     <>
        //       {/* 📱 МОБИЛЬНАЯ КНОПКА (видна только до 768px) */}
        //       <button
        //         onClick={() => setIsMobileOpen(true)}
        //         className="md:hidden flex items-center justify-center gap-2 w-full py-3 bg-dark-green text-light-grey rounded-md font-semibold mb-4"
        //       >
        //         <SlidersHorizontal size={20} />
        //         Фільтри
        //       </button>
        
        //       {/* 🌑 ЗАТЕМНЕНИЕ ФОНА (видно только когда меню открыто на мобилке) */}
        //       {isMobileOpen && (
        //         <div 
        //           className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
        //           onClick={() => setIsMobileOpen(false)}
        //         />
        //       )}
        
        //       {/* 🗄️ САЙДБАР (Выезжает на мобилке, статичен на ПК) */}
        //       <aside 
        //         className={clsx(
        //           css.container, 
        //           isMobileOpen ? css.open : css.closed
        //         )}
        //       >
        //         {/* Шапка сайдбара (только для мобилки) */}
        //         <div className="flex justify-between items-center md:hidden mb-6 pb-4 border-b border-border text-main-text">
        //           <span className="font-bold text-xl">Фільтри</span>
        //           <button onClick={() => setIsMobileOpen(false)} aria-label="Close filters">
        //             <X size={24} />
        //           </button>
        //         </div>
        
        //         <FiltersChips
        //           onRemoveItem={removeFilterItem}
        //           onClearAll={clearAll}
        //         />
        
        //         <div className={css.formContainer}>
        //           {/* 👈 Вставляем наш переключатель Фойлы */}
        //       <CardFoil 
        //         selectedFoil={selectedFilters.finish as string | null}
        //         onToggle={(val) => toggleExclusiveFilter("finish", val)}
        //       />
        //           <CardSet
        //             selectedSets={selectedFilters.sets}
        //             onToggleSet={(s) => toggleFilter("sets", s)}
        //           />
        //           <CardColor
        //             selectedColors={selectedFilters.colors as Color[]}
        //             onToggleColor={(c) => toggleFilter("colors", c)}
        //           />
        //       {/* <CardType/>
        //       <CardRarity  />
        //       <CardArtist  /> */}
        //         </div>
        //       </aside>
        //     </>
        //   );
        // };
        
        
        // export default FiltersSidebar;