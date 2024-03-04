import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const secret = process.env.NEXT_AUTH_SECRET;
  const token = await getToken({
    req: request,
    secret: secret,
    cookieName: "next-auth.session-token",
  });

  const isAdmin =
    // @ts-ignore
    token?.user.account_type === "ADMIN" && token?.user.verifyAsAdmin === true;

  // home middleware
  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/home", request.url));
  }

  // payment middleware
  if (request.nextUrl.pathname === "/payment") {
    if (!token) {
      return NextResponse.rewrite(new URL("/sign-in", request.url));
    } else {
      return NextResponse.rewrite(new URL("/payment", request.url));
    }
  }

  // admin middleware
  if (request.nextUrl.pathname.includes("/dashboard")) {
    if (!token) {
      return NextResponse.rewrite(new URL("/home", request.url));
    } else {
      if (isAdmin) {
        return NextResponse.next();
      } else {
        return NextResponse.rewrite(new URL("/denied", request.url));
      }
    }
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/((?!api|_next|.*\\..*).*)",
    "/((?!_next/static|favicon.ico|home|).*)",
    "/((?!_next/static|favicon.ico|login|).*)",
  ],
};
