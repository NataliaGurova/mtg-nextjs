// import Image from "next/image";



// const HeroSearch = () => {
//   return (
//     <section className="px-6 pt-24 pb-32 max-w-5xl mx-auto text-center">
//       <h1 className="text-4xl font-bold tracking-tight">
//       <Image
//               src="/images/home2-1.jpg"
//               alt="Citadel"
//         width={1000}
//         height={200}
//               // className="rounded-md"
//               priority
//             />
//       </h1>


//       <p className="mt-4 text-lg text-gray-500">
//         Швидкий пошук карт Magic: The Gathering
//         <br />
//         для гри та колекціонування
//       </p>


//     </section>
//   );
// };

// export default HeroSearch;


// import BannerAvatar from "./HomeSlider/BannerAvatar";
// import BannerWelcome from "./HomeSlider/BannerWelcome";
// // import HeroSlider from "./HeroSlider";

// const HeroSearch = () => {
  //   return (
    
  //     <section className="relative max-w-full mx-auto text-center overflow-hidden ">
  //       {/* <BannerWelcome/> */}
  //       <BannerAvatar />
  //     </section>
  //   );
  // };

  // export default HeroSearch;
  
// import HomeSlider from "@/components/HomeSlider/HomeSlider";

import HomeSlider from "./HomeSlider/HomeSlider";

const HeroSearch = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <HomeSlider />
    </section>
  );
};

export default HeroSearch;


