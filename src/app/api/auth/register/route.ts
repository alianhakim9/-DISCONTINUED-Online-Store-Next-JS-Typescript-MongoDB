import { NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, username, email, password } = body;

  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  const newUser = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hash,
      isAdmin: true,
    },
  });

  return NextResponse.json("ok");
}
