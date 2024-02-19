import { prisma } from "@/lib/prisma";
import { compareSync } from "bcrypt-ts";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({
    // @ts-ignore
    where: {
      email: email,
    },
  });

  if (user) {
    if (compareSync(password, user.password!)) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json(
        {
          message: "Login Failed",
        },
        { status: 400 }
      );
    }
  }

  return NextResponse.json("ok");
}
