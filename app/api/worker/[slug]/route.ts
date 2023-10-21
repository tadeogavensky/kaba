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
      available: true,
    },
    include: {
      service: { include: { category: true } },
      user: true,
      rate: true,
      reviews: true,
    },
  });

  return NextResponse.json(worker);
}
