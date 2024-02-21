import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { PRODUCT_IMG_PATH } from "@/utils/constants";
import fs from "fs";

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  if (params.productId) {
    const product = await prisma.product.findFirst({
      where: {
        id: params.productId,
      },
      include: {
        category: true,
      },
    });
    return NextResponse.json(product);
  }
  return NextResponse.json(false);
}

export async function PUT(
  req: Request,
  { params }: { params: { productId: string } }
) {
  // const body = await req.json();
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const files = formData.getAll("files");
  const existingImages = formData.getAll("existingImages") as string[];
  const categoryId = formData.get("categoryId") as string;
  let images: string[] = existingImages;

  if (params.productId) {
    await Promise.all(
      Array.from(files).map(async (file: File | FormDataEntryValue) => {
        const mFile = file as File;
        const buffer = Buffer.from(await mFile.arrayBuffer());
        const fileName = `${Date.now()}-${mFile.name.replaceAll(" ", "_")}`;
        images.push(fileName);
        try {
          await writeFile(
            path.join(process.cwd(), `public/${PRODUCT_IMG_PATH}/${fileName}`),
            buffer
          );
        } catch (error) {
          console.log(`Error : ${error}`);
        }
      })
    );

    const updatedProduct = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        description,
        price: Number.parseFloat(price),
        images,
        categoryId,
      },
    });
    return NextResponse.json(updatedProduct);
  }
  return NextResponse.json(false);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  if (params.productId) {
    const currentProduct = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    currentProduct?.images.forEach((image) => {
      const imgPath = path.join(
        process.cwd(),
        `public/${PRODUCT_IMG_PATH}/${image}`
      );
      fs.unlink(imgPath, (err) => {
        if (err) {
          return NextResponse.json(false);
        } else {
          return NextResponse.json(true);
        }
      });
    });

    await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json("ok");
  }
  return NextResponse.json(false);
}
