import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString();

  const upcomingBookings = await prisma.booking.findMany({
    where: {
      userId: cookies().get("user")?.value,
      date: {
        gte: formattedCurrentDate,
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

  if (upcomingBookings) {
    return NextResponse.json(upcomingBookings);
  }

  return NextResponse.json({ msg: "No upcoming bookings found" });
}
