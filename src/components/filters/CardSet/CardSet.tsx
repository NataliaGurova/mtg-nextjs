
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./CardSet.module.css";

type SetSummary = {
  set: string;
  set_name: string;
  count: number;
  iconSvgUrl: string | null;
};

interface CardSetProps {
  selectedSets: string[]; // массив set codes
  onToggleSet: (setCode: string) => void;
}

const CardSet = ({ selectedSets, onToggleSet }: CardSetProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SetSummary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const res = await fetch("/api/sets/summary");
      const data = (await res.json()) as { items: SetSummary[] };
      setItems(data.items ?? []);
      setLoading(false);
    };
    run();
  }, []);

  return (
    <section className="mb-6">
      <details open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
        <summary className="group flex justify-between text-[18px] font-bold cursor-pointer select-none mb-3">
        Sets
          <span>{open ? <ChevronUp size={24} /> : <ChevronDown size={24} />}</span>
          {/* <span><ChevronsDown
            size={18}
            className={`transition-all duration-200 text-gray-500 group-hover:text-[var(--color-dark-green)]
            ${isVisible ? "rotate-180" : ""}
            `}
            />
          </span> */}
        </summary>

        
        <div className={styles.listWrap}>
      
          {loading ? (
            <div>Loading…</div>
          ) : (
            <ul className="flex flex-col gap-2">
              {items.map((s) => {
                const checked = selectedSets.includes(s.set);

                return (

<li key={s.set}>
  <label className={`${styles.item} ${styles.label}`}>
    <input
      className={styles.input}
      type="checkbox"
      checked={checked}
      onChange={() => onToggleSet(s.set)}
    />

    <span className={styles.box} aria-hidden="true">
      {/* белая галочка как SVG */}
      {/* <svg className={styles.check} viewBox="0 0 24 24" fill="none"> */}
      <svg className={styles.check} viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
        </span>
                      
                        {s.iconSvgUrl ? (
                        <Image
                          src={s.iconSvgUrl}
                          alt={s.set_name}
                          width={20}
                          height={20}
                        />
                      ) : (
                        <span className="w-[20px] text-[11px] font-bold uppercase">
                          {s.set}
                        </span>
                      )}

    <span className={styles.setName}>{s.set_name}</span>
    <span className="text-gray-500">{s.count}</span>
  </label>
</li>

                  // <li key={s.set}>
                  //   <label className="flex items-center gap-3 cursor-pointer">
                  //     <input
                  //       type="checkbox"
                  //       checked={checked}
                  //       onChange={() => onToggleSet(s.set)}
                  //     />

                  //     {s.iconSvgUrl ? (
                  //       <Image
                  //         src={s.iconSvgUrl}
                  //         alt={s.set_name}
                  //         width={20}
                  //         height={20}
                  //       />
                  //     ) : (
                  //       <span className="w-[20px] text-[11px] font-bold uppercase">
                  //         {s.set}
                  //       </span>
                  //     )}

                  //     <span className="flex-1">{s.set_name}</span>
                  //     <span className="text-gray-500">{s.count}</span>
                  //   </label>
                  // </li>
                );
              })}
            </ul>
          )}
        </div>
      </details>
    </section>
  );
};

export default CardSet;
