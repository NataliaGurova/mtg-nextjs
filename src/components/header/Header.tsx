'use client';

import SearchBar from "../search-bar/SearchBar";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import CartIcon from "../cart-icon/CartIcon";
import FavoriteBtn from "../favorite-btn/FavoriteBtn";
import SignIn from "../sign-in/SignIn";
import SignUp from "../sign-up/SignUp";
import NavbarMobil from "../navbar-mobil/NavbarMobil";
import { navLinks } from "@/constants/data";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation';


const Header = () => {
  const pathname = usePathname();

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
            <span className="text-sm">/</span>
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

      {/* Bottom nav section */}
      <Container className="bg-dark-green text-light-grey">
        <nav className="hidden md:flex gap-[72px]">
          {navLinks.map(({ href, label }) => (
            <Link
              href={href}
              key={label}
              className={clsx(
                'relative pb-1 hoverEffect',
                pathname === href
                  ? 'text-nav-yellow border-b-2 border-nav-yellow'
                  : 'border-b-2 border-transparent hover:border-light-grey'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 🔍 тільки на мобілці */}
        <SearchBar className="md:hidden mr-2" />
        
      </Container>
    </header>
  )
}

export default Header;
