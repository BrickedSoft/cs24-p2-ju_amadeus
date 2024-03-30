import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { generateRandomToken } from "@/lib/utils/encoding";

const schema = z.object({
  email: z.string().email(),
  resetToken: z.string(),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const { email, resetToken } = parsed.data;

  const user: User | null = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user)
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  else if (user.resetToken != resetToken)
    return NextResponse.json(
      { message: "Invalid reset token" },
      { status: 400 }
    );

  //TODO: Write a code to generate new reset token after 10 failed attempts

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
