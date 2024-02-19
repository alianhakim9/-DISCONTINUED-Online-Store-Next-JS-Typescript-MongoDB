import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const authMiddleware = withAuth(function onSuccess(req) {}, {
  callbacks: {
    authorized: ({ token }) => token !== null,
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
});

export default async function middleware(req: NextRequest) {
  const excludePattern = "^(/)?/dashboard/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);
  if (isPublicPage) {
    return NextResponse.next();
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
