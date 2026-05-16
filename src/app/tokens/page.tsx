import Container from "@/components/Container/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tokens",
};

const TokensPage = () => {
  return (
    <Container className="py-5 md:py-10">
    <div>
      Tokens
    </div>
    </Container>
  )
}

export default TokensPage;
