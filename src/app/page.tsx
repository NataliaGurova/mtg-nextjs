
import FixedBackgroundHome from "@/components/home/FixedBackgroundHome";
import HomeSlider from "@/components/home/HomeSlider/HomeSlider";
import Roadmap from "@/components/home/Roadmap";
import FinalCTA from "@/components/home/FinalCTA";
// import Loader from "@/components/Loader/Loader";
import Container from "@/components/Container/Container";
import { WishlistModal } from "@/components/account/WishlistModal/WishlistModal";


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
           
           {/*Suspense  */}
           <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
           {/* loader */}



        {/* cards / banners / text */}
      
      {/* <Loader /> */}
          <Roadmap />
          <div className=" max-w-150 my-0 mx-auto bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg text-center">
        <h2>Привет, Nata!</h2>
        <p>Спасибо за регистрацию. Пожалуйста, подтвердите свой email, нажав на кнопку ниже:</p>
        <a href="${confirmLink}" className="inline-block py-[4px] px-[20px] bg-[#1d5105] text-white rounded-[4px] mt-4 border-b-3 border-[#0e2902] shadow-[#0e2902]/[0.5]">
          Підтвердити Email
        </a>
        <p className="mt-6 text-gray-600 text-sm">
          Если кнопка не работает, скопируйте и вставьте эту ссылку в браузер: <br/>
          <a href="${confirmLink}">fdgfhgjgjkhjkhjhjh</a>
        </p>
        <p className="text-gray-600 text-sm">Ссылка действительна 24 часа.</p>
      </div>
          <Roadmap />
          <WishlistModal className="absolute top-16 right-0" />
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

