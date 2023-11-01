import prisma from "@/libs/prismadb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const role = cookies().get("role")?.value;

  const client = await prisma.client.findFirst({
    where: { userId: cookies().get("user")?.value },
  });
  const worker = await prisma.worker.findFirst({
    where: { userId: cookies().get("user")?.value },
  });
  if (role == "client") {
    const chats = await prisma.chat.findMany({
      where: {
        clientId: client?.id,
      },
      include: {
        worker: {
          include: {
            user: true,
            messages: true,
          },
        },
        client: {
          include: {
            user: true,
            messages: true,
          },
        },
      },
    });
    return NextResponse.json(chats);
  }
  if (role == "worker") {
    const chats = await prisma.chat.findMany({
      where: {
        workerId: worker?.id,
      },
      include: {
        worker: {
          include: {
            user: true,
            messages: true,
          },
        },
        client: {
          include: {
            user: true,

            messages: true,
          },
        },
      },
    });
    return NextResponse.json(chats);
  }
}
