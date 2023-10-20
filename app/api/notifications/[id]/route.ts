import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("====================================");
  console.log("entra aca");
  console.log("====================================");
  const notifications = await prisma.notification.deleteMany({
    where: { userId: params.id },
  });

  console.log(notifications);

  return NextResponse.json({ msg: "Notifications clear" });
}
