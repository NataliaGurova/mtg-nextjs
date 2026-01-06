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
"use client";

// import { useState } from "react";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CardSet from "./CardSet/CardSet";
import css from "./FiltersSidebar.module.css"
import FiltersChips from "./FiltersChips/FiltersChips";
// import { useState } from "react";

// const Filters = ({ onChange, textValue, isFoil, onChangeFoil }) => {
// const FiltersSidebar = () => {


//   const [selectedSets, setSelectedSets] = useState<string[]>([]);

//   const toggleSet = (code: string) => {
//     setSelectedSets((prev) =>
//       prev.includes(code) ? prev.filter((x) => x !== code) : [...prev, code]
//     );
//   };
const FiltersSidebar = () => {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedSets = useMemo(() => {
    const raw = sp.get("sets") ?? "";
    return raw.split(",").map(s => s.trim()).filter(Boolean);
  }, [sp]);

  const updateParams = (updater: (p: URLSearchParams) => void) => {
    const p = new URLSearchParams(sp.toString());
    updater(p);

    // при любом изменении фильтров — сбрасываем page
    p.delete("page");

    const qs = p.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggleSet = (code: string) => {
    updateParams((p) => {
      const raw = p.get("sets") ?? "";
      const arr = raw.split(",").map(s => s.trim()).filter(Boolean);

      const next = arr.includes(code)
        ? arr.filter(x => x !== code)
        : [...arr, code];

      if (next.length) p.set("sets", next.join(","));
      else p.delete("sets");
    });
  };

  const removeSet = (code: string) => {
    updateParams((p) => {
      const raw = p.get("sets") ?? "";
      const arr = raw.split(",").map(s => s.trim()).filter(Boolean);
      const next = arr.filter(x => x !== code);

      if (next.length) p.set("sets", next.join(","));
      else p.delete("sets");
    });
  };

  const clearAll = () => {
    updateParams((p) => {
      p.delete("sets");
      p.delete("q");
      p.delete("rarity");
      p.delete("type");
      p.delete("color");
      // добавляй сюда другие фильтры по мере появления
    });
  };



// --------------------------
  
  return (
    // <Container>
      // <aside className="w-75 bg-white rounded-xl shadow-sm p-5 sticky top-20 h-fit">
      <aside className={css.container}>
      <h1 className={css.filterTitle}>Filters</h1>
      {/* ЧИПЫ под словом Filters */}
      <FiltersChips onRemoveSet={removeSet} onClearAll={clearAll} />
      <div className={css.formContainer}>

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
        <CardSet selectedSets={selectedSets} onToggleSet={toggleSet} />
{/* <CardSet
  selectedSets={filters.sets}
  onToggleSet={(code) => dispatch(toggleSet(code))}
/> */}


      
        {/* <CardSet/>
        <CardType/>

        <CardColor />
        <CardRarity  />
        <CardArtist  /> */}

        {/* <button type="submit">Search</button> */}
      </div>
      </aside>
    // </Container>  
  );
};

export default FiltersSidebar;
