import prisma from "@/libs/prismadb";
import { randomUUID } from "crypto";

export async function refreshToken(userId: string) {
  const refreshedToken = await prisma.user.update({
    where: { id: userId },
    data: {
      activateTokens: {
        set: [
          {
            token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
            createdAt: new Date(),
            activatedAt: null,
          },
        ],
      },
    },
  });
  return refreshToken;
}
