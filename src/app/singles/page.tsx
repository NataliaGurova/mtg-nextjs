// import Container from "@/components/container/Container";
// import { Button } from "@/components/ui/button";
// import { Metadata } from "next";
// import Link from "next/link";

// export const metadata: Metadata = {
//   title: "Singles",
// };


// const SinglesPage = () => {
//   const singleId = 23;

//   return (
    
//       <Container>
//       <h1>Singles</h1>
//       <Link href="/singles/1">Single 1</Link>
//       <Link href="/singles/2">Single 2</Link>
//       <Link href="/singles/3" replace>Single 3</Link>
//       <Link href={`/singles/${singleId}`}>Single {singleId}</Link>
//         <Button variant="more" size="sm" >View More</Button>
//         </Container>
    
//   )
// }

// export default SinglesPage;


// ===============old================
// import CardsList from "@/components/cards/CardList/CardList";
// import FiltersSidebar from "@/components/filters/FiltersSidebar";
// import Container from "@/components/Container/Container";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "Singles",
//   };


// const SinglesPage = async () => {


//   return (
//     <Container>
//       {/* <div className="flex"> */}
//       <div className="flex items-start gap-6">

//       <FiltersSidebar />
//       <section className="flex-1">
//         <CardsList />
//       </section>
//       </div>
//       </Container>
//   );
// };

// export default SinglesPage;

// ===================

// import CardsList from "@/components/cards/CardList/CardList";
// import FiltersSidebar from "@/components/filters/FiltersSidebar";
// import Container from "@/components/Container/Container";
// import { Metadata } from "next";
// import { DbCard } from "@/types/types";

// export const metadata: Metadata = {
//   title: "Singles",
// };


// interface SinglesPageProps {
//   searchParams: Promise<{
//     page?: string;
//     q?: string;
//   }>;
// }

// const LIMIT = 24;

// const SinglesPage = async ({ searchParams }: SinglesPageProps) => {
//   const params = await searchParams;

//   const page = Number(params.page ?? "1");
//   const q = params.q?.trim() ?? "";

//   const skip = (page - 1) * LIMIT;

//   const queryParams = new URLSearchParams(); // ← новое имя
//   queryParams.set("page", String(page));
//   queryParams.set("limit", String(LIMIT));
//   if (q.length >= 3) queryParams.set("q", q);
//   const res = await fetch(
//     `${process.env.NEXTAUTH_URL}/api/cards?${queryParams.toString()}`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to load cards");
//   }

//   const data: {
//     items: DbCard[];
//     totalPages: number;
//   } = await res.json();

//   return (
//     <Container>
//       <div className="flex items-start gap-6">
//         <FiltersSidebar />
//         <section className="flex-1">
//           <CardsList
//             items={data.items}
//             page={page}
//             totalPages={data.totalPages}
//           />
//         </section>
//       </div>
//     </Container>
//   );
// };

// export default SinglesPage;

// -----------------------------
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
    sets?: string;
  }>;
}

const LIMIT = 24;

const SinglesPage = async ({ searchParams }: SinglesPageProps) => {
  const params = await searchParams; // ⚡ Нужно await

  const page = Math.max(Number(params.page ?? "1"), 1);
  const q = params.q?.trim() ?? "";
  const setsRaw = params.sets ?? "";


  const apiParams = new URLSearchParams();
  apiParams.set("page", String(page));
  apiParams.set("limit", String(LIMIT));

  if (q.length >= 3) apiParams.set("q", q);
  if (setsRaw) apiParams.set("sets", setsRaw);

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cards?${apiParams.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load cards");

  const data: { items: DbCard[]; totalPages: number } = await res.json();

  // const plainItems = data.items.map((card) => ({
  //   ...card,
  //   _id: card._id.toString(),
  // }));

  return (
    <Container>
      <div className="flex items-start gap-6">
        <FiltersSidebar />
        <section className="flex-1">
          <CardsList
            items={data.items}
            page={page}
            totalPages={data.totalPages}
          />
        </section>
      </div>
    </Container>
  );
};

export default SinglesPage;



