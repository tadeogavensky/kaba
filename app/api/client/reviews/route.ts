import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const reviews = await prisma.review.findMany({
    include: {
      client: true,
      worker: { include: { user: true } },
      booking: { include: { service: true } },
    },
  });

  console.log(reviews);

  return NextResponse.json(reviews);
}
