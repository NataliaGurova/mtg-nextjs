import Link from 'next/link';
import React from 'react'
import { User } from "lucide-react";

// Sign in
const SignIn = () => {
return (
<Link
    href="/login"
  className="flex">
    <User className="w-5 h-5"/>
    <span className="hidden md:inline">Login</span> 
      </Link>
  );
}

export default SignIn;