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

import BannerAvatar from "../Banner/BannerAvatar";


const HeroSearch = () => {
  return (
    // <section className="relative px-6 pt-24 pb-32 max-w-6xl mx-auto text-center overflow-hidden rounded-2xl">
    <section className="relative max-w-full mx-auto text-center overflow-hidden ">
      


      <BannerAvatar/>

    </section>
  );
};

export default HeroSearch;

