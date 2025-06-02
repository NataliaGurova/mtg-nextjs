'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Heart } from "lucide-react";
import clsx from 'clsx';

const FavoriteBtn = () => {
  const pathname = usePathname();
  const isActive = pathname === '/favorite';

  return (
    <Link
      href="/favorite"
      className={clsx(
        "relative group border-b-[2px] pb-1 transition-colors",
        isActive ? "text-nav-yellow border-nav-yellow" : "border-transparent hover:border-main-text"
      )}
      // className={`
      //   group relative flex items-center gap-1 pb-1 transition-colors border-b-2 border-light-grey
      //   ${isActive ? 'text-yellow-400' : 'hover:border-b-2 hover:border-black'}
      // `}
      title="Wishlist"
    >
      <Heart className="w-5 h-5 transition-colors" />

      <span
        className="
          absolute -top-1 -right-3 w-5 h-5 text-xs flex items-center justify-center
          rounded-full bg-dark-green text-light-grey
          transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:bg-green-600
        "
      >
        12
      </span>
    </Link>
  )
}

export default FavoriteBtn;
