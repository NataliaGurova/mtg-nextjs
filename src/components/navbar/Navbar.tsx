"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navLinks } from "@/constants/data";


const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-dark-green text-light-grey px-10 py-5">
      <nav className="flex gap-20">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "pb-[5px] border-b transition-colors",
              pathname === href
                ? "text-[#fcd21a] border-[#fcd21a]" 
                : "border-[#1d5105] hover:border-[#f7fafd]" 
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;




// const Navbar = () => {
//   return (
//     <div className="bg-secondary-background text-background px-10 py-5">
//       <nav className="flex gap-20">        
//       <Link href="/singles">MTG Singles</Link>
//       <Link href="/sets">MTG Sets</Link>
//       <Link href="/tokens">MTG Tokens</Link>
//       <Link href="/sealed">MTG Sealed</Link>
//       <Link href="/admin">Admin</Link>
//       {/* {isLoggedIn && (
//         <NavLink className={buildLinkClass} to="/cards">
//           Cards
//         </NavLink>
//       )} */}
//       </nav>
//       </div>
//   )
// }

// export default Navbar;
