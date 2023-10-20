import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
export async function GET() {
  const id = cookies().get("user");

  console.log("cookie id", id);

  const user = await prisma.user.findFirst({
    where: { id: id?.value },
    include: {
      worker: { include: { service: true, rate: true } },
      client: { include: { addresses: true } },
      bookings: {
        include: {
          worker: { include: { user: true } },
          client: { include: { user: true } },
          address: true,
          user: true,
          service: true,
        },
      },
      reviews: true,
      notifications: true,
    },
  });

  return NextResponse.json(user);
}
