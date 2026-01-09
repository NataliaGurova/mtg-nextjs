

import HeroSearch from "@/components/home/HeroSearch";
// import WhatYouCanDo from "@/components/home/WhatYouCanDo";
// import ForWhom from "@/components/home/ForWhom";
// import SinglesPreview from "@/components/home/SinglesPreview";
// import DataScale from "@/components/home/DataScale";
import Roadmap from "@/components/home/Roadmap";
import FinalCTA from "@/components/home/FinalCTA";

const HomePage = () => {
  return (
    <main className="flex flex-col gap-25">

      <HeroSearch />
      {/* <WhatYouCanDo />
      <ForWhom />
      <SinglesPreview />
      <DataScale /> */}
      <FinalCTA />
      <Roadmap />
    </main>
  );
};

export default HomePage;

