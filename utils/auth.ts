/* import prisma from "@/libs/prismadb"; */
import bcrypt from "bcrypt";
import findClientByEmailAndRole from "./findClientByEmailAndRole";
import findWorkerByEmailAndRole from "./findWorkerByEmailAndRole";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function login(
  email: string,
  password: string,
  role: string
) {
  if (role == "client") {
    const user = await findClientByEmailAndRole(email, role);
    if (user) {
      if (user.hashedPassword) {
        const passwordMatch = bcrypt.compareSync(password, user.hashedPassword);

        if (passwordMatch) {
          return user;
        }
      }
    }
  }

  if (role == "worker") {
    const user = await findWorkerByEmailAndRole(email, role);
    if (user) {
      if (user.hashedPassword) {
        const passwordMatch = bcrypt.compareSync(password, user.hashedPassword);

        if (passwordMatch) {
          return user;
        }
      }
    }
  }

  return null;
}
