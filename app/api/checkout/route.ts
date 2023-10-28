import prisma from "@/libs/prismadb";
import { mailOptions, transporter } from "@/utils/nodemailer";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const {
    selectedDate,
    startTime,
    workingHours,
    serviceId,
    clientId,
    userId,
    workerId,
    addressId,
  } = body;

  const worker = await prisma.worker.findFirst({
    where: { id: workerId },
    include: { rate: true },
  });

  const workerRate = worker && worker.rate?.rate;
  const total = workerRate ? workingHours * workerRate : 0;

  const booking = await prisma.booking.create({
    data: {
      id: randomUUID(),
      date: selectedDate,
      time: startTime,
      workingHours: workingHours,
      clientId: clientId,
      userId: userId,
      workerId: workerId,
      addressId: addressId,
      serviceId: serviceId,
      active: false,
      total: total,
    },
  });

  if (booking) {
    const worker = await prisma.worker.findFirst({
      where: { id: workerId },
      include: { user: true, service: true },
    });

    const client = await prisma.client.findFirst({
      where: { id: clientId },
      include: { user: true },
    });

    await prisma.inbox.create({
      data: {
        clientId: client?.id,
        workerId: worker?.id,
      },
    });

    //Client email
    try {
      await transporter.sendMail({
        from: mailOptions.from,
        to: client?.user.email || "",
        subject: `${
          client?.user.firstName
        }, new booking has been made for ${worker?.service?.name.toLocaleUpperCase()}`,
        text:
          `Hi ${client?.user.firstName} ${client?.user.lastName}!\n\n` +
          `We want to notify you that your attempt to book a service with ${
            worker?.user.firstName
          } ${
            worker?.user.lastName
          } to do ${worker?.service?.name.toLocaleUpperCase()}, for ${new Date(
            booking.date
          )} at ${new Date(booking.time)}, was successfull.` +
          `You can check it out all your bookings at https://kaba-livid.vercel.app/auth/bookings.\n\n`,
        html: `
          <h1>Hi ${client?.user.firstName} ${client?.user.lastName}!!</h1>
          <p>We want to notify you that your attempt to book a service with ${
            worker?.user.firstName
          } ${
          worker?.user.lastName
        } for ${worker?.service?.name.toLocaleUpperCase()} was successfull.</p>
          <p>You can check it out all your bookings at <a href="https://kaba-livid.vercel.app/auth/bookings">Bookings</a>.</p>
        `,
      });
    } catch (error) {}

    //Client notification
    await prisma.notification.create({
      data: {
        text: `You booked a service with ${
          worker?.user.firstName
        } to do ${worker?.service?.name.toLocaleUpperCase()} for ${new Date(
          booking.date
        )} at ${new Date(booking.time)}, you can check it out at Bookings tab`,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    //Worker email
    try {
      await transporter.sendMail({
        from: mailOptions.from,
        to: worker?.user.email || "",
        subject: `${
          worker?.user.firstName
        }, you recieve a new job opportunity for ${worker?.service?.name.toLocaleUpperCase()}`,
        text:
          `Hi ${worker?.user.firstName} ${worker?.user.lastName}!\n\n` +
          `We want to notify you that a client booked a service with you.` +
          `You can check it out all your bookings at https://kaba-livid.vercel.app/auth/bookings.\n\n`,
        html: `
          <h1>Hi ${worker?.user.firstName} ${worker?.user.lastName}!!</h1>
          <p>We want to notify you that a client booked a service with you.</p>
          <p>You can check it out all your bookings at <a href="https://kaba-livid.vercel.app/auth/bookings">Bookings</a>.</p>
        `,
      });
    } catch (error) {}

    await prisma.notification.create({
      data: {
        text: `A job for ${client?.user.firstName} has been booked, you can check out the details at Bookings tab`,
        user: {
          connect: {
            id: worker?.userId,
          },
        },
      },
    });

    return NextResponse.json("Booking created successfully");
  }

  return NextResponse.json("Error creating booking");
}
