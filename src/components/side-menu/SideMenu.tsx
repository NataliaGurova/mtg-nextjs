import React from 'react'

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    // <div  className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-dark-green/90 text-white/70 shadow-xl ${
    //     isOpen ? "translate-x-0" : "-translate-x-full"
    //   } hoverEffect`}>
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
      <button onClick={onClose} className="p-2">
        X
      </button>
      <div>
        <div>LOGO</div>
        <div></div>
      </div>
    </div>
  )
}

export default SideMenu;
