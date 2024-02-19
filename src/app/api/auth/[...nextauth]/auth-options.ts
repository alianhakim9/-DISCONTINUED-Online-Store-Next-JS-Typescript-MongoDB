import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios, { AxiosError, AxiosResponse } from "axios";

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
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, _req) {
        try {
          return (
            (await axios
              .post(
                `${process.env.NEXT_AUTH_URL}/api/auth/login`,
                {
                  email: credentials?.email,
                  password: credentials?.password,
                },
                {
                  headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response: AxiosResponse) => {
                console.log("response", response);
                return response.data;
              })
              .catch((error: AxiosError) => {
                console.log(error);
                throw new Error(error.message);
              })) || null
          );
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId;
      return session;
    },
  },
};
