import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const workers = await prisma.worker.findMany({
    where: {
      OR: [
        {
          service: {
            name: params.name.replace(/-/g, " "),
          },
        },
        {
          service: {
            category: {
              name: params.name.replace(/-/g, " "),
            },
          },
        },
      ],
      rateId: { not: null },
      serviceId: { not: null },
      available: true,
    },
    include: {
      service: true,
      rate: true,
      user: true,
      reviews: true,
    },
  });

  const filteredWorkers = workers.filter((worker) => worker.rate !== null);

  console.log("filtered workers", filteredWorkers);

  return NextResponse.json(filteredWorkers);
}
