"use client";

import React, { useState } from 'react'
import { AlignLeft } from 'lucide-react';
import SideMenu from '../side-menu/SideMenu';

const NavbarMobil = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {/* <AlignJustify/> */}
        <AlignLeft className="text-main-text md:hidden hover:cursor-pointer" />
      </button>
      {/* <button onClick={onClose} className="p-2">
        X
      </button> */}
      <div className="md:hidden">
        <SideMenu
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </>
  )
}

export default NavbarMobil