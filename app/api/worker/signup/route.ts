import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import findWorkerByEmail from "@/utils/findWorkerByEmail";

const prisma = new PrismaClient();
export default async function POST(request: Request) {
  const body = await request.json();

  const { email, password } = body;

  const possibleWorker = await findWorkerByEmail(email);

  if (possibleWorker) {
    return NextResponse.json(
      { error: "There is already a worker account with that email" },
      { status: 409 } // Conflict
    );
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.worker.create({
      data: { email: email, password: hashedPassword },
    });

    return NextResponse.json({ success: "Worker account created" });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while creating the worker account" },
      { status: 500 }
    );
  }
}
