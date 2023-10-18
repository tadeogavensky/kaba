import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { rate, currency, serviceId, workerId } = body;

  const existingRate = await prisma.rate.findFirst({
    where: { workerId: workerId },
  });

  if (!existingRate) {
    await prisma.rate.create({
      data: {
        rate: rate,
        currency: currency,
        serviceId: serviceId,
        workerId: workerId,
        worker: {
          connect: { id: workerId },
        },
      },
    });
  }

  await prisma.rate.update({
    data: {
      rate: rate,
      currency: currency,
    },
    where: {
      id: existingRate?.id,
    },
  });

  return NextResponse.json("Rate updated");
}
