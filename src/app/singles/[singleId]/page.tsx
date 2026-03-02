

import { notFound } from "next/navigation";
import { getCardsByScryfallId } from "@/db/cards";
import CardDetails from "@/components/cards/CardDetails/CardDetails";
// import { DbCard } from "@/types/types";
import Container from "@/components/Container/Container";

interface PageProps {
  params: Promise<{ singleId: string }>;
}

export default async function SingleDetailsPage({ params }: PageProps) {
  const { singleId } = await params;

  const cards = await getCardsByScryfallId(singleId);

  if (!cards.length) notFound();

  return (
    <Container>
      <CardDetails cards={cards} />
      {/* <section>
        {cards.map((card) => {
          const frontFace = card.faces?.find(
            (face) => face.side === "front"
          );

          return (
            <CardDetails
              key={card._id}
              cards={cards}
              frontFace={frontFace}
            />
          );
        })}
      </section> */}
    </Container>
  );
}