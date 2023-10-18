import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import findClientByEmailAndRole from "@/utils/findClientByEmailAndRole";
import findWorkerByEmailAndRole from "@/utils/findClientByEmailAndRole";
import prisma from "@/libs/prismadb";
import { mailOptions, transporter } from "@/utils/nodemailer";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password, firstName, lastName, role } = body;

  if (!email || !password || !role || !firstName || !lastName) {
    return NextResponse.json({
      error:
        "One or more of the following is missing: email, password, first name, last name or role.",
    });
  }

  if (role === "client") {
    const possibleUserClient = await findClientByEmailAndRole(email, role);

    /*    if (!possibleUserClient) {
      return null;
    }

    if (!possibleUserClient.active) {
      throw new Error("User is not active");
    } */

    if (possibleUserClient) {
      return NextResponse.json({
        error: "There is already an account registered with that email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        role: role,
      },
    });

    const token = await prisma.activateToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        userId: user.id,
      },
    });

    const client = await prisma.client.create({
      data: {
        user: { connect: { id: user.id } },
      },
    });

    const apiUrl = process.env.API_URL;

    const confirmationLink = `${apiUrl}/api/activate/${token.token}`;

    try {
      await transporter.sendMail({
        from: mailOptions.from,
        to: email,
        subject: `${user.firstName}, confirm your email`,
        text:
          `Hi ${user.firstName} ${user.lastName}!\n\n` +
          `Welcome to Kaba, your trusted home services app. ` +
          `You have signed up as a ${user.role}.\n\n` +
          `Please click the following link to confirm your email: ${confirmationLink}`,
        html: `
        <h1>Hi ${user.firstName} ${user.lastName}!</h1>
        <p>Welcome to <strong>Kaba</strong>, your trusted home services app.</p>
        <p>You have signed up as a <strong>${user.role}</strong>.</p>
        <p>By clicking this link your active session at Kaba will be closed.</p>
        <p>Please click the following link to confirm your email:</p>
        <a href="${confirmationLink}">Confirm Email</a>
      `,
      });
    } catch (error) {}

    return NextResponse.json({
      msg: "Account created successfully",
      user,
      client,
    });
  }

  if (role === "worker") {
    const possibleUserWorker = await findWorkerByEmailAndRole(email, role);

    /*    if (!possibleUserWorker) {
      return null;
    } */

    /*   if (!possibleUserWorker.active) {
      return NextResponse.json({
        error: "User is not active",
      });
    } */

    if (possibleUserWorker) {
      return NextResponse.json({
        error: "There is already an account registered with that email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        role: role,
      },
    });

    const token = await prisma.activateToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        userId: user.id,
      },
    });

    const worker = await prisma.worker.create({
      data: {
        available: false,
        totalJobs:0,
        user: { connect: { id: user.id } },
      },
    });

    const apiUrl = process.env.API_URL;

    const confirmationLink = `${apiUrl}/api/activate/${token.token}`;

    try {
      await transporter.sendMail({
        from: mailOptions.from,
        to: email,
        subject: `${user.firstName}, confirm your email`,
        text:
          `Hi ${user.firstName} ${user.lastName}!\n\n` +
          `Welcome to Kaba, your trusted home services app. ` +
          `You have signed up as a ${user.role}.\n\n` +
          `Please click the following link to confirm your email: ${confirmationLink}`,
        html: `
        <h1>Hi ${user.firstName} ${user.lastName}!</h1>
        <p>Welcome to <strong>Kaba</strong>, your trusted home services app.</p>
        <p>You have signed up as a <strong>${user.role}</strong>.</p>
        <p>Please click the following link to confirm your email:</p>
        <a href="${confirmationLink}">Confirm Email</a>
      `,
      });
    } catch (error) {}

    return NextResponse.json({
      msg: "Account created succsessfully",
      user,
      worker,
    });
  }
}
