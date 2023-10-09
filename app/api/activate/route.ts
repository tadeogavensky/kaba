import { mailOptions, transporter } from "@/utils/nodemailer";
import { refreshToken } from "@/utils/refreshToken";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: any) {
  const body = await request.json();

  const { email, firstName, lastName, id } = body;

  const isTokenExpired = isExpired(body.activateTokens[0].createdAt);

  if (isTokenExpired) {
    const newToken = refreshToken(id);

    body.activateTokens[0].token = newToken;
  }

  const confirmationLink = `http://localhost:3000/api/activate/${body.activateTokens[0].token}`;

  try {
    await transporter.sendMail({
      from: mailOptions.from,
      to: email,
      subject: `${firstName}, confirm your email`,
      text:
        `Hi ${firstName} ${lastName}!\n\n` +
        `Please click the following link to confirm your email: ${confirmationLink}`,
      html: `
          <h1>Hi ${firstName} ${lastName}!</h1>
          <p>Please click the following link to confirm your email:</p>
          <a href="${confirmationLink}">Confirm Email</a>
        `,
    });
  } catch (error) {}

  return NextResponse.redirect("http://localhost:3000/");
}

function isExpired(createdAt: Date) {
  const expirationTimeInMilliseconds = 24 * 60 * 60 * 1000;

  const expirationTimestamp =
    new Date(createdAt).getTime() + expirationTimeInMilliseconds;

  const currentTimestamp = Date.now();

  return currentTimestamp >= expirationTimestamp;
}