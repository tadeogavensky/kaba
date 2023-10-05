import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/libs/prismadb";
import login from "@/utils/auth";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log({ session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.email,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
    async signIn({ profile }) {
      console.log("profile :>> ", profile);

      try {
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
