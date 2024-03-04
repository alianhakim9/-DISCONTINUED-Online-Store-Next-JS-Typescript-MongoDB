import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const isAdmin = req.nextUrl.searchParams.get("is_admin");
  const { name, username, email, password } = body;

  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  const newUser = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hash,
      account_type: isAdmin ? "ADMIN" : "USER",
      verifyAsAdmin: false,
    },
  });

  return NextResponse.json({
    ...newUser,
    password: undefined,
  });
}
