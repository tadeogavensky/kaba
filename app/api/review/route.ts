import prisma from "@/libs/prismadb";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { rating, comment, bookingId, workerId } = body;

  const userId = cookies().get("user")?.value;

  const client = await prisma.client.findFirst({ where: { userId: userId } });

  await prisma.review.create({
    data: {
      rating,
      comment,
      date: new Date(),
      client: {
        connect: {
          id: client?.id,
        },
      },
      booking: {
        connect: {
          id: bookingId,
        },
      },
      worker: {
        connect: {
          id: workerId,
        },
      },
    },
  });

  return NextResponse.json("Review sent successfully");
}
