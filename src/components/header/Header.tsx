import Link from "next/link";
import Navbar from "../navbar/Navbar";
import SearchBar from "../search/SearchBar";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import CartIcon from "../cart-icon/CartIcon";
import FavoriteBtn from "../favorite-btn/FavoriteBtn";
import SignIn from "../sign-in/SignIn";
import SignUp from "../sign-up/SignUp";
import NavbarMobil from "../navbar-mobil/NavbarMobil";


const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <Container className="flex items-center justify-between bg-light-grey max-w-full text-main-text">
        <div className="w-auto md:w-1/3 flex items-center gap-10 justify-start md:gap-0">
          <NavbarMobil/>
          <Logo/>
          <SearchBar />
          </div>
        <div className="flex w-auto gap-5 md:gap-[50px]">
          <div className="flex">
            <SignIn />
            <SignUp/>
          </div>
          <CartIcon />
          <FavoriteBtn/>
          </div>
      </Container>
      <Navbar/>
    </header>
  )
}

export default Header;
