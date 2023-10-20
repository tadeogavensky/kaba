import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const booking = await prisma.booking.findFirst({
    where: { id: params.id },
    include: {
      worker: { include: { user: true } },
      client: { include: { user: true } },
      service: true,
    },
  });

  await prisma.booking.delete({ where: { id: params.id } });

  if (cookies().get("role")?.value === "client") {
    await prisma.notification.create({
      data: {
        text: `The job booked by ${booking?.client.user.firstName} ${
          booking?.client.user.lastName
        } for ${booking?.service.name.toLocaleUpperCase()} has been canceled`,
        user: {
          connect: {
            id: booking?.worker.userId,
          },
        },
      },
    });
  } else {
    await prisma.notification.create({
      data: {
        text: `The job you booked for ${booking?.service.name.toLocaleUpperCase()} has been canceled by the KabaProp`,
        user: {
          connect: {
            id: booking?.client.userId,
          },
        },
      },
    });
  }

  return NextResponse.json({ msg: "Booking canceled" });
}
