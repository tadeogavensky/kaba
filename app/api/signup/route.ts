import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import findClientByEmailAndRole from "@/utils/findClientByEmailAndRole";
import findWorkerByEmailAndRole from "@/utils/findClientByEmailAndRole";

import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password, role } = body;

  if (!email || !password || !role) {
    return NextResponse.json(
      {
        error:
          "One or more of the following is missing: email, password, or role.",
      },
      { status: 409 }
    );
  }

  if (role === "client") {
    const possibleUserClient = await findClientByEmailAndRole(email, role);

    if (possibleUserClient) {
      return NextResponse.json(
        {
          error: "There is already an account registered with that email",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        role: role,
      },
    });

    const client = await prisma.client.create({
      data: {
        user: { connect: { id: user.id } },
      },
    });

    console.log("user :>> ", user);

    return NextResponse.json({ user, client });
  }

  if (role === "worker") {
    const possibleUserWorker = await findWorkerByEmailAndRole(email, role);

    if (possibleUserWorker) {
      return NextResponse.json(
        {
          error: "There is already an account registered with that email",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        role: role,
      },
    });

    const worker = await prisma.worker.create({
      data: {
        user: { connect: { id: user.id } },
      },
    });

    console.log("user :>> ", user);

    return NextResponse.json({ user, worker });
  }
}
