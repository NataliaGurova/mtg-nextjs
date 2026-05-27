
import FixedBackgroundHome from "@/components/home/FixedBackgroundHome";
import HomeSlider from "@/components/home/HomeSlider/HomeSlider";
import Roadmap from "@/components/home/Roadmap";
import FinalCTA from "@/components/home/FinalCTA";
// import Loader from "@/components/Loader/Loader";
import Container from "@/components/Container/Container";


const HomePage = () => {
  return (
    // <main className="flex flex-col ">
    <main className="flex flex-col min-h-screen relative">
      <FixedBackgroundHome />
      <section className="relative z-10 w-full shadow-2xl">
        <HomeSlider />
      </section>

      {/* content below */}
      <section className="relative z-10 flex-1 bg-light-grey/60">
        <Container className="py-12 md:py-24 flex flex-col gap-16 md:gap-24">


          <Roadmap />
          
        <div className="w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-main-text">
              Наш Шлях (Roadmap)
            </h2>
            <Roadmap />
          </div>
        </Container>
        <div className="mt-auto border-t border-border/50">
          <FinalCTA />
        </div>
      </section>

    </main>
  );
};

export default HomePage;

