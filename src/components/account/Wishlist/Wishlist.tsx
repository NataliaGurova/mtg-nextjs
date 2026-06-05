// // src/components/Wishlist/Wishlist.tsx
// import { DbCard } from "@/types/types";
// import CardItem from "@/components/cards/CardItem/CardItem";
// import css from "./Wishlist.module.css";

// interface Props {
//   savedCards: DbCard[];
// }

// const Wishlist = ({ savedCards }: Props) => {
//   return (
//     <div className={css.container}>
//       <h2 className={css.title}>Список вподобань</h2>
      
//       {savedCards.length === 0 ? (
//         <div className={css.emptyState}>
//           <p className={css.emptyText}>Всі ваші улюблені карти в одному місці.</p>
//           <p className={css.emptySubtext}>
//           Почніть додавати, клацнувши маленьке сердечко - ми синхронізуємо їх на всіх ваших пристроях.
//           </p>
//         </div>
//       ) : (
//         <div className={css.grid}>
//           {savedCards.map((card) => (
//             <CardItem 
//               key={card._id.toString()} 
//               card={card} 
//               variant="glass" 
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;

// src/components/account/Wishlist/Wishlist.tsx
// import { DbCard } from "@/types/types";
// import CardItem from "@/components/cards/CardItem/CardItem";
// import css from "./Wishlist.module.css";
// import Image from "next/image";
// import Link from "next/link";
// import SetIcon from "@/components/SetIcon/SetIcon";

// // Тип одного запису з setsData.json
// interface FullsetInfo {
//   set: string;
//   set_name: string;
//   isFoil: boolean;
//   prices: number;
//   imageUrl?: string;
//   description?: string;
// }

// interface Props {
//   savedCards: DbCard[];
//   savedFullsets: FullsetInfo[];
// }

// const Wishlist = ({ savedCards, savedFullsets }: Props) => {
//   const isEmpty = savedCards.length === 0 && savedFullsets.length === 0;

//   return (
//     <div className={css.container}>
//       <h2 className={css.title}>Список вподобань</h2>

//       {isEmpty ? (
//         <div className={css.emptyState}>
//           <p className={css.emptyText}>Всі ваші улюблені карти в одному місці.</p>
//           <p className={css.emptySubtext}>
//             Почніть додавати, клацнувши маленьке сердечко — ми синхронізуємо їх на всіх ваших пристроях.
//           </p>
//         </div>
//       ) : (
//         <>
//           {/* 🔹 ФУЛСЕТИ */}
//           {savedFullsets.length > 0 && (
//             <div className={css.section}>
//               <h3 className={css.sectionTitle}>Фулсети</h3>
//               <div className={css.fullsetGrid}>
//                 {savedFullsets.map((s) => (
//                   <Link
//                     key={s.set}
//                     href={`/fullsets/${s.set.toLowerCase()}`}
//                     className={css.fullsetCard}
//                   >
//                     <div className={css.fullsetImageWrap}>
//                       <Image
//                         src={s.imageUrl || "/mtg/Chest_tr.png"}
//                         alt={s.set_name}
//                         fill
//                         className={css.fullsetImage}
//                       />
//                     </div>
//                     <div className={css.fullsetInfo}>
//                       <div className={css.fullsetHeader}>
//                         <SetIcon setCode={s.set} theme="bronze" size={20} />
//                         <span className={css.fullsetName}>{s.set_name}</span>
//                         {s.isFoil && (
//                           <span className={css.foilBadge}>Foil</span>
//                         )}
//                       </div>
//                       {s.prices > 0 && (
//                         <p className={css.fullsetPrice}>
//                           {s.prices.toLocaleString("uk-UA")} ₴
//                         </p>
//                       )}
                      
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* КАРТИ */}
//           {savedCards.length > 0 && (
//             <div className={css.section}>
//               {savedFullsets.length > 0 && (
//                 <h3 className={css.sectionTitle}>Карти</h3>
//               )}
//               <div className={css.grid}>
//                 {savedCards.map((card) => (
//                   <CardItem
//                     key={card._id.toString()}
//                     card={card}
//                     variant="glass"
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Wishlist;

// src/components/account/Wishlist/Wishlist.tsx
import { DbCard } from "@/types/types";
import CardItem from "@/components/cards/CardItem/CardItem";
import css from "./Wishlist.module.css";
import Image from "next/image";
import Link from "next/link";
import SetIcon from "@/components/SetIcon/SetIcon";
import AddToCartSection from "@/components/cards/AddToCartSection/AddToCartSection";
import WishlistButton from "@/components/WishlistButton/WishlistButton";

interface FullsetInfo {
  set: string;
  set_name: string;
  isFoil: boolean;
  prices: number;
  imageUrl?: string;
  description?: string;
}

interface Props {
  savedCards: DbCard[];
  savedFullsets: FullsetInfo[];
}

const Wishlist = ({ savedCards, savedFullsets }: Props) => {
  const isEmpty = savedCards.length === 0 && savedFullsets.length === 0;

  return (
    <div className={css.container}>
      <h2 className={css.title}>Список бажань</h2>

      {isEmpty ? (
        <div className={css.emptyState}>
          <p className={css.emptyText}>Всі ваші улюблені карти в одному місці.</p>
          <p className={css.emptySubtext}>
            Почніть додавати, клацнувши маленьке сердечко — ми синхронізуємо їх на всіх ваших пристроях.
          </p>
        </div>
      ) : (
        <>
          {/* 🔹 ФУЛСЕТИ */}
          {savedFullsets.length > 0 && (
            <div className={css.section}>
              <h3 className={css.sectionTitle}>Фулсети</h3>
              <div className={css.fullsetGrid}>
                {savedFullsets.map((s) => {
                  // 1. СТВОРЮЄМО ОБ'ЄКТ КОРЗИНИ ДЛЯ КОЖНОГО ФУЛСЕТУ
                  const cartItem = {
                    id: `fullset_${s.set.toLowerCase()}`,
                    scryfallId: "",
                    name: s.set_name,
                    set_name: s.set_name,
                    image: s.imageUrl || "/mtg/Chest_tr.png",
                    price: s.prices,
                    quantity: 1,
                    stock: 1,
                    condition: "NM",
                    language: "en",
                    foil: s.isFoil ? "foil" : null,
                    type: "fullset" as const,
                  };

                  return (
                    // 2. ЗМІНЮЄМО <Link> НА <div>, щоб не ламати HTML вкладеними кнопками
                    <div key={s.set} className={css.fullsetCard}>
                      
                      <Link href={`/fullsets/${s.set.toLowerCase()}`}>
                        <div className={css.fullsetImageWrap}>
                          <Image
                            src={s.imageUrl || "/mtg/Chest_tr.png"}
                            alt={s.set_name}
                            fill
                            className={css.fullsetImage}
                          />
                        </div>
                      </Link>

                      <div className={css.fullsetInfo}>
                        <Link href={`/fullsets/${s.set.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                          <div className={css.fullsetHeader}>
                            <SetIcon setCode={s.set} theme="bronze" size={20} />
                            <span className={css.fullsetName}>{s.set_name}#{s.set.toUpperCase()}</span>
                            {/* {s.isFoil && (
                              <span className={css.foilBadge}>Foil</span>
                            )} */}
                          </div>
                        </Link>

                        <div className={css.fullsetDetails}>
                          {s.isFoil && (
                              <span className={css.foilBadge}>Foil</span>
                            )}
                          <p className={css.fullsetPrice}>
                            {s.prices.toLocaleString("uk-UA")} ₴
                          </p>
                        </div>

                        {/* 3. ДОДАЄМО КНОПКИ КУПІВЛІ ТА ВИДАЛЕННЯ */}
                        <div className={css.fullsetActions}>
                          <AddToCartSection
                            mode="fullset"
                            fullsetItem={cartItem}
                            showQuantity={false}
                            buttonVariant="loadMore"
                          />
                          <WishlistButton
                            cardId={cartItem.id}
                            variant="transparent"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* КАРТИ */}
          {savedCards.length > 0 && (
            <div className={css.section}>
              {savedFullsets.length > 0 && (
                <h3 className={css.sectionTitle}>Карти</h3>
              )}
              <div className={css.grid}>
                {savedCards.map((card) => (
                  <CardItem
                    key={card._id.toString()}
                    card={card}
                    variant="glass"
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Wishlist;