import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
cookies;
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.worker.update({
    data: {
      country: null,
      state: null,
      city: null,
      postalCode: null,
      neighbourhood: null,
      street: null,
      number: null,
    },
    where: { id: params.id },
  });

  return NextResponse.json({ msg: "Address deleted" });
}
