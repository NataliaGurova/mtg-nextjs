
"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

interface FiltersChipsProps {
  onRemoveSet: (code: string) => void;
  onClearAll: () => void;
}

const chipClass =
  "inline-flex items-center gap-2 rounded-md border px-3 py-1 text-[14px] leading-tight";

const FiltersChips = ({ onRemoveSet, onClearAll }: FiltersChipsProps) => {
  const sp = useSearchParams();

  const q = (sp.get("q") ?? "").trim();

  // const sets = useMemo(() => {
  //   const raw = sp.get("sets") ?? "";
  //   return raw.split(",").map(s => s.trim()).filter(Boolean);
  // }, [sp]);

  const sets = useMemo(() => {
    return sp
      .getAll("sets")
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);
  }, [sp]);
  

  const hasAny = Boolean(q) || sets.length > 0;

  return (
    <section className="mb-6">

        {hasAny && (
      <div className="flex items-center justify-between">
        <b className="text-[18px] leading-tight">Filters</b>
          <button
            type="button"
            className="text-[14px] underline"
            onClick={onClearAll}
          >
            Clear all
          </button>
      </div>
        )}

      {hasAny && (
        <div className="mt-3 flex flex-wrap gap-2">
          {q && (
            <span className={chipClass}>
              q: {q}
              {/* если хочешь убирать q тоже — скажи, добавлю onRemoveQuery */}
            </span>
          )}

          {sets.map((code) => (
            <button
              key={code}
              type="button"
              className={chipClass}
              onClick={() => onRemoveSet(code)}
              title="Remove filter"
            >
              {code.toUpperCase()}
              <X size={14} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default FiltersChips;
