import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const bookings = await prisma.booking.findMany({
    where: { userId: cookies().get("user")?.value },
    include: {
      address: true,
      service: true,
      user: true,
      worker: { include: { user: true } },
      client: true,
    },
  });

  bookings.forEach((booking) => {});

  return NextResponse.json(bookings);
}
