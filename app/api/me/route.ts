import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
export async function GET(request: Request) {
  const id = cookies().get("user");

  console.log("cookie id", id);

  const user = await prisma.user.findFirst({
    where: { id: id?.value },
    include: {
      addresses: true,
      worker: true,
      client: true,
      bookings: true,
      reviews: true,
      notifications:true,
    },
  });

  return NextResponse.json(user);
}
