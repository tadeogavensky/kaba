import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString();

  const client = await prisma.client.findFirst({
    where: { userId: cookies().get("user")?.value },
  });

  const worker = await prisma.worker.findFirst({
    where: { userId: cookies().get("user")?.value },
  });



  const pastBookings = await prisma.booking.findMany({
    where: {
      OR: [
        {
          clientId: client?.id,
        },
        { workerId: worker?.id },
      ],

      date: {
        lt: formattedCurrentDate,
      },
    },
    include: {
      address: true,
      service: { include: { category: true } },
      user: true,
      review: true,
      worker: { include: { user: true, reviews: true } },
      client: { include: { user: true, reviews: true } },
    },
  });

  if (pastBookings) {
    return NextResponse.json(pastBookings);
  }

  return NextResponse.json({ msg: "No past bookings found" });
}
