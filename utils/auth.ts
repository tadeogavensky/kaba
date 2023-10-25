import bcrypt from "bcrypt";
import findClientByEmailAndRole from "./findClientByEmailAndRole";
import findWorkerByEmailAndRole from "./findWorkerByEmailAndRole";
import prisma from "@/libs/prismadb";

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
        return {
          error: "Invalid email or password",
          status: 409,
        };
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
        return {
          error: "Invalid email or password",
          status: 409,
        };
      }
    }
  }

  return { error: "User not found", status: 409 };
}
