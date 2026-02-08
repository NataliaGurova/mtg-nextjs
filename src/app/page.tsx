
import FixedBackgroundHome from "@/components/home/FixedBackgroundHome";
import HomeSlider from "@/components/home/HomeSlider/HomeSlider";
import Roadmap from "@/components/home/Roadmap";
import FinalCTA from "@/components/home/FinalCTA";

const HomePage = () => {
  return (
    <main className="flex flex-col ">
      {/* fixed background ONLY for home */}
      <FixedBackgroundHome />

      {/* hero */}
      <section className="relative z-10">
        <HomeSlider />
      </section>

      {/* content below */}
      <section className="relative z-10 bg-light-grey/60">
        {/* cards / banners / text */}
      <FinalCTA />
      <Roadmap />
      <Roadmap />
      <Roadmap />
      <Roadmap />
      </section>


      {/* <HeroSearch /> */}
      {/* <WhatYouCanDo />
      <ForWhom />
      <SinglesPreview />
      <DataScale /> */}
    </main>
  );
};

export default HomePage;

