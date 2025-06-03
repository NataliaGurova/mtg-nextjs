"use client"

import SearchBar from "../search/SearchBar";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import CartIcon from "../cart-icon/CartIcon";
import FavoriteBtn from "../favorite-btn/FavoriteBtn";
import SignIn from "../sign-in/SignIn";
import SignUp from "../sign-up/SignUp";
import NavbarMobil from "../navbar-mobil/NavbarMobil";
import { navLinks } from "@/constants/data";
import Link from "next/link";

import { usePathname } from "next/navigation";
import clsx from "clsx";


const Header = () => {
  const pathname = usePathname();
  // const isActive = pathname === href;

  return (
    <header className="sticky top-0 z-50">
      <Container className="flex items-center justify-between bg-light-grey max-w-full text-main-text">
        <div className="w-auto md:w-1/3 flex items-center gap-10 justify-start md:gap-0">
          <Logo/>
          <SearchBar className="hidden md:inline md:ml-10" />
        </div>
        <div className="flex w-auto gap-6 md:gap-[50px]">
          <div className="hidden md:flex">
            <SignIn />
            <span>/</span>
            <SignUp/>
          </div>
          <CartIcon /> 
          <FavoriteBtn />

          {/* 🔍 тільки на мобілці */}
          <div className="md:hidden">
            <NavbarMobil /> 
          </div>

        </div>
      </Container>

      <Container className="bg-dark-green text-light-grey px-10 py-5">
        {/* <div className="hidden md:flex">
          <NavLinks direction="row" gap="gap-[72px]" />
        </div> */}
        <div className="hidden md:flex gap-[72px]">
          {navLinks?.map((item) => (
            <Link
              href={item?.href}
              key={item?.label}
              className={clsx(
                "border-b-[2px] pb-1 transition-colors",
                pathname === item?.href ? "text-nav-yellow border-nav-yellow" : "border-transparent hover:border-light-grey"
              )}
            >
              {item?.label}
            </Link>
          ))}
        </div>
        
      {/* 🔍 тільки на мобілці */}
        <SearchBar className="md:hidden mr-2" />
      </Container>
    </header>
  )
}

export default Header;
