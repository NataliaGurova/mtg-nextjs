// app/singles/[singleId]/page.tsx

import { notFound } from "next/navigation";
import CardDetails from "@/components/cards/CardDetails/CardDetails";
import Container from "@/components/Container/Container";
import { getCardsByScryfallId } from "@/db/repositories/card.repository";

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
    </Container>
  );
}