// "use client";

// import { signOut } from "next-auth/react";
// import {
//   Package,
//   Heart,
//   Settings,
//   LogOut,
//   CreditCard
// } from "lucide-react";
// import css from "./AccountClient.module.css";

// interface AccountUser {
//   id: string;
//   email?: string | null;
//   name?: string | null;
//   firstName?: string;
//   lastName?: string;
// }

// interface AccountClientProps {
//   user: AccountUser;
// }

// export default function AccountClient({ user }: AccountClientProps) {
//   const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();

//   return (
//     <div className={css.container}>
//       {/* HEADER */}
//       <div className={css.headerCard}>
//         <div className={css.avatar}>{initials || "U"}</div>
        
//         <div className={css.infoSection}>
//           <div className={css.nameWrapper}>
//             <h1 className={css.userName}>{user.firstName} {user.lastName}</h1>
//             <span className={css.badge}>Active Member</span>
//           </div>
//           <p className={css.userEmail}>{user.email}</p>
//         </div>

//         <button
//           onClick={() => signOut({ callbackUrl: "/" })}
//           className={css.logoutBtn}
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </div>

//       {/* WIDGET GRID */}
//       <div className={css.grid}>
//         <div className={css.card}>
//           <div className={css.iconWrapper} style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
//             <Package size={28} />
//           </div>
//           <h3 className={css.cardTitle}>My Orders</h3>
//           <p className={css.cardDesc}>View history and track current shipments</p>
//         </div>

//         <div className={css.card}>
//           <div className={css.iconWrapper} style={{ backgroundColor: '#fdf2f8', color: '#db2777' }}>
//             <Heart size={28} />
//           </div>
//           <h3 className={css.cardTitle}>Wishlist</h3>
//           <p className={css.cardDesc}>Cards youve saved for future decks</p>
//         </div>

//         <div className={css.card}>
//           <div className={css.iconWrapper} style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
//             <CreditCard size={28} />
//           </div>
//           <h3 className={css.cardTitle}>Billing</h3>
//           <p className={css.cardDesc}>Manage payment methods and addresses</p>
//         </div>
//       </div>

//       {/* SETTINGS */}
//       <div className={css.settingsCard}>
//         <div className={css.settingsHeader}>
//           <Settings size={20} style={{ color: '#9ca3af' }} />
//           <h2 className={css.settingsTitle}>Personal Information</h2>
//         </div>
        
//         <div className={css.settingsContent}>
//           <div className={css.row}>
//             <div>
//               <p className={css.rowLabel}>Full Name</p>
//               <p className={css.rowValue}>{user.firstName} {user.lastName}</p>
//             </div>
//             <button className={css.editBtn}>Edit</button>
//           </div>

//           <div className={css.row}>
//             <div>
//               <p className={css.rowLabel}>Email Address</p>
//               <p className={css.rowValue}>{user.email}</p>
//             </div>
//             <button className={css.editBtn}>Edit</button>
//           </div>

//           <div className={css.row}>
//             <div>
//               <p className={css.rowLabel}>Account ID</p>
//               <p className={css.rowValue}>{user.id}</p>
//             </div>
//             <button className={css.editBtn}>Copy</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
// import { Package, Heart, Settings, CreditCard, LogOut, User, Pencil, Mail } from "lucide-react";
import { Settings, User, Pencil, Mail } from "lucide-react";
import css from "./AccountClient.module.css";

interface AccountUser {
  id: string;
  email?: string | null;
  name?: string | null;
  firstName?: string;
  lastName?: string;
}

interface AccountClientProps {
  user: AccountUser;
}

// Список наших вкладок (я убрал RL Wardrobe и адаптировал под магазин)
const TABS = ["Profile", "Wishlist", "Orders/Returns", "Addresses", "Payments"];

export default function AccountClient({ user }: AccountClientProps) {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className={css.container}>
      
      {/* --- НОВАЯ КЛАССИЧЕСКАЯ ШАПКА --- */}
      <div className={css.classicHeader}>
        <div className={css.welcomeRow}>
          <h1 className={css.heading}>
            Welcome to Citadel, {user.firstName || "Guest"}
          </h1>
          {/* <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className={css.signOutBtn}
            title="Logout"
            
          >
            <LogOut className="w-4 h-4" />
            <span className="inline">Logout</span>
          </button> */}
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className={css.signOutBtn}
          >
          Logout
          </button>
        </div>

        <nav className={css.navMenu}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${css.navItem} ${activeTab === tab ? css.navItemActive : ""}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* --- КОНТЕНТ ВКЛАДОК --- */}
      <div className="mt-8">
        
        {/* Показываем этот блок только если выбрана вкладка Overview */}
        {/* {activeTab === "Overview" && (
          <div className={css.grid}>
            <div className={css.card}>
              <div className={css.iconWrapper} style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <Package size={28} />
              </div>
              <h3 className={css.cardTitle}>My Orders</h3>
              <p className={css.cardDesc}>View history and track current shipments</p>
            </div>

            <div className={css.card}>
              <div className={css.iconWrapper} style={{ backgroundColor: '#fdf2f8', color: '#db2777' }}>
                <Heart size={28} />
              </div>
              <h3 className={css.cardTitle}>Wishlist</h3>
              <p className={css.cardDesc}>Cards youve saved for future decks</p>
            </div>

            <div className={css.card}>
              <div className={css.iconWrapper} style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
                <CreditCard size={28} />
              </div>
              <h3 className={css.cardTitle}>Billing</h3>
              <p className={css.cardDesc}>Manage payment methods and addresses</p>
            </div>
          </div>
        )} */}

        {/* Показываем этот блок только если выбрана вкладка Profile */}
        {activeTab === "Profile" && (
          <div className={css.settingsCard}>
            <div className={css.settingsHeader}>
              <Settings size={20} style={{ color: '#9ca3af' }} />
              <h2 className={css.settingsTitle}>Personal Information</h2>
            </div>
            <div className={css.settingsContent}>
              <div className={css.row}>
                <div>
                <User className="w-5 h-5" />
                  <p className={css.rowValue}>{user.firstName} {user.lastName}</p>
                </div>
                <button className={css.editBtn}><Pencil /></button>
              </div>
              <div className={css.row}>
                <div>
                  <Mail className="w-5 h-5" />
                  <p className={css.rowValue}>{user.email}</p>
                </div>
                <button className={css.editBtn}><Pencil /></button>
              </div>
            </div>
          </div>
        )}

        {/* Заглушки для остальных вкладок */}
        {["Wishlist", "Orders/Returns", "Addresses", "Payments"].includes(activeTab) && (
          <div className="text-gray-500 py-10 text-center font-serif">
            Content for {activeTab} will be here.
          </div>
        )}
      </div>

    </div>
  );
}