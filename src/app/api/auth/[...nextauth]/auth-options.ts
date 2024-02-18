import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_AUTH_SECRET as string,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // Credentials({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "Username",
    //       type: "text",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //     },
    //   },
    //   async authorize(credentials, req) {
    //     const { username, password } = credentials as {
    //       username: string;
    //       password: string;
    //     };

    //   },
    // }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.type === "credentials") {
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token, user }) {
      // @ts-ignore
      session.user.id = token.userId;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};
