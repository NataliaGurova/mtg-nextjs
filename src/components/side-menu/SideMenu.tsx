import React from 'react'
import { X } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      className={clsx(
        "fixed top-[126px] right-0 h-full w-64 p-3 pt-5 bg-light-grey shadow-lg z-50 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <button onClick={onClose} className="p-2">
        <X />
      </button>
      <div>
        <div>LOGO</div>
        
      </div>
    </div>
  )
}

export default SideMenu;
