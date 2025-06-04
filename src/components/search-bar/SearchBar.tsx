import { Search } from "lucide-react";
import React from "react";



const SearchBar = () => {
  return (
    <div className="hidden md:inline md:ml-25">
      <Search className="w-5 h-5 hover:text-shop_light_green cursor-pointer hidden md:inline" />
    </div>
  )
}

export default SearchBar;