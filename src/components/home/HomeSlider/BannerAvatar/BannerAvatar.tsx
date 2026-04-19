// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";

// const BannerAvatar = () => {
//   return (
//     <section className="relative w-full h-[500px] overflow-hidden flex">

//       {/* LEFT SIDE — clean background */}
//       <div
//         className="
//           w-[1520px]
//           h-[500px]
//           bg-[#F4F2EB]
//           flex  justify-between items-center
//           mr-0
//           z-10
//         "
//       >
//         <div className="flex flex-col items-start">
//         {/* Text image */}
//         <Image
//           src="/images/banners/avatar-text.webp"
//           alt="Avatar banner text"
//           width={440}
//           height={240}
//           className="mb-10 ml-25"
//           priority
//         />

//           {/* Button */}

//           <Link
//             href={{
//               pathname: "/singles",
//               query: {
//                 sets: ["tla", "tle"],
//               },
//             }}
//           >
//             <Button variant="banner" className="ml-54">
//               Придбати зараз
//             </Button>
//           </Link>


//         </div>

//        {/* RIGHT SIDE — image with diagonal cut  */}
//       <div
//         className="
//         relative
//         h-[500px]
//         overflow-hidden
//         "
//         style={{
//           clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
//         }}
//       >
//         <Image
//           src="/images/banners/avatar_1600x1080.webp"
//           alt="Avatar artwork"
//           width={940}
//           height={500}
//           className="object-cover"
//           priority
//           />
//       </div>
//           </div>
//     </section>
//   );
// };

// export default BannerAvatar;


// // BannerAvatar.tsx   claude
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
// import css from "./BannerAvatar.module.css";

// const BannerAvatar = () => {
//   return (
//     <section className={css.section}>

//       {/* LEFT */}
//       <div className={css.left}>
//         <div className={css.textWrapper}>
//           <Image
//             src="/images/banners/avatar-text.webp"
//             alt="Avatar banner text"
//             width={440}
//             height={240}
//             priority
//           />

//           <Link
//             href={{
//               pathname: "/singles",
//               query: { sets: ["tla", "tle"] },
//             }}
//           >
//             <Button variant="banner">
//               Придбати зараз
//             </Button>
//           </Link>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className={css.right}>
//         <Image
//           src="/images/banners/avatar_1600x1080.webp"
//           alt="Avatar artwork"
//           fill
//           className="object-cover object-center"
//           priority
//         />
//       </div>

//     </section>
//   );
// };

// export default BannerAvatar;


// gamini
import Image from "next/image";
import { Button } from "../../../ui/button";
import Link from "next/link";
import css from "./BannerAvatar.module.css";

const BannerAvatar = () => {
  return (
    <section className={css.section}>

      {/* Центральный контейнер */}
      <div className={css.container}>

        {/* LEFT SIDE — Text and Button */}
        <div className={css.textContent}>
          <Image
            src="/images/banners/avatar-text.webp"
            alt="Avatar banner text"
            // width={440}
            // height={240}
            width={660}
            height={303}
            className={css.textImage}
            priority
          />

          <Link
            href={{
              pathname: "/singles",
              query: { sets: ["tla", "tle"] },
            }}
          >
            <Button variant="banner" className={css.actionButton}>
              Придбати зараз
            </Button>
          </Link>
        </div>

        {/* RIGHT SIDE — image with diagonal cut */}
        <div className={css.imageAvatar}>
          {/* 📱 Картинка для мобилок (до 768px) */}
          <Image
            src="/images/banners/avatar_575x700.webp"
            alt="Avatar artwork mobile"
            width={575}
            height={700}
            className={`${css.artwork} ${css.mobileArt}`}
            priority
          />

          {/* 💻 Картинка для планшетов и ПК (от 768px) */}
          <Image
            src="/images/banners/avatar_1600x1080.webp"
            alt="Avatar artwork desktop"
            width={1600}
            height={1080}
            className={`${css.artwork} ${css.desktopArt}`}
            priority
          />

        </div>

      </div>

    </section>
  );
};

export default BannerAvatar;


