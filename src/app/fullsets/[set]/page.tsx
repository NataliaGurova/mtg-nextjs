// src/app/fullsets/[set]/page.tsx

import { notFound } from "next/navigation";
import setsData from "@/lib/constants/setsData.json"; // Проверьте ваш путь к JSON
import SetDetail from "@/components/setbox/SetDetail/SetDetail";
import { Metadata } from "next";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ set: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { set } = resolvedParams;

  const setInfo = setsData.find(
    (s) => s.set?.toLowerCase() === set.toLowerCase()
  );

  return {
    // Вкладка браузера будет называться, например: "Bloomburrow | Citadel"
    title: setInfo ? `${setInfo.set_name} | Citadel` : "Сет не знайдено",
    description: setInfo?.description || "Детальна інформація про сет Magic: The Gathering",
  };
}


const SetDetailPage = async ({
  params,
}: {
  params: Promise<{ set: string }>;
}) => {
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
  let scryfallRaw: Record<string, unknown> | null = null;

  try {
    const response = await fetch(`https://api.scryfall.com/sets/${set.toLowerCase()}`, {
      // Кэшируем данные, чтобы не дергать Scryfall при каждом заходе (Next.js фича)
      next: { revalidate: 86400 } // Обновлять кэш раз в сутки
    });

    if (response.ok) {
      const scryfallData = await response.json();
      releaseDate = scryfallData.released_at;
      scryfallRaw = scryfallData as Record<string, unknown>;
    }
  } catch (error) {
    console.error("Помилка при отриманні даних з Scryfall:", error);
  }


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

export default SetDetailPage;