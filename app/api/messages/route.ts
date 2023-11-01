import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { text, chatId } = body;

 
  const role = cookies().get("role")?.value;

  const client = await prisma.client.findFirst({
    where: { userId: cookies().get("user")?.value },
  });
  const worker = await prisma.worker.findFirst({
    where: { userId: cookies().get("user")?.value },
  });

  if (role == "client") {

    const newMessage = await prisma.message.create({
      data: {
        chat: {
          connect: {
            id: chatId,
          },
        },
        client: {
          connect: {
            id: client?.id,
          },
        },
        text: text.text,
      },
    });

    const updatedChat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        client: true,
        messages: true,
      },
    });

    await pusherServer.trigger(chatId, "messages:new", newMessage);

    return NextResponse.json(newMessage);
  }

  if (role == "worker") {
    const newMessage = await prisma.message.create({
      data: {
        text: text.text,
        chat: {
          connect: {
            id: chatId,
          },
        },
        worker: {
          connect: {
            id: worker?.id,
          },
        },
      },
    });

    const updatedChat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        worker: true,
        messages: true,
      },
    });

    await pusherServer.trigger(chatId, "messages:new", newMessage);

    return NextResponse.json(newMessage);
  }
}
