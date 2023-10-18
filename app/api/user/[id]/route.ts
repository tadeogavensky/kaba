import prisma from "@/libs/prismadb";
import { mailOptions, transporter } from "@/utils/nodemailer";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user?.findFirst({
    where: { id: params.id },
    include: {
      worker: { include: { service: true, rate: true } },
      client: { include: { addresses: true } },
    },
  });

  if (!user) NextResponse.json("Could not find user");

  return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const { firstName, lastName, email, username, identity, phone } = body;

  const user = await prisma.user.findFirst({ where: { id: params.id } });

  if (email !== user?.email) {
    console.log("MAIL DISTINTOS");
    const updatedUser = await prisma.user?.update({
      where: {
        id: params.id,
      },
      data: {
        emailVerified: false,
        ...body,
      },
    });

    const token = await prisma.activateToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        userId: updatedUser.id,
      },
    });

    const apiUrl = process.env.API_URL;

    const confirmationLink = `${apiUrl}/api/activate/${token.token}`;

    try {
      await transporter.sendMail({
        from: mailOptions.from,
        to: email,
        subject: `${updatedUser?.firstName}, confirm your email`,
        text:
          `Hi ${updatedUser?.firstName} ${updatedUser?.lastName}!\n\n` +
          `You changed your email to ${updatedUser?.email}` +
          `Please click the following link to confirm your email: ${confirmationLink}`,
        html: `
        <h1>Hi ${updatedUser?.firstName} ${updatedUser?.lastName}!</h1>
        <p>You changed your email to ${updatedUser?.email}.</p>
        <p>By clicking this link your active session at Kaba will be closed.</p>
        <p>Please click the following link to confirm your email:</p>
        <a href="${confirmationLink}">Confirm Email</a>
      `,
      });
    } catch (error) {}

    return NextResponse.json({
      msg: "Save was successfull",
      user: updatedUser,
    });
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json({ msg: "Save was successfull", user: updatedUser });
}
