
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
      {/* fixed background ONLY for home */}
      <FixedBackgroundHome />

      {/* hero */}
      {/* <section className="relative z-10"> */}
      <section className="relative z-10 w-full shadow-2xl">
        <HomeSlider />
      </section>

      {/* content below */}
      <section className="relative z-10 flex-1 bg-light-grey/60">
        <Container className="py-12 md:py-24 flex flex-col gap-16 md:gap-24">
          
        {/* cards / banners / text */}
      
      {/* <Loader /> */}
      <Roadmap />
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


      {/* <HeroSearch /> */}
      {/* <WhatYouCanDo />
      <ForWhom />
      <SinglesPreview />
      <DataScale /> */}
    </main>
  );
};

export default HomePage;

// import FixedBackgroundHome from "@/components/home/FixedBackgroundHome";
// import HomeSlider from "@/components/home/HomeSlider/HomeSlider";
// import Roadmap from "@/components/home/Roadmap";
// import FinalCTA from "@/components/home/FinalCTA";
// // import TrendingSingles from "@/components/home/TrendingSingles"; // Будущий компонент
// // import FeaturedSets from "@/components/home/FeaturedSets"; // Будущий компонент
// import Container from "@/components/Container/Container"; // Если у вас есть обертка ширины

// const HomePage = () => {
//   return (
//     <main className="flex flex-col min-h-screen relative">
      
//       {/* 🌌 ФИКСИРОВАННЫЙ ФОН */}
//       <FixedBackgroundHome />

//       {/* 🎭 ГЕРОЙ-СЛАЙДЕР (Баннеры) */}
//       <section className="relative z-10 w-full shadow-2xl">
//         <HomeSlider />
//       </section>

//       {/* 📄 ОСНОВНОЙ КОНТЕНТ (Стекло) */}
//       <section className="relative z-10 flex-1 bg-light-grey/70 backdrop-blur-md">
        
//         {/* Контейнер добавит отступы по бокам на мобилках и ограничит ширину на 4K */}
//         <Container className="py-12 md:py-24 flex flex-col gap-16 md:gap-24">
          
//           {/* ИДЕЯ 1: Новые сеты (4-6 красивых баннеров сетов в ряд/сетку) */}
//           {/* <FeaturedSets /> */}

//           {/* ИДЕЯ 2: Популярные синглы (Карточки MTG) */}
//           {/* <TrendingSingles /> */}

//           {/* ВАШ ROADMAP */}
//           <div className="w-full">
//             <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-main-text">
//               Наш Шлях (Roadmap)
//             </h2>
//             <Roadmap />
//           </div>

//           {/* ИДЕЯ 3: Для кого этот сервис? / Преимущества */}
//           {/* <ForWhom /> */}

//         </Container>

//         {/* ФИНАЛЬНЫЙ ПРИЗЫВ К ДЕЙСТВИЮ (Во всю ширину внизу) */}
//         <div className="mt-auto border-t border-border/50">
//           <FinalCTA />
//         </div>
        
//       </section>
      
//     </main>
//   );
// };

// export default HomePage;

