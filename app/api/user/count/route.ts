import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    const userCount = await prisma.user.count()

    return NextResponse.json(userCount)
}