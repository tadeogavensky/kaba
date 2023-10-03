import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import findClientByEmail from "@/utils/findClientByEmail";

const prisma = new PrismaClient();
export default async function POST(request: Request) {
  const body = await request.json();

  const { email, password } = body;

  const possibleClient = await findClientByEmail(email);

  if (possibleClient) {
    return NextResponse.json(
      { error: "There is already a client account with that email" },
      { status: 409 } // Conflict
    );
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.client.create({
      data: { email: email, password: hashedPassword },
    });

    return NextResponse.json({ success: "Client account created" });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while creating the client account" },
      { status: 500 }
    );
  }
}
