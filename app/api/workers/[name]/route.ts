import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const workers = await prisma.worker.findMany({
    where: {
      service: {
        name: params.name.replace(/-/g, " "),
      },
      available: true,
    },
    include: {
      service: true,
      rate: true,
      user: true,
    },
  });

  return NextResponse.json(workers);
}
