'use client';

// import SearchBar from "../../search/SearchBar";
// import Container from "../../container/Container";
import Logo from "../../logo/Logo";
import CartIcon from "../../cart-icon/CartIcon";
import FavoriteBtn from "../../favorite-btn/FavoriteBtn";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
// import NavbarMobil from "../../navbar-mobil/NavbarMobil";
import { navLinks } from "@/constants/data";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation';

import NavbarMobil from "../navbar-mobil/NavbarMobil";
import SearchBar from "@/components/SearchBar/SearchBar";
import Container from "@/components/Container/Container";


const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <Container className="flex items-center justify-between bg-light-grey max-w-full text-main-text">
        {/* <div className="w-auto md:w-1/3 flex items-center gap-25 justify-start md:gap-0">
          <Logo/>
          <SearchBar className="hidden md:inline md:ml-10" />
          </div> */}
        <div className="w-auto md:w-1/3 flex items-center justify-start gap-25">
  <Logo />
  <SearchBar containerClassName="hidden md:flex md:ml-10" />
</div>
        <div className="flex w-auto gap-6 md:gap-[50px]">
          <div className="hidden md:flex">
            <SignIn />
            <span className="text-sm">/</span>
            <SignUp/>
          </div>
          <div className="flex items-center gap-6">
          <CartIcon />
          <FavoriteBtn />
                    
          {/* 🔍 тільки на мобілці */}
          <div className="md:hidden">
            <NavbarMobil /> 
            </div>
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
        {/* <SearchBar className="md:hidden mr-2" /> */}
        <SearchBar
          containerClassName="md:hidden mr-2 flex-1"
          showIcon={false} 
          className="w-full"   // инпут на мобилке растягивается
        />
        
      </Container>
    </header>
  )
}

export default Header;
