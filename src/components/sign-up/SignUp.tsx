import Link from 'next/link'
import React from 'react'

const SignUp = () => {
  return (
    <Link
      href="/register">
        <span className="hidden md:inline">/Register</span>
    </Link>
  )
}

export default SignUp
