"use client"
import Button from "@/components/elements/Button"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { FaSpinner } from "react-icons/fa"


const AddPostButton = () => {
  const {data:session, status} = useSession()

  if (status === "loading") {
    return <p className="h-[72px] flex justify-center items-center animate-spin">
        <FaSpinner  size={20}/>
    </p>;
  }

  return (
    <>
      {session ? (
        <div className="flex flex-col gap-4 ">
          <Button variant="yellowButton" size="yellowButton"><Link href="/addpostform">Create Post</Link></Button>      
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 ">
          <p className="text-xl  bg-gradient-to-r from-lime-200  to-yellow-500  text-transparent bg-clip-text">Login to create and react with posts</p>
          <Button variant="yellowButton" size="yellowButton" onClick={() => signIn(undefined, { callbackUrl: "/postslist" })}>
              Login
          </Button >
        </div>
      )}
    </>
  )
}

export default AddPostButton