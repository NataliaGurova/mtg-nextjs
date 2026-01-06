'use client'

import Link from 'next/link';
import React from 'react'
import { User } from "lucide-react";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Sign in
const SignIn = () => {
  const pathname = usePathname();
  const isActive = pathname === "/login";

  return (  
    <Link    
      href="/login"    
      className={clsx(
        "relative flex border-b-[2px] pb-1 transition-colors",
        isActive ? "text-nav-yellow border-nav-yellow" : "border-transparent hover:border-main-text"
      )}    
      title="Login"  
    >
    <User className="w-5 h-5"/>
    <span className="inline">Login</span> 
    </Link>
  );
}

export default SignIn;