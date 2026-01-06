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
      className="flex items-center gap-2" // ← лого + текст в ряд с отступом
    >
      <Image
        src="/citadel.jpg"
        alt="Citadel"
        width={40}
        height={40}
        className="rounded-md"
        priority
      />
      <span className="text-xl font-bold">Citadel</span>
    </Link>
  );
};

export default Logo;

