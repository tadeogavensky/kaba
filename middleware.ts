import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authTokens = request.cookies.get("authTokens")?.value;

  if (request.nextUrl.pathname.startsWith("/") && !authTokens) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authTokens");
    return response;
  }
  if (authTokens&& request.nextUrl.pathname.startsWith("/login") ) {
    const response = NextResponse.redirect(new URL("/", request.url));
    return response;
  }
}

export const config = {
  matcher: ["/(auth)", "/log-in"],
};
