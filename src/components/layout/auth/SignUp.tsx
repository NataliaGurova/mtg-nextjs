'use client'

import clsx from 'clsx';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const SignUp = () => {
  const pathname = usePathname();
  const isActive = pathname === "/register";
  
  return (
    <Link
      href="/register"
      className={clsx(
        "relative group border-b-[2px] pb-1 transition-colors",
        isActive ? "text-nav-yellow border-nav-yellow" : "border-transparent hover:border-main-text"
      )}
      title="Register"
    >
        <span className="inline">Register</span>
    </Link>
  )
}

export default SignUp;
