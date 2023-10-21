import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const notifications = await prisma.notification.deleteMany({
    where: { userId: params.id },
  });


  return NextResponse.json({ msg: "Notifications clear" });
}
