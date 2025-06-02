"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navLinks } from "@/constants/data";


interface NavLinksProps {
  direction?: "row" | "col";
  gap?: string;
  mobile?: boolean;
}

// const getNavLinkClass = (pathname: string, href: string, isMobile?: boolean) =>
//   clsx(
//     // "pb-[5px] transition-colors border-b",
//     "relative inline-block text-light-grey after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-nav-yellow after:transition-all after:duration-300 hover:after:w-full",
//     pathname === href
//       ? isMobile
//         ? "text-nav-yellow border-nav-yellow"
//         : "text-nav-yellow border-nav-yellow"
//       : isMobile
//         ? "text-main-text border-transparent hover:text-black hover:border-main-text"
//         : "text-light-grey border-transparent hover:border-[#f7fafd]"
//   );

// const NavLinks = ({ direction = "row", gap = "gap-[72px]", mobile = false }: NavLinksProps) => {
//   const pathname = usePathname();

//   return (
//     <nav className={clsx("flex", direction === "row" ? "flex-row" : "flex-col", gap)}>
//       {navLinks.map(({ href, label }) => (
//         <Link
//           key={href}
//           href={href}
//           className={getNavLinkClass(pathname, href, mobile)}
//         >
//           {label}
//         </Link>
//       ))}
//     </nav>
//   );
// };

// export default NavLinks;



// const NavLinks = ({ direction = "row", gap = "gap-[72px]", mobile = false }: NavLinksProps) => {
//   const pathname = usePathname();

//   return (
//     <nav className={clsx("flex", direction === "row" ? "flex-row" : "flex-col", gap)}>
//       {navLinks.map(({ href, label }) => (
//         <Link
//           key={href}
//           href={href}
//           className={clsx(
//             "pb-[5px] transition-colors border-b",
//             pathname === href
//               ? "text-nav-yellow border-nav-yellow"
//               : "border-transparent hover:border-[#f7fafd]",
//             mobile && "text-main-text hover:border-main-text"
//           )}
//         >
//           {label}
//         </Link>
//       ))}
//     </nav>
//   );
// };

// export default NavLinks;

// --------------------

const getNavLinkClass = (pathname: string, href: string, isMobile?: boolean) =>
  clsx(
    "pb-[5px] transition-colors border-b",
    pathname === href
      ? isMobile
        ? "text-nav-yellow border-nav-yellow"
        : "text-nav-yellow border-nav-yellow"
      : isMobile
        ? "text-main-text border-transparent hover:text-main-text hover:border-main-text"
        : "text-light-grey border-transparent hover:border-[#f7fafd]"
  );

const NavLinks = ({ direction = "row", gap = "gap-[72px]", mobile = false }: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <nav className={clsx("flex", direction === "row" ? "flex-row" : "flex-col", gap)}>
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={getNavLinkClass(pathname, href, mobile)}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;