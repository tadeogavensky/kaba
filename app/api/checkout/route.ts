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

  console.log("==============BODY======================");
  console.log("Service ID:", serviceId);
  console.log("Client ID:", clientId);
  console.log("User ID:", userId);
  console.log("Worker ID:", workerId);
  console.log("Address ID:", addressId);
  console.log("===============BODY=====================");

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

  const booking = await prisma.booking.create({
    data: {
      id: randomUUID(),
      date: selectedDate,
      time: isoStartTime,
      workingHours: workingHours,
      clientId: clientId,
      userId: userId,
      workerId: workerId,
      addressId: addressId,
      serviceId: serviceId,
      /*   address: {
        connect: {
          id: addressId,
        },
      },
      service: {
        connect: {
          id: serviceId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      worker: {
        connect: {
          id: workerId,
        },
      },
      client: {
        connect: {
          id: clientId,
        },
      }, */
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

    //Client email
    try {
      await transporter.sendMail({
        from: mailOptions.from,
        to: client?.user.email || "",
        subject: `${client?.user.firstName}, new booking has been made for ${worker?.service?.name.toLocaleUpperCase()}`,
        text:
          `Hi ${client?.user.firstName} ${client?.user.lastName}!\n\n` +
          `We want to notify you that your attempt to book a service with ${worker?.user.firstName} ${worker?.user.lastName} to do ${worker?.service?.name.toLocaleUpperCase()}, for ${new Date(booking.date)} at ${new Date(booking.time)}, was successfull.` +
          `You can check it out all your bookings at https://kaba-livid.vercel.app/auth/bookings.\n\n`,
        html: `
        <h1>Hi ${client?.user.firstName} ${client?.user.lastName}!!</h1>
        <p>We want to notify you that your attempt to book a service with ${worker?.user.firstName} ${worker?.user.lastName} for ${worker?.service?.name.toLocaleUpperCase()} was successfull.</p>
        <p>You can check it out all your bookings at <a href="https://kaba-livid.vercel.app/auth/bookings">Bookings</a>.</p>
      `,
      });
    } catch (error) {}

    //Client notification
    await prisma.notification.create({
      data: {
        text: `You booked a service with ${worker?.user.firstName} to do ${
          worker?.service?.name.toLocaleUpperCase()
        } for ${new Date(booking.date)} at ${new Date(booking.time)}, you can check it out at Bookings tab`,
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
        subject: `${worker?.user.firstName}, you recieve a new job opportunity for ${worker?.service?.name.toLocaleUpperCase()}`,
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

    //Worker notification
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
}
