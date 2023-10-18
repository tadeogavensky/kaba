import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const userId = cookies().get("user")?.value;

  console.log(userId);

  console.log(body);
  const {
    fullAddress,
    street,
    city,
    state,
    postalCode,
    country,
    number,
    neighbourhood,
  } = body;

  if (
    !fullAddress ||
    !street ||
    !city ||
    !state ||
    !postalCode ||
    !country ||
    !number
  ) {
    return NextResponse.json("Invalid address data in the request body", {
      status: 400,
    });
  }

  const worker = await prisma.worker.findFirst({ where: { userId: userId } });

  await prisma.worker.update({
    data: {
      country,
      state,
      city,
      postalCode,
      neighbourhood,
      street,
      number,
    },
    where: {
      id: worker?.id,
    },
  });

  return NextResponse.json({ msg: "Address saved" });
}
