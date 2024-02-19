import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

let isAdmin = false;

const authMiddleware = withAuth(
  async function onSuccess(req: NextRequest) {
    // @ts-ignore
    isAdmin = req.nextauth?.token.user.isAdmin;
  },
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

export default async function middleware(req: NextRequest) {
  const excludePattern = "^(/)?/dashboard/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return NextResponse.next();
  } else if (!isAdmin) {
    return NextResponse.redirect(new URL("/denied", req.nextUrl));
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
