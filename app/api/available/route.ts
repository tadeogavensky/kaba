import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();

  const { available } = body;

  const userId = cookies().get("user")?.value;

  const worker = await prisma.worker.findFirst({ where: { userId: userId } });

  if (worker) {
    await prisma.worker.update({
      data: {
        available: available,
      },
      where: {
        id: worker.id,
      },
    });

    return NextResponse.json("Worker is now available to work");
  } else {
    return NextResponse.json("Worker not found");
  }
}
