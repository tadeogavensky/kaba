import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("user");
  const role = request.cookies.get("role")?.value;

  if (!session) {
    const response = NextResponse.rewrite(new URL("/auth/signin", request.url));
    return response;
  }

  if (session && request.nextUrl.pathname.startsWith("/auth/signin")) {
    const response = NextResponse.rewrite(new URL("/", request.url));
    return response;
  }

  if (
    session &&
    role === "worker" &&
    request.nextUrl.pathname.startsWith("/auth/worker/book")
  ) {
    const response = NextResponse.rewrite(new URL("/", request.url));
    return response;
  }

  return NextResponse.next();

/*   if (!session && request.nextUrl.pathname.startsWith("/auth/worker/book")) {
    console.log("====================================");
    console.log("ENTRA ACA");
    console.log("====================================");
    const response = NextResponse.rewrite(new URL("/auth/signin", request.url));
    return response;
  } */
}

export const config = {
  matcher: ["/auth/(.*)"],
};
