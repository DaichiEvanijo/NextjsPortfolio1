import NextAuth, { NextAuthOptions } from "next-auth";
import { options } from "./options2";

const handler = NextAuth(options as NextAuthOptions)

export {handler as GET, handler as POST}
