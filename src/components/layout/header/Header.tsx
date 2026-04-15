'use client';

import Logo from "../../Logo/Logo";
import CartIcon from "./CartIcon/CartIcon";

import { navLinks } from "@/constants/data";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation';

import SearchBar from "@/components/SearchBar/SearchBar";
import Container from "@/components/Container/Container";
import UserMenu from "./UserMenu/UserMenu";
import { Search } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { CartModal } from "@/components/cart/CartModal/CartModal";
import MobileMenu from "./MobileMenu/MobileMenu";
import WishlistIcon from "./WishlistIcon/WishlistIcon";


const Header = () => {
  const pathname = usePathname();
  const setCartOpen = useCartStore((state) => state.setCartOpen);

  return (

    <header className="sticky top-0 z-50">

  {/* TOP BAR */}
  <Container className="flex items-center justify-between py-0 bg-light-grey max-w-full text-main-text">
  {/* <Container className="flex items-center justify-between py-0 bg-[#e3ece6] max-w-full text-main-text"> */}

    {/* LEFT */}
    <div className="flex items-center gap-10">
      <Logo />

      {/* 🔍 Desktop search */}
      <div className="hidden md:flex items-center relative lg:ml-10">
        <Search size={18} className="absolute top-1/2 -translate-y-1/2 pointer-events-none" />
        <SearchBar className="pl-9 border-b border-main-text" />
      </div>  
    </div>

    {/* RIGHT */}
    {/* <div className="flex items-center gap-4 lg:gap-12"> */}

    {/* Desktop: UserMenu + Cart + Wishlist */}
    <div className="hidden md:flex items-center gap-6 lg:gap-12 ">
      <UserMenu />
  <div
    className="relative flex items-center h-full py-4"
    onMouseEnter={() => setCartOpen(true)}
    onMouseLeave={() => setCartOpen(false)}
  >
    <CartIcon />
    <CartModal />
  </div>
  <WishlistIcon />
</div>

{/* Mobile: Cart + Wishlist + Burger */}
<div className="flex md:hidden items-center gap-6">
  <CartIcon />
  <WishlistIcon />
  <MobileMenu />
</div>

{/* </div> */}
  </Container>

  {/* DESKTOP NAV */}
  <Container className="hidden md:block bg-dark-green text-light-grey">
    <nav className="flex gap-[72px] text-[18px]">
      {navLinks.map(({ href, label }) => (
        <Link
          href={href}
          key={label}
          className={clsx(
            "relative pb-1 hoverEffect",
            pathname === href
              ? "text-nav-yellow border-b-2 border-nav-yellow"
              : "border-b-2 border-transparent hover:border-light-grey"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  </Container>

  {/* MOBILE SEARCH */}
  <Container className="md:hidden bg-dark-green text-light-grey">
    <SearchBar />
  </Container>

  </header>
  )
}

export default Header;
