import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// @ts-ignore
const authMiddleware = withAuth(
  async function onSuccess(request: NextRequest) {},
  {
    callbacks: {
      // authorized: ({ token }) => {
      //   // @ts-ignore
      //   const isAdmin = token?.user?.isAdmin;
      //   return token !== null && isAdmin;
      // },
      authorized: ({ token }) => token !== null,
    },
    pages: {
      signIn: "/auth/login",
    },
    secret: process.env.NEXT_AUTH_SECRET,
  }
);

export default async function middleware(request: NextRequest) {
  const excludePattern = "^(/)?/dashboard/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(request.nextUrl.pathname);
  const secret = process.env.NEXT_AUTH_SECRET;
  const token = await getToken({
    req: request,
    secret: secret,
    cookieName: "next-auth.session-token",
  });

  // @ts-ignore
  const isAdmin = token?.user?.isAdmin;

  if (isPublicPage) {
    return NextResponse.next();
  } else if (!isAdmin && !isPublicPage) {
    return NextResponse.redirect(new URL("/denied", request.nextUrl));
  } else {
    return (authMiddleware as any)(request);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
