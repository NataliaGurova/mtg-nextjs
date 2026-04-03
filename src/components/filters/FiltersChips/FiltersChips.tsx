
// "use client";

// import { useMemo } from "react";
// import { useSearchParams } from "next/navigation";
// import { X } from "lucide-react";

// interface FiltersChipsProps {
//   onRemoveSet: (code: string) => void;
//   onClearAll: () => void;
// }

// const chipClass =
//   "inline-flex items-center gap-2 rounded-md border px-3 py-1 text-[14px] leading-tight";

// const FiltersChips = ({ onRemoveSet, onClearAll }: FiltersChipsProps) => {
//   const sp = useSearchParams();

//   const q = (sp.get("q") ?? "").trim();


//   const sets = useMemo(() => {
//     return sp
//       .getAll("sets")
//       .map(s => s.trim().toLowerCase())
//       .filter(Boolean);
//   }, [sp]);
  

//   const hasAny = Boolean(q) || sets.length > 0;

//   return (
//     <section className="mb-6">

//         {hasAny && (
//       <div className="flex items-center justify-between">
//         <b className="text-[18px] leading-tight">Filters</b>
//           <button
//             type="button"
//             className="text-[14px] underline"
//             onClick={onClearAll}
//           >
//             Clear all
//           </button>
//       </div>
//         )}

//       {hasAny && (
//         <div className="mt-3 flex flex-wrap gap-2">


//           {sets.map((code) => (
//             <button
//               key={code}
//               type="button"
//               className={chipClass}
//               onClick={() => onRemoveSet(code)}
//               title="Remove filter"
//             >
//               {code.toUpperCase()}
//               <X size={14} />
//             </button>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default FiltersChips;
"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

type FilterKey = "colors" | "sets" | "rarity" | "type" | "q";

interface FiltersChipsProps {
  onRemoveItem: (key: FilterKey, value: string) => void;
  onClearAll: () => void;
}

const chipClass =
  "inline-flex items-center gap-2 rounded-md border px-3 py-1 text-[14px] leading-tight";

const FiltersChips = ({ onRemoveItem, onClearAll }: FiltersChipsProps) => {
  const sp = useSearchParams();

  const filters = useMemo(() => ({
    q: sp.get("q")?.trim() || null,
    sets: sp.getAll("sets").map(s => s.trim().toLowerCase()).filter(Boolean),
    colors: sp.get("colors")?.split(",").map(c => c.trim()).filter(Boolean) ?? [],
    rarity: sp.get("rarity") ? [sp.get("rarity")!] : [],
    type: sp.get("type") ? [sp.get("type")!] : [],
  }), [sp]);

  const hasAny = Object.values(filters).some(val =>
    Array.isArray(val) ? val.length > 0 : Boolean(val)
  );

  if (!hasAny) return null;

  const renderChips = (key: FilterKey, values: string[]) =>
    values.map((v) => (
      <button
        key={`${key}-${v}`}
        type="button"
        className={chipClass}
        onClick={() => onRemoveItem(key, v)}
        title="Remove filter"
      >
        {v.toUpperCase()}
        <X size={14} />
      </button>
    ));

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between">
        <b className="text-[18px] leading-tight">Filters</b>
        <button type="button" className="text-[14px] underline" onClick={onClearAll}>
          Clear all
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {filters.sets.length > 0 && renderChips("sets", filters.sets)}
        {filters.colors.length > 0 && renderChips("colors", filters.colors)}
        {filters.rarity.length > 0 && renderChips("rarity", filters.rarity)}
        {filters.type.length > 0 && renderChips("type", filters.type)}
        {filters.q && renderChips("q", [filters.q])}
      </div>
    </section>
  );
};

export default FiltersChips;
