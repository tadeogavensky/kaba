import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString();

  const pastBookings = await prisma.booking.findMany({
    where: {
      userId: cookies().get("user")?.value,
      date: {
        lt: formattedCurrentDate,
      },
    },
    include: {
      address: true,
      service: { include: { category: true } },
      user: true,
      worker: { include: { user: true } },
      client: { include: { user: true } },
    },
  });

  if (pastBookings) {
    return NextResponse.json(pastBookings);
  }

  return NextResponse.json({ msg: "No past bookings found" });
}
