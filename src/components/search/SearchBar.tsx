import { Search } from "lucide-react";
import React from "react";


const SearchBar = ({ className }: { className?: string }) => {
  return (
    <div className={className} title="Search">
      <Search className="w-5 h-5 hover:text-shop_light_green cursor-pointer" />
    </div>
  );
};

export default SearchBar;