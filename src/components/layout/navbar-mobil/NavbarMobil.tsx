// "use client";

// import React, { useState } from 'react'
// import SideMenu from '../side-menu/SideMenu';
// import { AlignRight, X } from 'lucide-react';

// const NavbarMobil = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <>
//       <SideMenu
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//       />

//       <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//         <AlignRight className="text-main-text w-6 h-6" />
//       </button>
//       <button onClick={onClose} title="Close menu" className="p-2">
//               <X />
//             </button>
//     </>
//   )
// }

// export default NavbarMobil;

"use client";

import React, { useState } from "react";
import SideMenu from "../side-menu/SideMenu";
import { AlignRight, X } from "lucide-react";

const NavbarMobile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <SideMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        // className="pb-2"
        // className="relative top-[1px]"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-main-text" />
        ) : (
          <AlignRight className="w-6 h-6 text-main-text" />
        )}
      </button>
    </>
  );
};

export default NavbarMobile;



// "use client";

// import React, { useState } from 'react';
// import { AlignRight, X } from 'lucide-react';
// import SideMenu from '../side-menu/SideMenu';

// const NavbarMobil = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   return (
//     <>
//       <SideMenu
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//       />

//       <button
//         onClick={toggleSidebar}
//         title="Menu"
//         className="fixed top-4 right-5 z-50 md:hidden"
//       >
//         {isSidebarOpen ? (
//           <X className="text-main-text w-6 h-6" />
//         ) : (
//           <AlignRight className="text-main-text w-6 h-6" />
//         )}
//       </button>
//     </>
//   );
// };

// export default NavbarMobil;