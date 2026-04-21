
// src/app/singles/page.tsx
import CardsList from "@/components/cards/CardList/CardList";
import FiltersSidebar from "@/components/filters/FiltersSidebar";
import Container from "@/components/Container/Container";
import { DbCard } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Singles",
};

// ✅ Правильный тип для Next 15
interface SinglesPageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    finish?: string;
    sets?: string;
    // type?: string;
    colors?: string;
    // rarity?: string;
  }>;
}

const LIMIT = 24;

const SinglesPage = async ({ searchParams }: SinglesPageProps) => {
  const params = await searchParams; // ⚡ Нужно await

  const page = Math.max(Number(params.page ?? "1"), 1);
  const q = params.q?.trim() ?? "";
  const setsRaw = params.sets ?? "";
  const finish = params.finish ?? "";
  const colorsRaw = params.colors ?? "";


  const apiParams = new URLSearchParams();
  apiParams.set("page", String(page));
  apiParams.set("limit", String(LIMIT));

  if (q.length >= 3) apiParams.set("q", q);
  if (setsRaw) apiParams.set("sets", setsRaw);

  if (colorsRaw) apiParams.set("colors", colorsRaw);

  // 👈 Передаем в API
  if (finish === "foil") {
    apiParams.set("isFoil", "true");
  } else if (finish === "nonfoil") {
    apiParams.set("isFoil", "false");
  }
  // if (finish) apiParams.set("isFoil", finish === "foil" ? "foil" : "nonfoil");

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cards?${apiParams.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load cards");

  const data: { items: DbCard[]; totalPages: number } = await res.json();

    // Приводим _id к строке для React
    const items = data.items.map(card => ({
      ...card,
      _id: card._id.toString(),
    }));

  return (
    <Container className="py-5 md:py-10">
      {/* <div className="flex items-start gap-6"> */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        <FiltersSidebar />
        <section className="flex-1 w-full">
          <CardsList
            items={items}
            page={page}
            totalPages={data.totalPages}
          />
        </section>
      </div>
    </Container>
  );
};

export default SinglesPage;
