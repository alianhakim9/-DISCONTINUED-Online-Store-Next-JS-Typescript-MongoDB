import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { PRODUCT_IMG_PATH } from "@/utils/constants";
import fs from "fs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const files = formData.getAll("files");
  const categoryId = formData.get("categoryId") as string;
  const stock = formData.get("stock") as string;
  let images: string[] = [];

  await Promise.all(
    Array.from(files).map(async (file: File | FormDataEntryValue) => {
      const mFile = file as File;
      const buffer = Buffer.from(await mFile.arrayBuffer());
      const fileExtension = mFile.name.split(".").pop();
      const fileName = `Product-${Date.now()}.${fileExtension}`;
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

  const product = await prisma.product
    .create({
      data: {
        name,
        description,
        price: Number.parseFloat(price),
        images: images,
        categoryId: categoryId,
        stock: Number(stock),
      },
    })
    .catch(() => {
      console.log("kesini");
      images.forEach((image) => {
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
    });
  return NextResponse.json(product);
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get("q");
  const order = searchParams.get("order");
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");

  if (q) {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: [
        {
          price: order === "lowest-price" ? "asc" : "desc",
        },
        {
          createdAt: order === "asc" ? "asc" : "desc",
        },
      ],
      take: Number.parseInt(limit!),
      include: {
        category: true,
      },
    });
    return NextResponse.json(products);
  } else {
    const products = await prisma.product.findMany({
      orderBy: [
        {
          price: order === "lowest-price" ? "asc" : "desc",
        },
        {
          createdAt: order === "asc" ? "asc" : "desc",
        },
      ],
      take: Number.parseInt(limit!),
      include: {
        category: true,
      },
    });
    return NextResponse.json(products);
  }
}
