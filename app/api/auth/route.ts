import login from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password, role } = body;

  if (!email || !password || !role) return NextResponse.json({ msg: "Error" });

  const user = await login(email, password, role);

  

  return NextResponse.json(user);
}
