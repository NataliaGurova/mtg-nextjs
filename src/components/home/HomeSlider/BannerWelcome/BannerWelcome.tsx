
// src/components/home/HomeSlider/BannerWelcome/BannerWelcome.tsx
// import Image from "next/image";
// import css from "./BannerWelcome.module.css";

// const BannerWelcome = () => {
//   return (
//     <section className="relative w-full h-[500px] overflow-hidden">
//       {/* Background image */}
//       <Image
//         src="/images/home3-1.jpg"
//         alt="Welcome to Magic the Gathering"
//         width={1720}
//         height={500}
//         // className="object-cover"
//         priority
//       />

//       {/* Text content */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className={css.content}>
//           <h1
//             className={css.title}
//             // className={`
//             //   mt-20
//             //   text-[38px]
//             //   font-georgia
//             //   font-inter
//             //   tracking-[0.15em]
//             //   uppercase
//             //   text-[#F5F0E6]
//             //   drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]
//           // `}
//           >
//             Made for Endless Battles
//           </h1>

//           {/* <p className="mt-1 text-[32px] tracking-wide">в</p> */}
//           <div
//             className="
//               mt-6
//               inline-flex
//               items-center
//               justify-center
//               px-6 py-4
//             "
//           >

//             <Image
//               src="/citadelTowerLight.svg"
//               alt="Citadel logo"
//               width={200}
//               height={200}
//               className="rounded-md"
//               priority
//             />
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default BannerWelcome;

// BannerWelcome.tsx
// import Image from "next/image";
// import css from "./BannerWelcome.module.css";

// const BannerWelcome = () => {
//   return (
//     <section className={css.section}>
//       {/* Background — fill чтобы покрывал секцию */}
//       <Image
//         src="/images/home5.png"
//         alt="Welcome to Magic the Gathering"
//         fill
//         className="object-cover object-center"
//         priority
//       />

//       {/* Overlay для читаемости текста */}
//       <div className="absolute inset-0 bg-black/30" />

//       {/* Content */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className={css.content}>



//           <div className={css.logoWrapper}>
//             <Image
//               // src="/citadelTowerLight.svg"
//               src="/citadelName-en3.svg"
//               alt="Citadel logo"
//               width={300}
//               height={300}
//               priority
//             />
//           </div>

//           <h1 className={css.title}>
//             <span className={css.highlight}>Made for</span>
//             Endless Battles
//           </h1>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default BannerWelcome;

import Image from "next/image";
import css from "./BannerWelcome.module.css";

const BannerWelcome = () => {
  return (
    <section className={css.section}>
      <div className={css.container}>
      {/* Background image */}
      <Image
        src="/images/home5.png"
        alt="Welcome to Magic the Gathering"
        width={1720}
        height={500}
        className={css.bgImage}
        priority
      />

      {/* Text content */}
      <div className={css.overlay}>
        <div className={css.content}>

          <div className={css.logoCitadel}>
            <Image
              src="/citadelName-en22.svg"
              alt="Citadel logo"
              width={300}
              height={300}
              className={css.logo}
              priority
            />
          </div>
          <h1 className={css.title}>
            <span className={css.highlight}>Made for</span>
            Endless Battles
          </h1>
        </div>
        </div>
      </div>
      
    </section>
  );
};

export default BannerWelcome;
