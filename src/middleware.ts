import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  // const excludePattern = "^(/)?/dashboard/?.*?$";
  // const publicPathnameRegex = RegExp(excludePattern, "i");
  // const isPublicPage = !publicPathnameRegex.test(request.nextUrl.pathname);
  const secret = process.env.NEXT_AUTH_SECRET;
  const token = await getToken({
    req: request,
    secret: secret,
    cookieName: "next-auth.session-token",
  });

  // @ts-ignore
  const isAdmin = token?.user?.isAdmin;

  // home middleware
  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/home", request.url));
  }

  // payment middleware
  if (request.nextUrl.pathname === "/payment") {
    if (!token) {
      return NextResponse.rewrite(new URL("/login", request.url));
    } else {
      return NextResponse.rewrite(new URL("/payment", request.url));
    }
  }

  // admin middleware

  // admin middleware
  // if (url.includes("dashboard")) {
  //   if (!isAdmin) {
  //     return NextResponse.redirect(new URL("/denied", request.nextUrl));
  //   } else if (!token) {
  //     return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  //   }
  // }

  // if (url.includes("/")) {
  //   return NextResponse.redirect(new URL("/home", request.nextUrl));
  // }

  // return NextResponse.next();

  // if (isPublicPage) {
  //   return NextResponse.next();
  // } else if (isPublicPage && skipUrl) {
  //   return NextResponse.redirect(new URL("/home", request.nextUrl));
  // } else if (!isAdmin && !isPublicPage) {
  //   return NextResponse.redirect(new URL("/denied", request.nextUrl));
  // } else {
  //   return (authMiddleware as any)(request);
  // }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/((?!api|_next|.*\\..*).*)",
    "/((?!_next/static|favicon.ico|home|).*)",
    "/((?!_next/static|favicon.ico|login|).*)",
  ],
};
