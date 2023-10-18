import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const services = await prisma.service.findMany({
    where: {
      category: {
        name: params.category,
      },
    },
  });

  return NextResponse.json(services);
}