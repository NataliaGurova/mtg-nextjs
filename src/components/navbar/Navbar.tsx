// "use client";

// import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import NavLinks from "../navigation/NavLinks";
import SearchBar from "../search/SearchBar";



const Navbar = () => {
  // const pathname = usePathname();

  return (
    <div className="bg-dark-green text-light-grey px-10 py-5">
      <div className="hidden md:flex">
        <NavLinks direction="row" gap="gap-[72px]" />
      </div>
          {/* 🔍 тільки на мобілці */}
      <SearchBar className="md:hidden mr-2" />
    </div>
  );
};

export default Navbar;