import Container from "@/components/Container/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sealed",
};
const SealedPage = () => {
  return (
    <Container className="py-5 md:py-10">
    <div>
      Sealed
    </div>
    </Container>
  )
}

export default SealedPage;
