import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function findClientByEmailAndRole(
  email: string,
  role: string
) {
  const client = await prisma.user.findFirst({
    where: {
      email: email,
      role: role,
    },
    include: {
      activateTokens: true,
      client: true,
    },
  });

  return client;
}
