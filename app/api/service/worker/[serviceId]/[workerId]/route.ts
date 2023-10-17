import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
export async function PUT(
  request: Request,
  { params }: { params: { serviceId: string; workerId: string } }
) {
  console.log("serviceId", params.serviceId, "workerId", params.workerId);

  try {
    await prisma.worker.update({
      data: { serviceId: params.serviceId },
      where: { id: params.workerId },
      include: {
        service: true,
      },
    });

    return NextResponse.json({
      msg: `Services added/changed to worker ${params.workerId}`,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
