// import Image from "next/image"
// import Link from "next/link"


// const Logo = () => {
//   return (
//     <Link href="/">
//       <Image
//             src="/citadel.jpg"
//             alt="Citadel"
//             width={48}
//             height={48}
//             className="flex rounded-md"
//             priority
//           />
//           <span>Citadel</span> 
//     </Link>
//   )
// }

// export default Logo;

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-end gap-1" // ← лого + текст в ряд с отступом
    >
      <Image
        src="/logoMagic.png"
        alt="Citadel"
        width={60}
        height={60}
        className="rounded-md"
        priority
      />
      <Image
        src="/logo-kir.png"
        alt="Citadel"
        width={150}
        height={150}
        className="rounded-md"
        priority
      />
      {/* <span className="text-xl font-bold">Citadel</span> */}
    </Link>
  );
};

export default Logo;

