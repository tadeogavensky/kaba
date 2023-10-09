import prisma from "@/libs/prismadb";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import Cookies from "js-cookie";
export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  Cookies.remove("user");

  const user = await prisma.user.findFirst({
    where: {
      activateTokens: {
        some: {
          AND: [
            {
              activatedAt: null,
            },
            {
              createdAt: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
              },
            },
            {
              token,
            },
          ],
        },
      },
    },
    include: { activateTokens: true },
  });

  if (!user) {
    throw new Error("Invalid token");
  }

  const tokenExpirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const tokenCreatedAt = user.activateTokens[0].createdAt;

  if (Date.now() - new Date(tokenCreatedAt).getTime() > tokenExpirationTime) {
    return NextResponse.redirect("/auth/expired");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { active: true },
  });

  await prisma.activateToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  });

  return NextResponse.redirect("/auth/signin");
}
