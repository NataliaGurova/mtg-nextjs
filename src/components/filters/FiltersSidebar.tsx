// import Container from "../container/Container";
// import SearchBar from "../SearchBar/SearchBar";

// const FiltersSidebar = () => {
  
//   return (
  //     <aside className="w-64 bg-white rounded-xl shadow-sm p-5 sticky top-20 h-fit">
  //       <h2 className="text-3xl font-bold mb-6">Filters</h2>
  
  //       {/* Regular / Foil Toggle */}
  //       <div className="flex gap-4 mb-6">
  //         <button className="px-4 py-2 rounded-md border border-gray-300">Regular</button>
  //         <button className="px-4 py-2 rounded-md bg-yellow-100 border border-yellow-300">
  //           Foils
  //         </button>
  //       </div>
  
  //       {/* Card Name */}
  //       <div className="mb-6">
  //         <label className="font-semibold">Card Name</label>
  //         <input
  //           placeholder="name"
  //           className="w-full border-b p-1 bg-transparent focus:outline-none"
  //         />
  //       </div>
  
  //       {["Sets", "Type", "Card Color", "Rarity", "Artists"].map(item => (
    //         <section key={item} className="mb-6">
    //           <details className="cursor-pointer">
    //             <summary className="flex justify-between font-semibold">
    //               {item}
    //               <span>{isVisible ? <FaChevronUp /> : <FaChevronDown />}</span>
//             </summary>
//             <div className="mt-2 text-sm text-gray-600">…filters…</div>
//           </details>
//         </section>
//       ))}
//     </aside>
//   );
// }

// export default FiltersSidebar;

// -------------------------------------------------

// "use client";

// import { useMemo } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import CardSet from "./CardSet/CardSet";
// import css from "./FiltersSidebar.module.css"
// import FiltersChips from "./FiltersChips/FiltersChips";



// const FiltersSidebar = () => {
//   const sp = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();


//   const selectedSets = useMemo(() => {
//     return sp
//       .getAll("sets")
//       .map(s => s.trim().toLowerCase())
//       .filter(Boolean);
//   }, [sp]);
  

//   const updateParams = (updater: (p: URLSearchParams) => void) => {
//     const p = new URLSearchParams(sp.toString());
//     updater(p);

//     // при любом изменении фильтров — сбрасываем page
//     p.delete("page");

//     const qs = p.toString();
//     router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
//   };


//   const toggleSet = (code: string) => {
//     updateParams((p) => {
//       const current = p.getAll("sets");
  
//       const next = current.includes(code)
//         ? current.filter(x => x !== code)
//         : [...current, code];
  
//       p.delete("sets");
//       next.forEach(s => p.append("sets", s));
//     });
//   };
  

//   const removeSet = (code: string) => {
//     updateParams((p) => {
//       const next = p.getAll("sets").filter(x => x !== code);
  
//       p.delete("sets");
//       next.forEach(s => p.append("sets", s));
//     });
//   };
          

//   const clearAll = () => {
//     updateParams((p) => {
//       p.delete("sets");
//       p.delete("q");
//       p.delete("rarity");
//       p.delete("type");
//       p.delete("color");
//       // добавляй сюда другие фильтры по мере появления
//     });
//   };



// // --------------------------

"use client";

import { useMemo, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CardSet from "./CardSet/CardSet";
import FiltersChips from "./FiltersChips/FiltersChips";
import css from "./FiltersSidebar.module.css";

const FiltersSidebar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ---------- НОРМАЛЬНОЕ чтение сетов ----------
  const selectedSets = useMemo(() => {
    return searchParams
      .getAll("sets")
      .map((s) => s.toLowerCase())
      .filter(Boolean);
  }, [searchParams]);

  // ---------- Универсальное обновление URL ----------
  const updateParams = useCallback(
    (updater: (p: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());

      updater(params);

      // Сброс page при изменении фильтра
      params.delete("page");

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [searchParams, router, pathname]
  );

  // ---------- Toggle set ----------
  const toggleSet = useCallback(
    (code: string) => {
      updateParams((params) => {
        const current = new Set(params.getAll("sets"));

        if (current.has(code)) {
          current.delete(code);
        } else {
          current.add(code);
        }

        params.delete("sets");
        Array.from(current).forEach((s) => params.append("sets", s));
      });
    },
    [updateParams]
  );

  // ---------- Remove single set ----------
  const removeSet = useCallback(
    (code: string) => {
      updateParams((params) => {
        const next = params.getAll("sets").filter((s) => s !== code);

        params.delete("sets");
        next.forEach((s) => params.append("sets", s));
      });
    },
    [updateParams]
  );

  // ---------- Clear all ----------
  const clearAll = useCallback(() => {
    updateParams((params) => {
      params.delete("sets");
      params.delete("q");
      params.delete("rarity");
      params.delete("type");
      params.delete("color");
    });
  }, [updateParams]);

  return (
    <aside className={css.container}>
      {/* <h2 className={css.filterTitle}>Filters</h2> */}

      <FiltersChips onRemoveSet={removeSet} onClearAll={clearAll} />

      <div className={css.formContainer}>
        <CardSet selectedSets={selectedSets} onToggleSet={toggleSet} />
      </div>
    </aside>
  );
};

export default FiltersSidebar;

  
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
