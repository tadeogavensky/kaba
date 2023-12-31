import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
export async function PUT(
  request: Request,
  { params }: { params: { serviceId: string; workerId: string } }
) {
  try {
    const worker = await prisma.worker.update({
      data: { serviceId: params.serviceId },
      where: { id: params.workerId },
      include: {
        service: true,
      },
    });

    return NextResponse.json({
      msg: `Services added/changed to worker ${params.workerId}`,
      worker: worker,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
