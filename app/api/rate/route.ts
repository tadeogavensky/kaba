import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { rate, currency, serviceId, workerId } = body;

  const worker = await prisma.worker.findFirst({
    where: {
      userId: cookies().get("user")?.value,
    },
  });

  const existingRate = await prisma.rate.findFirst({
    where: { workerId: worker?.id },
  });

  console.log(existingRate);

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
    return NextResponse.json("Rate created");
  } else {
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
}
