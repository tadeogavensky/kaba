import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
cookies;
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = cookies().get("user")?.value;

  await prisma.address.delete({ where: { id: params.id } });

  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: {
      addresses: true,
      worker: true,
      client: true,
      bookings: true,
      reviews: true,
      notifications: true,
    },
  });

  return NextResponse.json({ msg: "Address deleted", user: user });
}
