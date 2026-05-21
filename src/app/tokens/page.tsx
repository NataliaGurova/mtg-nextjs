import Container from "@/components/Container/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tokens",
};

const TokensPage = () => {
  return (
    <Container className="py-5 md:py-10">
    <div className="flex flex-col md:flex-row items-start gap-6">
<h1>Tokens</h1>
        {/* <Suspense fallback={null}>
          <FiltersSidebar />
        </Suspense> */}
        
        <section className="flex-1 w-full">
          {/* <CardsList
            items={items}
            page={page}
            totalPages={data.totalPages}
          /> */}
        </section>
      </div>
    </Container>
  )
}

export default TokensPage;
