
import FixedBackgroundHome from "@/components/home/FixedBackgroundHome";
import HomeSlider from "@/components/home/HomeSlider/HomeSlider";
import Roadmap from "@/components/home/Roadmap";
import FinalCTA from "@/components/home/FinalCTA";
// import Loader from "@/components/Loader/Loader";
import Container from "@/components/Container/Container";
import FullsetPromo from "@/components/home/FullsetPromo/FullsetPromo";
import RecentFinds from "@/components/home/RecentFinds/RecentFinds";

const HomePage = () => {
  return (
    // <main className="flex flex-col ">
    <main className="flex flex-col min-h-screen relative">
      <FixedBackgroundHome />
      <section className="relative z-10 w-full shadow-2xl">
        <HomeSlider />
      </section>

      {/* content below */}
      <div className="relative z-10 flex-1 bg-light-grey/60">
        <Container className="py-12 md:py-24 flex flex-col gap-16 md:gap-24">

          <FullsetPromo />
          <RecentFinds />

        </Container>
        <div className="mt-auto border-t border-border/50">
          <FinalCTA />
        </div>
      </div>

    </main>
  );
};

export default HomePage;

