// // components/filters/CardSet/CardSet.tsx

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import styles from "./CardSet.module.css";

// type SetSummary = {
//   set: string;
//   set_name: string;
//   count: number;
//   iconSvgUrl: string | null;
// };

// interface CardSetProps {
//   selectedSets: string[];
//   onToggleSet: (setCode: string) => void;
// }

// const CardSet = ({ selectedSets, onToggleSet }: CardSetProps) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [items, setItems] = useState<SetSummary[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleToggle = () => setIsVisible((prev) => !prev);

//   useEffect(() => {
//     const run = async () => {
//       setLoading(true);
//       const res = await fetch("/api/sets/summary");
//       const data = (await res.json()) as { items: SetSummary[] };
//       setItems(data.items ?? []);
//       setLoading(false);
//     };
//     run();
//   }, []);

//   return (
//     <div className={styles.container}>
//       {/* 🔽 КНОПКА ВМЕСТО DETAILS */}
//       <button
//         className={styles.titleBtn}
//         type="button"
//         onClick={handleToggle}
//       >
//         <b className={styles.title}>Sets</b>
//         {isVisible ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//       </button>

//       {/* 🔽 СПИСОК */}
//       {isVisible && (
//         <div className={styles.listWrap}>
//           {loading ? (
//             <div>Loading…</div>
//           ) : (
//             <ul className="flex flex-col gap-2">
//               {items.map((s) => {
//                 const checked = selectedSets.includes(s.set);

//                 return (
//                   <li key={s.set}>
//                     <label className={`${styles.item} ${styles.label}`}>
//                       <input
//                         className={styles.input}
//                         type="checkbox"
//                         checked={checked}
//                         onChange={() => onToggleSet(s.set)}
//                       />

//                       {/* Кастомный чекбокс */}
//                       <span className={styles.box} aria-hidden="true">
//                         <svg
//                           className={styles.check}
//                           viewBox="0 0 24 24"
//                           fill="none"
//                         >
//                           <path
//                             d="M20 6L9 17l-5-5"
//                             stroke="white"
//                             strokeWidth="3"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                       </span>

//                       {/* Иконка сета */}
//                       {s.iconSvgUrl ? (
//                         <Image
//                           src={s.iconSvgUrl}
//                           alt={s.set_name}
//                           width={20}
//                           height={20}
//                         />
//                       ) : (
//                         <span className="w-[20px] text-[11px] font-bold uppercase">
//                           {s.set}
//                         </span>
//                       )}

//                       <span className={styles.setName}>
//                         {s.set_name}
//                       </span>

//                       <span className="text-gray-500">
//                         {s.count}
//                       </span>
//                     </label>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardSet;


// components/filters/CardSet/CardSet.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation"; // 🔹 Импортируем хук
import styles from "./CardSet.module.css";

type SetSummary = {
  set: string;
  set_name: string;
  count: number;
  iconSvgUrl: string | null;
};

interface CardSetProps {
  selectedSets: string[];
  onToggleSet: (setCode: string) => void;
}

const CardSet = ({ selectedSets, onToggleSet }: CardSetProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [items, setItems] = useState<SetSummary[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Читаем поисковый запрос из URL
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.trim() || "";

  const handleToggle = () => setIsVisible((prev) => !prev);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      
      // 🔹 Добавляем параметр `q` к запросу на сервер, если он есть
      const url = q ? `/api/sets/summary?q=${encodeURIComponent(q)}` : "/api/sets/summary";
      
      try {
        const res = await fetch(url);
        const data = (await res.json()) as { items: SetSummary[] };
        setItems(data.items ?? []);
      } catch (error) {
        console.error("Failed to fetch sets summary", error);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [q]); // 🔹 Перезапускаем useEffect каждый раз, когда меняется запрос `q`

  // Если список сетов пуст, можно вообще скрыть этот блок
  if (items.length === 0 && !loading) return null;

  return (
    <div className={styles.container}>
      <button
        className={styles.titleBtn}
        type="button"
        onClick={handleToggle}
      >
        <b className={styles.title}>Sets</b>
        {isVisible ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>

      {isVisible && (
        <div className={styles.listWrap}>
          {loading ? (
            <div className="text-sm py-2">Loading…</div>
          ) : (
            <ul className="flex flex-col gap-2">
              {items.map((s) => {
                // 🔹 УМНЫЕ ГАЛОЧКИ:
                // Если пользователь выбрал конкретные сеты -> отмечаем только их.
                // Если пользователь ищет через поиск (q есть) и не выбирал сеты -> отмечаем ВСЕ найденные сеты.
                const isExplicitlyChecked = selectedSets.includes(s.set);
                const isImplicitlyChecked = selectedSets.length === 0 && q.length > 0;
                const checked = isExplicitlyChecked || isImplicitlyChecked;

                return (
                  <li key={s.set}>
                    {/* <label className={`${styles.item} ${styles.label} ${checked ? "opacity-100" : "opacity-70 hover:opacity-100"}`}> */}
                    <label className={`${styles.item} ${styles.label} ${checked}`}>
                      <input
                        className={styles.input}
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleSet(s.set)}
                      />

                      {/* Кастомный чекбокс */}
                      <span className={styles.box} aria-hidden="true">
                        {checked && (
                          <svg
                            className={styles.check}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M20 6L9 17l-5-5"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>

                      {/* Иконка сета */}
                      {s.iconSvgUrl ? (
                        <Image
                          src={s.iconSvgUrl}
                          alt={s.set_name}
                          width={20}
                          height={20}
                          // className="opacity-100"
                        />
                      ) : (
                        <span className="w-[20px] text-[11px] font-bold uppercase text-center">
                          {s.set}
                        </span>
                      )}

                      <span className={`${styles.setName} ${checked ? "opacity-100" : "opacity-70 hover:opacity-100"}`}>
                        {s.set_name}
                      </span>

                      <span className="text-gray-500 text-sm ml-auto">
                        {s.count}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CardSet;