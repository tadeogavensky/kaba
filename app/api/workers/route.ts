import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const workers = await prisma.worker.findMany({
    include: { user: true, service: true, rate: true, reviews: true },
    where: {
      available: true,
      rateId: { not: null },
      serviceId: { not: null },
      user: {
        phone: { not: null },
      },
    },
  });

  if (workers) {
    return NextResponse.json(workers);
  } else {
    return NextResponse.json("Couldn't find any workers");
  }
}
