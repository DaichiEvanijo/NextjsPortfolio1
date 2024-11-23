"use client";
// Header 72px

import Hamburger from "hamburger-react";
import { RxAvatar } from "react-icons/rx";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="h-[72px] flex justify-center items-center animate-spin">
        <FaSpinner  size={20}/>
    </p>;
  }

  return (
    <header className="z-10 h-[72px] sticky top-0  bg-gradient-to-r from-blue-200 via-yellow-200 to-blue-200 p-2 ">
      <section className="mx-auto max-w-4xl flex justify-between items-center">
        <h1 className="text-4xl">Next.js</h1>
        <nav>
          <ul
            className={`flex sm:hidden flex-col items-center gap-4 h-screen justify-evenly absolute right-0 left-0 bg-gradient-to-r from-blue-200 via-yellow-200 to-blue-200 transition-all ease-in-out duration-500 ${
              isOpen ? "top-0" : "top-[-100vh]"
            }`}
          >
            <NavbarList session={session} isOpen={isOpen} setOpen={setOpen} />
          </ul>
        </nav>
        <nav>
          <ul className="hidden sm:flex justify-center items-center gap-4">
            <NavbarList session={session} isOpen={isOpen} setOpen={setOpen} />
          </ul>
        </nav>
        <div className="flex sm:hidden z-1">
          <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
        </div>
      </section>
    </header>
  );
};

export default Header;




type NavbarListProps = {
  session: Session | null;
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};
const NavbarList = ({ session, isOpen, setOpen }: NavbarListProps) => {
  return (
    <>
      <li onClick={() => isOpen && setOpen((prev) => !prev)} className="nav-item">
        <Link href="/">Home</Link>
      </li>
      <li onClick={() => isOpen && setOpen((prev) => !prev)} className="nav-item">
        <Link href="/postslist">Blog</Link>
      </li>
      <li onClick={() => isOpen && setOpen((prev) => !prev)} className="nav-item">
        <Link href="/productslist">Merch</Link>
      </li>
      {session && session.user.role === 5150 ? (
        <li onClick={() => isOpen && setOpen((prev) => !prev)} className="nav-item">
          <Link href="/admin">Admin</Link>
        </li>
      ) : null}
      {!isOpen && session ? (
        session.user.image ? (
          <li className="flex flex-col items-center">
            <div>
              <Image
                className=" "
                src={session.user.image}
                width={13.75}
                height={13.75}
                alt={session.user.name ?? null}
                priority={true}
              />
            </div>
            <span>{session.user.name}</span>
          </li>
        ) : (
          <li className="flex flex-col items-center">
            <RxAvatar />
            <span>{session.user.name}</span>
          </li>
        )
      ) : null}
      {!session && (
        <>
          <li onClick={() => isOpen && setOpen((prev) => !prev)} className="nav-item">
            <button onClick={() => signIn(undefined, { callbackUrl: "/" })}>
              Login
            </button>
          </li>
          <li onClick={() => isOpen && setOpen((prev) => !prev)} className="nav-item">
            <Link href="/register">Register</Link>
          </li>
        </>
      )}
      {session && (
        <li onClick={() => isOpen && setOpen((prev) => !prev)} className="nav-item">
          <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
        </li>
      )}
    </>
  );
};
