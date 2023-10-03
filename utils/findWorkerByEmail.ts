import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function findWorkerByEmail(email: string) {
  const worker = await prisma.worker.findUnique({ where: { email: email } });
  return worker;
}
