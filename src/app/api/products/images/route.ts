import { PRODUCT_IMG_PATH } from "@/utils/constants";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
  const body = await req.json();
  const { fileName, productId } = body;

  if (fileName) {
    const currentProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    const updatedImages = currentProduct?.images.filter(
      (image) => image !== fileName
    );

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        images: updatedImages,
      },
    });
    const imgPath = path.join(
      process.cwd(),
      `public/${PRODUCT_IMG_PATH}/${fileName}`
    );
    fs.unlink(imgPath, (err) => {
      if (err) {
        return NextResponse.json(false);
      } else {
        return NextResponse.json(true);
      }
    });
  }

  return NextResponse.json("ok");
}
