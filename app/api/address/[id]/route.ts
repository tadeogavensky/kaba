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

  return NextResponse.json({ msg: "Address deleted" });
}
