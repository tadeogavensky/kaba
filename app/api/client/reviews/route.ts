import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const reviews = await prisma.review.findMany({ include: { client: true } });

  return NextResponse.json(reviews);
}
