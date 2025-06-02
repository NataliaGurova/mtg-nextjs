"use client";

import React, { useState } from 'react'
import { AlignRight } from 'lucide-react';
import SideMenu from '../side-menu/SideMenu';
import { X } from 'lucide-react';

const NavbarMobil = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="md:hidden">
        <SideMenu
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        title="Menu"
        className="fixed top-4 right-5 z-50 md:hidden"
      >
        {isSidebarOpen ? (
          <X className="text-main-text w-6 h-6" />
        ) : (
          <AlignRight className="text-main-text w-6 h-6" />
        )}
      </button>
      {/* <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} title="Menu">
        <AlignRight className="text-main-text md:hidden hover:cursor-pointer" />
      </button> */}
        {/* <AlignJustify/> */}
      {/* <button onClick={onClose} className="p-1">
        <X />
      </button> */}
    </>
  )
}

export default NavbarMobil