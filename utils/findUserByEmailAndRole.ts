import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function findUserByEmailAndRole(
  email: string,
  role: string
) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      role: role,
    },
  });


  return user;
}
