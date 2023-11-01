import prisma from "@/libs/prismadb";
import { randomUUID } from "crypto";

export async function refreshToken(userId: string) {
  const refreshedToken = await prisma.activateToken.create({
    data: {
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      userId: userId,
      activatedAt: null,
      createdAt: new Date(),
    },
  });

  console.log("refreshedToken", refreshedToken);

  return refreshedToken.token;
}
