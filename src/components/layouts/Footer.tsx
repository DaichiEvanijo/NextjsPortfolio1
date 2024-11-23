import Link from "next/link"
import { FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa"
import LoginLink from "@/features/layouts/LoginLink"

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-r from-blue-200 via-yellow-200 to-blue-200 p-10 space-y-4 ">
      <section className="mx-auto text-center max-w-4xl grid grid-cols-1 md:grid-cols-3 ">
        <div className="border-2 rounded border-slate-300 flex flex-col justify-center gap-2">
          <p className="text-2xl">Links</p>
          <LoginLink/>
          <Link href="/forgetpassword">Forgot Password ?</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/">Home</Link>
        </div>
        <div className="border-2 rounded border-slate-300 flex flex-col gap-2">
          <p className="text-2xl">Contact</p>
          <p>Kurfürstenstraße 31<br/>40211 Düsseldorf Deutschland</p>
          <p>+4917681526599<br/>takanogi2468@gmail.com</p>
        </div>
        <div className="border-2 rounded border-slate-300 flex flex-col gap-2">
          <p className="text-2xl mb-2">Socials</p>
          <Link href="https://www.youtube.com"  target="_blank"><FaYoutube size={24} className="inline mr-2"/><span>Youtube</span></Link>
          <Link href="#"  target="_blank"><FaInstagram size={24} className="inline mr-2"/><span>Instagram</span></Link>
          <Link href="#"  rel="noopener noreferrer" target="_blank"><FaTelegramPlane size={24} className="inline mr-2"/><span>Telegram</span></Link>
        </div>  
      </section>
      <section className="text-center">
        <p><span>&copy;{new Date().getFullYear()} -Daichi Koyanagi- </span><span><Link href="/">Datenschutz </Link></span><span><Link href="/">Impressum</Link> </span></p>
      </section>
    </footer>
  )
}

export default Footer