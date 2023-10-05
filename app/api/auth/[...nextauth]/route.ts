import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/libs/prismadb";
import login from "@/utils/auth";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
        role: {},
      },
      async authorize(credentials, req) {
        if (
          !credentials?.email ||
          !credentials.password ||
          !credentials?.role
        ) {
          return null;
        }

        try {
          const user = await login(
            credentials.email,
            credentials.password,
            credentials.role
          );
          console.log("user :>> ", user);
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
