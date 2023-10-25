import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  if (params.category == "all") {
    const services = await prisma.service.findMany();

    return NextResponse.json(services);
  }

  console.log(params.category);
  
  const services = await prisma.service.findMany({
    where: {
      category: {
        name: params.category,
      },
    },
  });


  console.log(services);

  return NextResponse.json(services);
}
