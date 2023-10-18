import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const workers = await prisma.worker.findMany({
    where: {
      service: {
        name: params.name.replace(/-/g, " "),
      },
    },
    include: {
      service: true,
      user: true,
    },
  });

  console.log(
    `==============WORKERS BY ${params.name.replace(
      /-/g,
      " "
    )}======================`
  );
  console.log(workers);
  console.log("====================================");

  return NextResponse.json(workers);
}
