'use client';

import Logo from "../../logo/Logo";
import CartIcon from "../../cart/CartIcon/CartIcon";
import FavoriteBtn from "../../favorite-btn/FavoriteBtn";

import { navLinks } from "@/constants/data";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation';

import NavbarMobil from "../navbar-mobil/NavbarMobil";
import SearchBar from "@/components/SearchBar/SearchBar";
import Container from "@/components/Container/Container";
import UserMenu from "./UserMenu";
import { Search } from "lucide-react";


const Header = () => {
  const pathname = usePathname();

  return (

    <header className="sticky top-0 z-50">

  {/* TOP BAR */}
  <Container className="flex items-center justify-between py-0 bg-light-grey max-w-full text-main-text">

    {/* LEFT */}
    <div className="flex items-center gap-10">
      <Logo />

      {/* 🔍 Desktop search */}
      <div className="hidden md:block relative md:ml-10">
        <SearchBar
          // containerClassName="border-b border-main-text"
          className="pl-6 border-b border-main-text"
          // showIcon={false}
        />
        <Search
          size={18}
          className="absolute right-[330px] top-[50%] -translate-y-1/2 pointer-events-none"
        />
      </div>
    </div>

    {/* RIGHT */}
    <div className="flex items-center gap-6 md:gap-12">

      {/* Desktop user */}
      <div className="hidden md:flex items-center gap-2">
        <UserMenu />
      </div>

      <CartIcon />
      <FavoriteBtn />

      {/* Mobile menu */}
      <div className="md:hidden">
        <NavbarMobil />
      </div>

    </div>
  </Container>

  {/* DESKTOP NAV */}
  <Container className="hidden md:block bg-dark-green text-light-grey">
    <nav className="flex gap-[72px]">
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
    <SearchBar
      // containerClassName="py-2"
      // className="w-full py-2"
      // showIcon={false}
    />
  </Container>

  </header>
  )
}

export default Header;
