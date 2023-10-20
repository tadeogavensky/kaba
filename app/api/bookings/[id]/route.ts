import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.booking.delete({ where: { id: params.id } });

  return NextResponse.json({ msg: "Booking canceled" });
}
