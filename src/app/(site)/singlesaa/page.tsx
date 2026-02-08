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

import CardsList from "@/components/cards/CardList/CardList";
import FiltersSidebar from "@/components/filters/FiltersSidebar";
import Container from "@/components/Container/Container";


const SinglesaaPage = async () => {


  return (
    <Container>
    <div className="flex">
      <FiltersSidebar />
      <section className="flex-1">
        <CardsList />
      </section>
      </div>
      </Container>
  );
};

export default SinglesaaPage;

