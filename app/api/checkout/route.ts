/* import Booking from "@/types/Booking";
import { NextApiRequest, NextApiResponse } from "next";
import mercadopago from 'mercadopago';
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model"; */

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

/* const client = mercadopago.configure({
  access_token: process.env.NEXT_ACCESS_TOKEN!,
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const booking: Booking = req.body.booking;

    const URL = process.env.API_URL;

    const unitPrice = booking.worker.rate?.rate || 0;
    const totalPrice = booking.workingHours * unitPrice;

    try {
      const preference: CreatePreferencePayload = {
        items: [
          {
            title: booking.service.name,
            unit_price: 1 * unitPrice,
            quantity: 1,
          },
        ],
        auto_return: "approved",
        back_urls: {
          success: `${URL}`,
          failure: `${URL}`,
        },
        notification_url: `${URL}/api/notify`,
      };

      const response = await mercadopago.preferences.create(preference);

      res.status(200).send({ url: response.body.init_point });
    } catch (error) {}
  } else {
    res.status(400).json({ msg: "Method not allowed" });
  }
} */

export async function POST(request: Request) {
  const body = await request.json();

  console.log(body);

  const {
    selectedDate,
    startTime,
    workingHours,
    serviceId,
    userId,
    clientId,
    workerId,
    addressId,
  } = body;

  const startDateTime = new Date(selectedDate); // Start with the selected date
  const timeComponents = startTime.match(/(\d+):(\d+) (AM|PM)/); // Parse time components
  if (timeComponents) {
    let hours = parseInt(timeComponents[1]);
    let minutes = parseInt(timeComponents[2]);
    let isPM = timeComponents[3] === "PM";

    if (isPM && hours !== 12) {
      // Convert to 24-hour format
      hours += 12;
    } else if (!isPM && hours === 12) {
      // 12:00 AM should be 00:00 in 24-hour format
      hours = 0;
    }

    startDateTime.setHours(hours);
    startDateTime.setMinutes(minutes);
  }

  const isoStartTime = startDateTime.toISOString();

  console.log(serviceId);

  const address = await prisma.address.findFirst({ where: { id: addressId } });

  await prisma.booking.create({
    data: {
      date: selectedDate,
      time: isoStartTime,
      workingHours: workingHours,
      clientId: clientId,
      userId: userId,
      workerId: workerId,
      address: {
        connect: {
          id: address?.id,
        },
      },
      service: {
        connect: {
          id: serviceId,
        },
      },
    },
  });

  return NextResponse.json("Booking created successfully");
}
