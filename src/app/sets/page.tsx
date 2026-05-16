import Container from "@/components/Container/Container";
import SetItem from "@/components/setbox/SetItem/SetItem";
import SetList from "@/components/setbox/SetList/SetList";
import SetIcon from "@/components/SetIcon/SetIcon";
import { Metadata } from "next";
import Image from "next/image";

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
