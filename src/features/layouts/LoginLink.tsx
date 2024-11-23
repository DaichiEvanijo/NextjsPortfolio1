"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { FaSpinner } from 'react-icons/fa';

const LoginLink = () => {
 const {data:session, status} = useSession()

 if (status === "loading") {
  return <p className="h-[72px] flex justify-center items-center animate-spin">
      <FaSpinner  size={20}/>
  </p>;
}

  return (
    <>
      {session ? 
        <button onClick={() => signOut({ callbackUrl: "/" })} className='hover:opacity-30 transition-opacity duration-500 ease-in-out'>Logout</button>
        :<button onClick={() => signIn(undefined, { callbackUrl: "/" })} className='hover:opacity-50 transition-opacity duration-500 ease-in-out'>Login</button>
      }
    </>
  )
}

export default LoginLink