
// 'use client'

// import Link from 'next/link';
// import { User } from "lucide-react";
// import { usePathname } from 'next/navigation';
// import clsx from 'clsx';

// // Sign in
// const SignIn = () => {
//   const pathname = usePathname();
//   const isActive = pathname === "/login";

//   return (  
//     <Link    
//       href="/login"    
//       className={clsx(
//         "relative flex border-b-[2px] pb-1 transition-colors",
//         isActive ? "text-nav-yellow border-nav-yellow" : "border-transparent hover:border-main-text"
//       )}    
//       title="Login"  
//     >
//     <User className="w-5 h-5"/>
//     <span className="inline">Login</span> 
//     </Link>
//   );
// }

// export default SignIn;

// 'use client'

// import clsx from 'clsx';
// import Link from 'next/link'
// import { usePathname } from 'next/navigation';

// const SignUp = () => {
//   const pathname = usePathname();
//   const isActive = pathname === "/register";
  
//   return (
//     <Link
//       href="/register"
//       className={clsx(
//         "relative group border-b-[2px] pb-1 transition-colors",
//         isActive ? "text-nav-yellow border-nav-yellow" : "border-transparent hover:border-main-text"
//       )}
//       title="Register"
//     >
//         <span className="inline">Register</span>
//     </Link>
//   )
// }

// export default SignUp;

"use client";

import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const UserMenu = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const firstName = session?.user?.name?.split(" ")[0];

  // 🔓 НЕ залогинен
  if (!session?.user) {
    const isLoginActive = pathname === "/login";
    const isRegisterActive = pathname === "/register";

    return (
      <>
        <Link
          href="/login"
          className={clsx(
            "relative flex items-center gap-1 border-b-[2px] pb-1 transition-colors",
            isLoginActive
              ? "text-nav-yellow border-nav-yellow"
              : "border-transparent hover:border-main-text"
          )}
          title="Login"
        >
          <User className="w-5 h-5" />
          <span className="inline">Login</span>
        </Link>

        <span className="text-sm">/</span>

        <Link
          href="/register"
          className={clsx(
            "relative border-b-[2px] pb-1 transition-colors",
            isRegisterActive
              ? "text-nav-yellow border-nav-yellow"
              : "border-transparent hover:border-main-text"
          )}
          title="Register"
        >
          <span className="inline">Register</span>
        </Link>
      </>
    );
  }

  // 🔐 ЗАЛОГИНЕН
  const isAccountActive = pathname.startsWith("/account");

  return (
    <div className="relative group flex items-center gap-4">
      <Link
        href="/account"
        className={clsx(
          "relative flex items-center gap-1 border-b-[2px] pb-1 transition-colors",
          isAccountActive
            ? "text-nav-yellow border-nav-yellow"
            : "border-transparent hover:border-main-text"
        )}
        title="My account"
      >
        <User className="w-5 h-5" />
        <span className="inline">{firstName}</span>
      </Link>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="relative flex items-center gap-1 border-b-[2px] pb-1 transition-colors border-transparent hover:border-main-text"
        title="Sign out"
      >
        <LogOut className="w-4 h-4" />
        <span className="inline">Sign out</span>
      </button>
    </div>
  );
};

export default UserMenu;
