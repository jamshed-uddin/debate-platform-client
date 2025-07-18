import NextAuth, { User } from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { requestClient } from "./lib/requestClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  pages: {
    error: "/login",
  },
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const user = await requestClient<User>(`/users/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!user) {
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as typeof session.user;
      }

      return session;
    },
  },
});
