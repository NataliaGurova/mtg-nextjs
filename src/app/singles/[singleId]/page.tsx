

// const SingleDetails = async ({
//   params
// }: {
//   params: Promise<{ singleId: string }>;
//   }) => {
  
//   const singleId = (await params).singleId
  
//   return (
//     <div>
//       <h1>SingleDetails {singleId}</h1>
//     </div>
//   )
// }

// export default SingleDetails




import { notFound } from "next/navigation";

import { getCardById } from "@/db/cards";
// import { AddToCartSection } from "@/components/cards/AddToCartSection/AddToCartSection";
import CardDetails from "@/components/cards/CardDetails/CardDetails";
import Container from "@/components/Container/Container";
import { DbCard } from "@/types/types";
// import { AddToCartSection } from "./AddToCartSection";

type PageProps = {
  params: { singleId: string };
};

const SingleDetailsPage = async ( props: PageProps) => {
  // const { singleId } = await params;
  // const card = await getCardById(singleId);
  const params = await props.params; // <-- добавьте await
  const card = await getCardById(params.singleId);
  
  if (!card) notFound();

 // Преобразуем только _id карточки, если нужно
  const plainCard: DbCard = {
  ...card,
  _id: card._id?.toString?.() ?? "",
  // faces: card.faces, // если _id в faces уже нет, просто копируем faces
};
  
  const frontFace = plainCard.faces?.find((face) => face.side === "front");
  // const backFace  = card.faces?.find((f) => f.side === "back");

  return (
    <Container>
    <section className="">
      {/* IMAGE */}
      {/* <div className="flex justify-center">
      {frontFace && (
        <Image
          src={frontFace.imageUrl}
          alt={card.name}
          width={300}
          height={420}
          priority
        />
      )}
      </div> */}
      <CardDetails card={card} frontFace={frontFace} />

      {/* INFO */}
      {/* <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">{card.name}</h1>

        <div className="text-sm text-muted-foreground">
          {card.set_name} · #{card.collector_number}
        </div>

        <div className="flex gap-6 text-sm">
          <span>Condition: {card.condition}</span>
          <span>In stock: {card.quantity}</span>
        </div>

        <div className="text-2xl font-semibold">
          {card.prices} грн
        </div> */}

        {/* CLIENT PART */}
        
        {/* <AddToCartSection
          cardId={card._id.toString()}
          stock={card.quantity}
          /> */}
        
      
      </section>
      </Container>
  );
};

export default SingleDetailsPage;

