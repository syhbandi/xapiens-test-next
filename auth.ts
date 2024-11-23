import NextAuth, { type DefaultSession } from "next-auth";
import credentials from "next-auth/providers/credentials";

import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      token: string | unknown;
    } & DefaultSession["user"];
  }

  interface User {
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      authorize: async (credentials) => {
        console.log(credentials);
        const response = await fetch(`${process.env.API_URL}/login`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) return null;
        const user = await response.json();
        console.log(user);
        return user ?? null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.token = token.token;
      return session;
    },
    authorized: ({ request, auth }) => {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/dashboard")) return !!auth;

      return true;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
});
