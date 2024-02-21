import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  await prisma.category.create({
    data: {
      name,
    },
  });

  return NextResponse.json("ok");
}
