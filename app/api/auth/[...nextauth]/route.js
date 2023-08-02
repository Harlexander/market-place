import { authOptions } from "@/lib/authOptions";
import { signInWithEmailAndPassword } from "@/lib/signin";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth(authOptions); 

export { handler as GET, handler as POST };