

// import { notFound } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import Container from "@/components/Container/Container";
// import SetIcon from "@/components/SetIcon/SetIcon";
// import setsData from "@/lib/constants/setsData.json";
// import { Metadata } from "next";

// interface SetPageProps {
//   params: Promise<{ set: string }>;
// }

// // Тип данных от Scryfall
// interface ScryfallSet {
//   name: string;
//   released_at: string;
//   card_count: number;
//   set_type: string;
//   icon_svg_uri: string;
//   scryfall_uri: string;
//   block?: string;
// }

// // Человекочитаемые названия типов сетов
// const SET_TYPE_LABELS: Record<string, string> = {
//   expansion: "Expansion",
//   core: "Core Set",
//   masters: "Masters",
//   commander: "Commander",
//   draft_innovation: "Draft Innovation",
//   funny: "Un-Set",
//   starter: "Starter",
//   box: "Box Set",
//   promo: "Promo",
//   token: "Token",
//   memorabilia: "Memorabilia",
//   arsenal: "Arsenal",
//   from_the_vault: "From the Vault",
//   spellbook: "Spellbook",
//   premium_deck: "Premium Deck",
//   duel_deck: "Duel Deck",
//   archenemy: "Archenemy",
//   planechase: "Planechase",
//   conspiracy: "Conspiracy",
// };

// async function fetchScryfallSet(setCode: string): Promise<ScryfallSet | null> {
//   try {
//     const res = await fetch(`https://api.scryfall.com/sets/${setCode}`, {
//       next: { revalidate: 60 * 60 * 24 }, // кэш 24 часа
//     });
//     if (!res.ok) return null;
//     return await res.json();
//   } catch {
//     return null;
//   }
// }

// export async function generateMetadata({ params }: SetPageProps): Promise<Metadata> {
//   const { set } = await params;
//   const item = setsData.find((s) => s.set === set);
//   if (!item) return { title: "Set not found" };
//   return { title: `${item.set_name} | Fullsets` };
// }

// export async function generateStaticParams() {
//   return setsData.map((item) => ({ set: item.set }));
// }

// const SetDetailPage = async ({ params }: SetPageProps) => {
//   const { set } = await params;

//   // Данные из нашего JSON
//   const item = setsData.find((s) => s.set === set);
//   if (!item) notFound();

//   // Данные из Scryfall
//   const scryfallData = await fetchScryfallSet(set);

//   const formattedPrice = item.prices.toLocaleString("uk-UA");
//   const setbinderUrl = `https://setbinder.com/sets/${item.set}`;

//   // Форматируем дату релиза
//   const releaseDate = scryfallData?.released_at
//     ? new Date(scryfallData.released_at).toLocaleDateString("uk-UA", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       })
//     : null;

//   const setTypeLabel = scryfallData?.set_type
//     ? (SET_TYPE_LABELS[scryfallData.set_type] ?? scryfallData.set_type)
//     : null;

//   return (
//     <Container className="py-10">
//       <div className="max-w-xl mx-auto flex flex-col gap-6">

//         {/* Назад */}
//         <Link
//           href="/fullsets"
//           className="self-start text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-1"
//         >
//           ← Назад до сетів
//         </Link>

//         {/* Сундук */}
//         <div className="relative flex justify-center">
//           <Image
//             src={item.isFoil ? "/mtg/Chest_foil.png" : "/mtg/Chest_nonfoil.png"}
//             alt={item.set_name}
//             width={320}
//             height={200}
//             priority
//           />
//           <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
//             <SetIcon setCode={item.set} theme="bronze" size={42} />
//           </div>
//         </div>

//         {/* Основная карточка */}
//         <div className="rounded-2xl border bg-card p-6 flex flex-col gap-4">

//           {/* Заголовок */}
//           <div className="flex items-start justify-between gap-3">
//             <h1 className="text-xl font-semibold leading-tight">{item.set_name}</h1>
//             {item.isFoil && (
//               <span className="shrink-0 text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
//                 Foil
//               </span>
//             )}
//           </div>

//           {/* Детали из Scryfall */}
//           <div className="flex flex-col gap-0 divide-y">

//             <div className="flex items-center justify-between py-3 text-sm">
//               <span className="text-muted-foreground">Код сету</span>
//               <span className="font-mono font-medium uppercase">{item.set}</span>
//             </div>

//             {setTypeLabel && (
//               <div className="flex items-center justify-between py-3 text-sm">
//                 <span className="text-muted-foreground">Тип</span>
//                 <span className="font-medium">{setTypeLabel}</span>
//               </div>
//             )}

//             {releaseDate && (
//               <div className="flex items-center justify-between py-3 text-sm">
//                 <span className="text-muted-foreground">Дата виходу</span>
//                 <span className="font-medium">{releaseDate}</span>
//               </div>
//             )}

//             {scryfallData?.card_count && (
//               <div className="flex items-center justify-between py-3 text-sm">
//                 <span className="text-muted-foreground">Кількість карток</span>
//                 <span className="font-medium">{scryfallData.card_count}</span>
//               </div>
//             )}

//             {scryfallData?.block && (
//               <div className="flex items-center justify-between py-3 text-sm">
//                 <span className="text-muted-foreground">Блок</span>
//                 <span className="font-medium">{scryfallData.block}</span>
//               </div>
//             )}

//             <div className="flex items-center justify-between py-3 text-sm">
//               <span className="text-muted-foreground">Ціна сету</span>
//               <span className="font-semibold text-base">{formattedPrice} ₴</span>
//             </div>

//           </div>

//           {/* Кнопки */}
//           <div className="flex flex-col gap-2 pt-2">

//             {/* Setbinder */}
//             <a
//               href={setbinderUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center justify-center gap-2 w-full rounded-xl border py-3 text-sm font-medium hover:bg-muted transition"
//             >
//               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
//               </svg>
//               Переглянути карти сету альбом на Setbinder
//             </a>

//             {/* Scryfall */}
//             {scryfallData?.scryfall_uri && (
//               <a
//                 href={scryfallData.scryfall_uri}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-2 w-full rounded-xl border py-3 text-sm font-medium hover:bg-muted transition"
//               >
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
//                 </svg>
//                 Переглянути на Scryfall
//               </a>
//             )}

//           </div>
//         </div>

//       </div>
//     </Container>
//   );
// };

// export default SetDetailPage;


import { notFound } from "next/navigation";
import setsData from "@/lib/constants/setsData.json"; // Проверьте ваш путь к JSON
import SetDetail from "@/components/setbox/SetDetail/SetDetail";


export default async function SetPage({
  params,
}: {
  params: Promise<{ set: string }>;
}) {
  const resolvedParams = await params;
  const { set } = resolvedParams;

  if (!set) {
    notFound();
  }

  // 1. Берем наши локальные данные (цена, описание, кастомный арт)
  const setInfo = setsData.find(
    (s) => s.set?.toLowerCase() === set.toLowerCase()
  );

  if (!setInfo) {
    notFound();
  }

  // 2. Делаем серверный запрос к API Scryfall за техническими данными
  let releaseDate = undefined;
  // let cardCount = undefined;

  let scryfallRaw: Record<string, unknown> | null = null;

  try {
    const response = await fetch(`https://api.scryfall.com/sets/${set.toLowerCase()}`, {
      // Кэшируем данные, чтобы не дергать Scryfall при каждом заходе (Next.js фича)
      next: { revalidate: 86400 } // Обновлять кэш раз в сутки
    });

    if (response.ok) {
      const scryfallData = await response.json();
      releaseDate = scryfallData.released_at;
      
      // printed_size — это официальный размер базового сета (281 для Bloomburrow).
      // Мы ставим || scryfallData.card_count как страховку, если у старых сетов нет printed_size
      // cardCount = scryfallData.printed_size || scryfallData.card_count;
      // TypeScript теперь доволен, так как это объект
    scryfallRaw = scryfallData as Record<string, unknown>; 
    }
  } catch (error) {
    console.error("Ошибка при получении данных со Scryfall:", error);
    // Если Scryfall вдруг недоступен, страница не упадет, просто эти два поля не покажутся
  }

  // 3. Передаем склеенные данные в UI-компонент
  return (
    <main>
      <SetDetail
        setCode={setInfo.set}
        setName={setInfo.set_name}
        description={setInfo.description}
        price={setInfo.prices}
        isFoil={setInfo.isFoil}
        imageUrl={setInfo.imageUrl}
        releaseDate={releaseDate}
        mainSetSize={setInfo.mainSetSize}
        scryfallRaw={scryfallRaw}
      />
    </main>
  );
}