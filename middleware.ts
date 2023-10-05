import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname.startsWith("/auth") && !session) {
    const response = NextResponse.rewrite(new URL("/auth/signin", req.url));
    return response;
  }

  if (session && req.nextUrl.pathname.startsWith("/auth/signin")) {
    const response = NextResponse.redirect(new URL("/", req.url));
    return response;
  }
}

export const config = {
  matcher: ["/auth/(.*)"],
};
