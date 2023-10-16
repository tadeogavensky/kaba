import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function findWorkerByEmailAndRole(
  email: string,
  role: string
) {
  const worker = await prisma.user.findFirst({
    where: {
      email: email,
      role: role,
    },
    include: {
      activateTokens: true,
      worker: {
        include: {
          service: { include: { category: true } },
          rate: true,
        },
      },
    },
  });

  return worker;
}
