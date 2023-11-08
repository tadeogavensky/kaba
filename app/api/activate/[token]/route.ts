import prisma from "@/libs/prismadb";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  let apiUrl;

  if (process.env.NODE_ENV === "development") {
    apiUrl = process.env.API_URL_DEVELOPMENT_LOCAL!;
  } else {
    apiUrl = process.env.API_URL!;
  }

  cookies().delete("user");
  cookies().delete("role");
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

  console.log("user token", user?.id);

  if (!user) {
    throw new Error("Invalid token");
  }

  const tokenExpirationTime = 24 * 60 * 60 * 1000;
  const tokenCreatedAt = user.activateTokens[0].createdAt;

  if (Date.now() - new Date(tokenCreatedAt).getTime() > tokenExpirationTime) {
    console.log("entra aca");

    return NextResponse.redirect(`${apiUrl}auth/expired`);
  }

  const verifiedUser = await prisma.user.update({
    where: { id: user.id },
    data: { active: true, emailVerified: true },
  });

  if (verifiedUser) {
    console.log("user Verified");
  }

  const userVerified = await prisma.user.findFirst({ where: { id: user.id } });

  console.log("userVerified", userVerified);

  await prisma.activateToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  });

  return NextResponse.redirect(`${apiUrl}auth/signin`);
}
