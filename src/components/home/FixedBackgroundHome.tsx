// import Image from "next/image";

// const FixedBackgroundHome = () => {
//   return (
//     <div
//       className="
//         fixed
//         inset-0
        
//         pointer-events-none
//       "
//     >
//       <Image
//         src="/images/towerDark2.png"
//         alt="Citadel background"
//         width={1600}
//         height={1000}
//         // fill
//         priority
//         className="object-cover object-top"
//       />
//     </div>
//   );
// };

// export default FixedBackgroundHome;

import Image from "next/image";

const FixedBackgroundHome = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#041e3a]">
      {/* 1. bg-[#041e3a] (или ваш темный цвет) — подстраховка, пока картинка грузится.
        2. fill — заставляет Image занять все пространство родителя (inset-0).
      */}
      <Image
        src="/images/towerDark2.png"
        alt="Citadel background"
        fill
        priority
        className="mt-6 object-cover object-top md-mt-4 lg:mt-0" // opacity немного приглушит фон, чтобы контент читался лучше
      />
    </div>
  );
};

export default FixedBackgroundHome;
