import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { serviceName: string } }
) {
  console.log(params.serviceName);

  const workers = await prisma.worker.findMany({
    where: {
      service: {},
    },
  });

  return NextResponse.json({
    msg: `Workers by ${params.serviceName}`,
    workers: workers,
  });
}
