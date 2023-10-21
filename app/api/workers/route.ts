import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const workers = await prisma.worker.findMany({
    include: { user: true, service: true, rate: true, reviews: true },
  });

  return NextResponse.json(workers);
}
