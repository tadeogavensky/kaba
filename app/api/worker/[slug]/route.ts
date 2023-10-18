import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const parts = params.slug.split("-");

  const id = parts[0];
  const service = parts[1];
  const name = parts[2];

  const worker = await prisma.worker.findFirst({
    where: {
      id: id,
    },
    include: {
      service: { include: { category: true } },
      user: { include: { reviews: true } },
      rate: true,
    },
  });

  console.log(
    `==============WORKER BY ${params.slug.replace(
      /-/g,
      " "
    )}======================`
  );
  console.log(worker);
  console.log("====================================");

  return NextResponse.json(worker);
}
