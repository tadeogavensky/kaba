import prisma from "@/libs/prismadb";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  cookies().delete("user");
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

  const tokenExpirationTime = 24 * 60 * 60 * 1000;
  const tokenCreatedAt = user.activateTokens[0].createdAt;

  if (Date.now() - new Date(tokenCreatedAt).getTime() > tokenExpirationTime) {
    return NextResponse.redirect("http://localhost:3000/auth/expired");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { active: true, emailVerified: true },
  });

  await prisma.activateToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  });

  return NextResponse.redirect("http://localhost:3000/auth/signin");
}
