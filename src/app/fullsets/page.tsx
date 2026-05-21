import Container from "@/components/Container/Container";
import SetList from "@/components/setbox/SetList/SetList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fullsets",
};
const SetsPage = () => {
  return (
    <Container className="py-5 md:py-10">
    <div >
      
    <SetList/>
          
    </div>
    </Container>
  )
}

export default SetsPage;
