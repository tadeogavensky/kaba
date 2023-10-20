import prisma from "@/libs/prismadb";
import findUserByEmailAndRole from "@/utils/findUserByEmailAndRole";
import { mailOptions, transporter } from "@/utils/nodemailer";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, role } = body;

  const user = await findUserByEmailAndRole(email, role);

  if (user) {
    const expirationPeriodMs = 60 * 60 * 1000;

    const token = await prisma.activateToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        userId: user.id,
      },
    });

    let apiUrl;

    if (process.env.NODE_ENV === "development") {
      apiUrl = process.env.API_URL_DEVELOPMENT_LOCAL;
    } else {
      apiUrl = process.env.API_URL;
    }

    const resetLink = `${apiUrl}/reset-password/${token.token}`;

    const currentTimestamp: number = Date.now(); // Puedes utilizar Date.now() para obtener una marca de tiempo actual en milisegundos.
    const tokenCreationTimestamp: number = new Date(token.createdAt).getTime(); // Asegúrate de obtener la marca de tiempo de token.createdAt como número.
    const timeElapsedMs: number = currentTimestamp - tokenCreationTimestamp;

    if (timeElapsedMs <= expirationPeriodMs) {
      try {
        await transporter.sendMail({
          from: mailOptions.from,
          to: email, // User's email address
          subject: "Reset Your Password",
          text:
            `Hi ${user.firstName}!\n\n` +
            `We received a request to reset your password for your Kaba account.\n` +
            `Please click the following link to reset your password: ${resetLink}\n` +
            `If you didn't request this, you can safely ignore this email; your password won't change.`,
          html: `
            <h1>Hi ${user.firstName}!</h1>
            <p>We received a request to reset your password for your Kaba account.</p>
            <p>Please click the following link to reset your password:</p>
            <a href="${resetLink}">Reset Password</a>
            <p>If you didn't request this, you can safely ignore this email; your password won't change.</p>
          `,
        });

        return NextResponse.json(
          "A password reset email has been sent to your inbox. Please follow the instructions to reset your password."
        );
      } catch (error) {
        return NextResponse.json(
          "An json occurred while sending the password reset email."
        );
      }
    } else {
      return NextResponse.json(
        "The password reset link has expired. Please request a new link."
      );
    }
  } else {
    return NextResponse.json(
      "Invalid email or role. Please check your information and try again."
    );
  }
}

export async function PUT(request: Request) {
  const body = await request.json();

  const { password, token } = body;

  const resetToken = await prisma.activateToken.findUnique({
    where: { token: token },
  });

  if (resetToken) {
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: resetToken?.userId }, // Assuming you have a userId in resetToken
      data: {
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json("Your password has been changed")
  }
}
