import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();

  const { about } = body;

  const worker = await prisma.worker.findFirst({
    where: { userId: cookies().get("user")?.value },
  });

  await prisma.worker.update({
    data: {
      about: about,
    },
    where: {
      id: worker?.id,
    },
  });

  return NextResponse.json("About section updated successfully");
}
