// import Link from 'next/link';
// import { navLinks } from '@/constants/data';
// import { X } from 'lucide-react';

import { usePathname } from 'next/navigation';
import React from 'react'
import clsx from 'clsx';
import SignIn from '../sign-in/SignIn';
import SignUp from '../sign-up/SignUp';
import { navLinks } from '@/constants/data';
import Link from 'next/link';


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "fixed top-[126px] right-0 h-full w-64 p-3 pt-5 bg-light-grey shadow-lg z-50 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >

        <div className="flex">
            <SignIn />
            <SignUp/>
      </div>
      
      <div className="flex flex-col mt-5 gap-6">
          {navLinks?.map((item) => (
            <Link
              href={item?.href}
              key={item?.label}
              className={clsx(
                "border-b-[2px] pb-1 transition-colors",                        
                pathname === item?.href ? "text-nav-yellow border-nav-yellow" : "border-transparent hover:border-main-text"            
              )}
              // className={`hover:border-b-1 border-b-main-text pb-1 hoverEffect ${
              //   pathname === item?.href && "text-nav-yellow border-b-1 border-b-nav-yellow"
              // }`}
            >
              {item?.label}
            </Link>
          ))}
        </div>

      {/* <div className="flex flex-col mt-5">
        <NavLinks direction="col" gap="gap-6" mobile />
      </div> */}
    </div>
  )
}

export default SideMenu;
