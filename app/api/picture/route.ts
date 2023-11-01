import { NextResponse } from "next/server";
import { ImgurClient } from "imgur";
import formidable from "formidable";
import { IncomingMessage, ServerResponse } from "http";
import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  const body = await request.json();

  const { image } = body;
  
  console.log('image', image)

  const user = await prisma.user.update({
    where: { id: cookies().get("user")?.value },
    data: {
      image: image,
    },
  });

  console.log('user', user)

  return NextResponse.json("Image updated")
}
