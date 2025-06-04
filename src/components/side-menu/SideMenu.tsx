'use client'

import React from 'react'
import { X } from 'lucide-react';
import clsx from 'clsx';
import SignIn from '../sign-in/SignIn';
import SignUp from '../sign-up/SignUp';
import { navLinks } from '@/constants/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "fixed top-[130px] right-0 h-full w-64 p-3 pt-5 bg-light-grey shadow-lg z-50 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <button onClick={onClose} title="Close menu" className="p-2">
        <X />
      </button>
      <div className="flex">
        <SignIn />
        <span className="text-sm opacity-60">/</span>
        <SignUp />
      </div>
      <nav className="flex flex-col mt-5 gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              href={href}
              key={label}
              className={clsx(
                "border-b-[2px] pb-1 transition-colors",                        
                pathname === href
                  ? "text-nav-yellow border-nav-yellow"
                  : "border-transparent hover:border-main-text"            
              )}
              // className={`hover:border-b-1 border-b-main-text pb-1 hoverEffect ${
              //   pathname === item?.href && "text-nav-yellow border-b-1 border-b-nav-yellow"
              // }`}
            >
              {label}
            </Link>
          ))}
        </nav>
    </div>
  )
}

export default SideMenu;
