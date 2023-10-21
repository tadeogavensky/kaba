import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const workers = await prisma.worker.findMany({
    include: { user: true, service: true, rate: true, reviews: true },
  });

  if (workers) {
    return NextResponse.json(workers);
  } else {
    return NextResponse.json("Couldn't find any workers");
  }
}
