import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { categoryId: string } }
) {
  if (params.categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  }
  return NextResponse.json(false);
}

export async function PUT(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const body = await req.json();
  const { name } = body;

  const updatedCategory = await prisma.category.update({
    where: {
      id: params.categoryId,
    },
    data: {
      name,
    },
  });
  return NextResponse.json(updatedCategory);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { categoryId: string } }
) {
  if (params.categoryId) {
    await prisma.category.delete({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json("ok");
  }
  return NextResponse.json(false);
}
