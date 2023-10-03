import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function findClientByEmail(email: string) {
  const client = await prisma.client.findUnique({ where: { email: email } });
  return client;
}
