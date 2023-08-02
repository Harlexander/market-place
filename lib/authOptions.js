import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "./signin";

export const authOptions = {
    providers: [
        CredentialsProvider({
          type: "credentials",
          credentials: {},

          async authorize(credentials) {
            const user = signInWithEmailAndPassword(credentials.email, credentials.password)
            if (user) {
              return user
            } else {
              return null
            }
          },
          session: {
            strategy: "jwt",
          }
        })
    ],
    secret : process.env.NEXTAUTH_SECRET,

    callbacks: {
        jwt: async ({ token, user }) => {
          if (user) {
            token = { ...token, ...user}
          }

          return token;
        },
        session: ({ session, token, user }) => {
          if (token) {
            session.user = { ...token, ...session.user}
          }

          return session;
        },
      },
}